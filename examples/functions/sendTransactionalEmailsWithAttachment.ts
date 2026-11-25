/*
 * Send transactional emails with an attachment
 * Sends one transactional email with an HTML and a plain-text body and attaches invoice.pdf
 * (read from the current directory, Base64-encoded). Skips the send if the file is missing.
 * An Idempotency-Key makes a retry of this send safe: it can't deliver the email twice.
 *
 * Required access level: SendHttp
 *
 * Server-side only (Angular SSR or Node). The API key comes from ELASTICEMAIL_API_KEY
 * through the Configuration provider described in examples/README.md.
 */
import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { readFile } from 'node:fs/promises';
import {
  BodyContentType,
  EmailsService,
  EmailTransactionalMessageData,
} from '@elasticemail/elasticemail-client-ts-angular';

export async function sendTransactionalEmailsWithAttachment(): Promise<void> {
  const emails = inject(EmailsService);

  let invoice: Buffer;
  try {
    invoice = await readFile('invoice.pdf');
  } catch {
    console.log('Attachment file not found: invoice.pdf. Skipping send.');
    return;
  }

  const message: EmailTransactionalMessageData = {
    Recipients: {
      To: ['johnsmith@domain.com'],
    },
    Content: {
      From: 'myemail@domain.com',
      ReplyTo: 'myemail@domain.com',
      Subject: 'Example transactional email with attachment',
      Body: [
        { ContentType: BodyContentType.Html, Content: '<strong>Mail content.</strong>', Charset: 'utf-8' },
        { ContentType: BodyContentType.PlainText, Content: 'Mail content.', Charset: 'utf-8' },
      ],
      Attachments: [
        { BinaryContent: invoice.toString('base64'), Name: 'Invoice.pdf', ContentType: 'application/pdf' },
      ],
    },
  };

  // One key per send. Reuse it only to retry this same send with the same body.
  const idempotencyKey = crypto.randomUUID();

  try {
    const result = await firstValueFrom(emails.emailsTransactionalPost(message, idempotencyKey));
    console.log(`Idempotency-Key: ${idempotencyKey}`);
    console.log(`TransactionID: ${result.TransactionID}, MessageID: ${result.MessageID}`);
  } catch (error) {
    if (error instanceof HttpErrorResponse) {
      console.error(`Elastic Email API error ${error.status}:`, error.error);
    } else {
      throw error;
    }
  }
}
