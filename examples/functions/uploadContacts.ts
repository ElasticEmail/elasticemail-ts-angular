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
