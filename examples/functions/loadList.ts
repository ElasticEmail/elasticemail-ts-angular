/*
 * Load list
 * Loads one contact list by name.
 *
 * Required access level: ViewContacts
 *
 * Server-side only (Angular SSR or Node). The API key comes from ELASTICEMAIL_API_KEY
 * through the Configuration provider described in examples/README.md.
 */
import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ListsService } from '@elasticemail/elasticemail-client-ts-angular';

export async function loadList(): Promise<void> {
  const lists = inject(ListsService);

  const name = 'Best contacts';

  try {
    const list = await firstValueFrom(lists.listsByNameGet(name));
    console.log(list);
  } catch (error) {
    if (error instanceof HttpErrorResponse) {
      console.error(`Elastic Email API error ${error.status}:`, error.error);
    } else {
      throw error;
    }
  }
}
