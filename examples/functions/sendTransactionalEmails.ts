/*
 * Send transactional emails
 * Sends one transactional email (up to 50 recipients) with an HTML and a plain-text body.
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
import {
  BodyContentType,
  EmailsService,
  EmailTransactionalMessageData,
} from '@elasticemail/elasticemail-client-ts-angular';

export async function sendTransactionalEmails(): Promise<void> {
  const emails = inject(EmailsService);

  const message: EmailTransactionalMessageData = {
    Recipients: {
      To: ['johnsmith@domain.com'],
    },
    Content: {
      From: 'myemail@domain.com',
      ReplyTo: 'myemail@domain.com',
      Subject: 'Example transactional email',
      Body: [
        { ContentType: BodyContentType.Html, Content: '<strong>Mail content.</strong>', Charset: 'utf-8' },
        { ContentType: BodyContentType.PlainText, Content: 'Mail content.', Charset: 'utf-8' },
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
