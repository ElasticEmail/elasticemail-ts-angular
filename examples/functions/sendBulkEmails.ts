/*
 * Send bulk emails
 * Sends one bulk job in which every recipient gets a personalized copy ({name} merge field),
 * with an HTML and a plain-text body.
 * An Idempotency-Key makes a retry of this send safe: it can't deliver the emails twice.
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
  EmailMessageData,
  EmailsService,
} from '@elasticemail/elasticemail-client-ts-angular';

export async function sendBulkEmails(): Promise<void> {
  const emails = inject(EmailsService);

  const message: EmailMessageData = {
    Recipients: [
      { Email: 'johnsmith@domain.com', Fields: { name: 'John' } },
    ],
    Content: {
      From: 'myemail@domain.com',
      ReplyTo: 'myemail@domain.com',
      Subject: 'Example email',
      Body: [
        { ContentType: BodyContentType.Html, Content: '<strong>Hi {name}!</strong>', Charset: 'utf-8' },
        { ContentType: BodyContentType.PlainText, Content: 'Hi {name}!', Charset: 'utf-8' },
      ],
    },
  };

  // One key per send. Reuse it only to retry this same send with the same body.
  const idempotencyKey = crypto.randomUUID();

  try {
    const result = await firstValueFrom(emails.emailsPost(message, idempotencyKey));
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
