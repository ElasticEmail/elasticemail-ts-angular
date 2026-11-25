# Send Transactional Emails

*Required Access Level: SendHttp*

This example sends a transactional email: a message triggered by something the recipient did, such as a sign-up, a purchase receipt or a password reset. One call takes up to 50 recipients.

> [!IMPORTANT]
> Run this on a server only: in [Angular SSR](https://angular.dev/guide/ssr) server code or a Node script, never in browser code. Anything in your browser bundle can be read by anyone who loads the page, and the browser can't read environment variables anyway. A browser app should call your own backend, which calls Elastic Email.

## Preparation

1. Install the SDK: `npm install @elasticemail/elasticemail-client-ts-angular`.
2. Create an API key with the **SendHttp** access level in your [API settings](https://help.elasticemail.com/en/articles/4799160-api-settings) and put it in the `ELASTICEMAIL_API_KEY` environment variable.
3. Provide `HttpClient` and a `Configuration` that reads `process.env.ELASTICEMAIL_API_KEY`, as shown in [Configure the client](../README.md#configure-the-client).
4. Use a sender address on a domain you have [verified](https://help.elasticemail.com/en/articles/4934400-how-to-verify-your-domain).

Then create `sendTransactionalEmails.ts` with the code below and replace the sample values (email addresses, names) with your own.

## Let's dig into the code

Import Angular's `inject`, `HttpErrorResponse` for API errors, RxJS `firstValueFrom` to turn the returned `Observable` into a `Promise`, and the SDK types:

```typescript
import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import {
  BodyContentType,
  EmailsService,
  EmailTransactionalMessageData,
} from '@elasticemail/elasticemail-client-ts-angular';
```

The example is a function that runs in an Angular injection context. Inject `EmailsService`.

```typescript
export async function sendTransactionalEmails(): Promise<void> {
  const emails = inject(EmailsService);
```

Describe the message: the recipients, the sender (`From` must be on a domain you have verified), the subject, and both an HTML and a plain-text body.

```typescript
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
```

Create an idempotency key with `crypto.randomUUID()`. Pass the same key only when you retry this same send with the same message; then the API returns the first result instead of sending again. Make a new key for every new send.

```typescript
  // One key per send. Reuse it only to retry this same send with the same body.
  const idempotencyKey = crypto.randomUUID();
```

Call `emailsTransactionalPost` with the message and the key, and print the key next to the `TransactionID`.

If the API answers with an error, the Observable fails with an `HttpErrorResponse`: the `catch` block prints its status and the API's error message. Anything else is rethrown.

```typescript
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
```

## The whole code to copy and paste

```typescript
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
```

## Run the code

Call `sendTransactionalEmails()` from server-side code that runs in an injection context, or run it from Node with the runner in [Run an example from Node](../README.md#run-an-example-from-node):

```bash
npx tsx run.ts
```
