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
