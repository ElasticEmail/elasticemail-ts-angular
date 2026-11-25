/*
 * Delete list
 * Deletes one contact list by name.
 *
 * Required access level: ModifyContacts
 *
 * Server-side only (Angular SSR or Node). The API key comes from ELASTICEMAIL_API_KEY
 * through the Configuration provider described in examples/README.md.
 */
import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ListsService } from '@elasticemail/elasticemail-client-ts-angular';

export async function deleteList(): Promise<void> {
  const lists = inject(ListsService);

  const name = 'Best contacts';

  try {
    await firstValueFrom(lists.listsByNameDelete(name));
    console.log('List deleted.');
  } catch (error) {
    if (error instanceof HttpErrorResponse) {
      console.error(`Elastic Email API error ${error.status}:`, error.error);
    } else {
      throw error;
    }
  }
}
