# Upload Contacts

*Required Access Level: ModifyContacts*

This example imports contacts from a CSV file into a list. The file needs an `Email` column; `AllowUnsubscribe`, `Status`, `ConsentDate`, `ConsentIP` and `ConsentTracking` are optional. A sample is in [files/contacts.csv](files/contacts.csv).

> [!IMPORTANT]
> Run this on a server only: in [Angular SSR](https://angular.dev/guide/ssr) server code or a Node script, never in browser code. Anything in your browser bundle can be read by anyone who loads the page, and the browser can't read environment variables anyway. A browser app should call your own backend, which calls Elastic Email.

## Preparation

1. Install the SDK: `npm install @elasticemail/elasticemail-client-ts-angular`.
2. Create an API key with the **ModifyContacts** access level in your [API settings](https://help.elasticemail.com/en/articles/4799160-api-settings) and put it in the `ELASTICEMAIL_API_KEY` environment variable.
3. Provide `HttpClient` and a `Configuration` that reads `process.env.ELASTICEMAIL_API_KEY`, as shown in [Configure the client](../README.md#configure-the-client).

Then create `uploadContacts.ts` with the code below and replace the sample values (email addresses, names) with your own.

## Let's dig into the code

Import Angular's `inject`, `HttpErrorResponse` for API errors, RxJS `firstValueFrom` to turn the returned `Observable` into a `Promise`, and the SDK types:

```typescript
import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { readFile } from 'node:fs/promises';
import { ContactsService } from '@elasticemail/elasticemail-client-ts-angular';
```

The example is a function that runs in an Angular injection context. Inject `ContactsService`.

```typescript
export async function uploadContacts(): Promise<void> {
  const contacts = inject(ContactsService);
```

Read `files/contacts.csv` (relative to the directory you run from) with Node's `fs` and wrap it in a `Blob`, which the SDK sends as a multipart upload.

```typescript
  const csv = await readFile('files/contacts.csv');
  const file = new Blob([csv], { type: 'text/csv' });
```

Call `contactsImportPost` with the list name, the file encoding, no file URL, and the file. It has no response body, so the example prints a confirmation.

If the API answers with an error, the Observable fails with an `HttpErrorResponse`: the `catch` block prints its status and the API's error message. Anything else is rethrown.

```typescript
  try {
    await firstValueFrom(
      contacts.contactsImportPost(
        'example list', // listName
        'utf-8', // encodingName
        undefined, // fileUrl
        file,
      ),
    );
    console.log('Contacts uploaded.');
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
 * Upload contacts
 * Imports contacts from a CSV file (files/contacts.csv, relative to the current directory)
 * into the "example list" list.
 * Required CSV column: Email. Suggested: AllowUnsubscribe, Status, ConsentDate, ConsentIP, ConsentTracking.
 *
 * Required access level: ModifyContacts
 *
 * Server-side only (Angular SSR or Node). The API key comes from ELASTICEMAIL_API_KEY
 * through the Configuration provider described in examples/README.md.
 */
import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { readFile } from 'node:fs/promises';
import { ContactsService } from '@elasticemail/elasticemail-client-ts-angular';

export async function uploadContacts(): Promise<void> {
  const contacts = inject(ContactsService);

  const csv = await readFile('files/contacts.csv');
  const file = new Blob([csv], { type: 'text/csv' });

  try {
    await firstValueFrom(
      contacts.contactsImportPost(
        'example list', // listName
        'utf-8', // encodingName
        undefined, // fileUrl
        file,
      ),
    );
    console.log('Contacts uploaded.');
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

Call `uploadContacts()` from server-side code that runs in an injection context, or run it from Node with the runner in [Run an example from Node](../README.md#run-an-example-from-node):

```bash
npx tsx run.ts
```
