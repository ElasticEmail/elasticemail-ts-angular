/*
 * Delete contact
 * Deletes one contact by email address.
 *
 * Required access level: ModifyContacts
 *
 * Server-side only (Angular SSR or Node). The API key comes from ELASTICEMAIL_API_KEY
 * through the Configuration provider described in examples/README.md.
 */
import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ContactsService } from '@elasticemail/elasticemail-client-ts-angular';

export async function deleteContact(): Promise<void> {
  const contacts = inject(ContactsService);

  const email = 'johnsmith@domain.com';

  try {
    await firstValueFrom(contacts.contactsByEmailDelete(email));
    console.log('Contact deleted.');
  } catch (error) {
    if (error instanceof HttpErrorResponse) {
      console.error(`Elastic Email API error ${error.status}:`, error.error);
    } else {
      throw error;
    }
  }
}
