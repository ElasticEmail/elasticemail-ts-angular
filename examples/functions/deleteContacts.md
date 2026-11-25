# Delete Contacts

*Required Access Level: ModifyContacts*

This example deletes several contacts in one call. To delete a single contact, see [deleteContact](deleteContact.md).

> [!IMPORTANT]
> Run this on a server only: in [Angular SSR](https://angular.dev/guide/ssr) server code or a Node script, never in browser code. Anything in your browser bundle can be read by anyone who loads the page, and the browser can't read environment variables anyway. A browser app should call your own backend, which calls Elastic Email.

## Preparation

1. Install the SDK: `npm install @elasticemail/elasticemail-client-ts-angular`.
2. Create an API key with the **ModifyContacts** access level in your [API settings](https://help.elasticemail.com/en/articles/4799160-api-settings) and put it in the `ELASTICEMAIL_API_KEY` environment variable.
3. Provide `HttpClient` and a `Configuration` that reads `process.env.ELASTICEMAIL_API_KEY`, as shown in [Configure the client](../README.md#configure-the-client).

Then create `deleteContacts.ts` with the code below and replace the sample values (email addresses, names) with your own.

## Let's dig into the code

Import Angular's `inject`, `HttpErrorResponse` for API errors, RxJS `firstValueFrom` to turn the returned `Observable` into a `Promise`, and the SDK types:

```typescript
import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ContactsService, EmailsPayload } from '@elasticemail/elasticemail-client-ts-angular';
```

The example is a function that runs in an Angular injection context. Inject `ContactsService`.

```typescript
export async function deleteContacts(): Promise<void> {
  const contacts = inject(ContactsService);
```

List the email addresses to delete. You can pass a `Rule` (a filter query) instead of `Emails`, but not both.

```typescript
  const payload: EmailsPayload = {
    Emails: ['johnsmith@domain.com'],
  };
```

Call `contactsDeletePost`. It has no response body, so the example prints a confirmation.

If the API answers with an error, the Observable fails with an `HttpErrorResponse`: the `catch` block prints its status and the API's error message. Anything else is rethrown.

```typescript
  try {
    await firstValueFrom(contacts.contactsDeletePost(payload));
    console.log('Contacts deleted.');
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
 * Delete contacts
 * Deletes several contacts at once, given a list of email addresses.
 * You can pass a Rule (a filter query) instead of Emails, but not both.
 *
 * Required access level: ModifyContacts
 *
 * Server-side only (Angular SSR or Node). The API key comes from ELASTICEMAIL_API_KEY
 * through the Configuration provider described in examples/README.md.
 */
import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ContactsService, EmailsPayload } from '@elasticemail/elasticemail-client-ts-angular';

export async function deleteContacts(): Promise<void> {
  const contacts = inject(ContactsService);

  const payload: EmailsPayload = {
    Emails: ['johnsmith@domain.com'],
  };

  try {
    await firstValueFrom(contacts.contactsDeletePost(payload));
    console.log('Contacts deleted.');
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

Call `deleteContacts()` from server-side code that runs in an injection context, or run it from Node with the runner in [Run an example from Node](../README.md#run-an-example-from-node):

```bash
npx tsx run.ts
```
