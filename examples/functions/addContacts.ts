/*
 * Add contacts
 * Adds contacts (up to 1000 per call) and puts them on the "New list" list.
 * Leave out the list names to add them to all contacts only.
 *
 * Required access level: ModifyContacts
 *
 * Server-side only (Angular SSR or Node). The API key comes from ELASTICEMAIL_API_KEY
 * through the Configuration provider described in examples/README.md.
 */
import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ContactPayload, ContactsService, ContactStatus } from '@elasticemail/elasticemail-client-ts-angular';

export async function addContacts(): Promise<void> {
  const contacts = inject(ContactsService);

  const newContacts: ContactPayload[] = [
    {
      Email: 'johnsmith@domain.com',
      Status: ContactStatus.Active,
      FirstName: 'John',
      LastName: 'Smith',
    },
  ];
  const listNames = ['New list'];

  try {
    const added = await firstValueFrom(contacts.contactsPost(newContacts, listNames));
    console.log(added);
  } catch (error) {
    if (error instanceof HttpErrorResponse) {
      console.error(`Elastic Email API error ${error.status}:`, error.error);
    } else {
      throw error;
    }
  }
}
