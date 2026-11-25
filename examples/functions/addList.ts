/*
 * Add list
 * Creates a contact list. Emails are existing contacts to put on it;
 * leave Emails out to create the list with all your contacts.
 *
 * Required access level: ModifyContacts
 *
 * Server-side only (Angular SSR or Node). The API key comes from ELASTICEMAIL_API_KEY
 * through the Configuration provider described in examples/README.md.
 */
import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ListPayload, ListsService } from '@elasticemail/elasticemail-client-ts-angular';

export async function addList(): Promise<void> {
  const lists = inject(ListsService);

  const list: ListPayload = {
    ListName: 'Best contacts',
    AllowUnsubscribe: true,
    Emails: ['johnsmith@domain.com'],
  };

  try {
    const created = await firstValueFrom(lists.listsPost(list));
    console.log(created);
  } catch (error) {
    if (error instanceof HttpErrorResponse) {
      console.error(`Elastic Email API error ${error.status}:`, error.error);
    } else {
      throw error;
    }
  }
}
