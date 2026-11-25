/*
 * Delete template
 * Deletes one template by name.
 *
 * Required access level: ModifyTemplates
 *
 * Server-side only (Angular SSR or Node). The API key comes from ELASTICEMAIL_API_KEY
 * through the Configuration provider described in examples/README.md.
 */
import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { TemplatesService } from '@elasticemail/elasticemail-client-ts-angular';

export async function deleteTemplate(): Promise<void> {
  const templates = inject(TemplatesService);

  const name = 'My new template';

  try {
    await firstValueFrom(templates.templatesByNameDelete(name));
    console.log('Template deleted.');
  } catch (error) {
    if (error instanceof HttpErrorResponse) {
      console.error(`Elastic Email API error ${error.status}:`, error.error);
    } else {
      throw error;
    }
  }
}
