/*
 * Load template
 * Loads one template by name, including its subject and body.
 *
 * Required access level: ViewTemplates
 *
 * Server-side only (Angular SSR or Node). The API key comes from ELASTICEMAIL_API_KEY
 * through the Configuration provider described in examples/README.md.
 */
import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { TemplatesService } from '@elasticemail/elasticemail-client-ts-angular';

export async function loadTemplate(): Promise<void> {
  const templates = inject(TemplatesService);

  const name = 'hello_template';

  try {
    const template = await firstValueFrom(templates.templatesByNameGet(name));
    console.log(template);
  } catch (error) {
    if (error instanceof HttpErrorResponse) {
      console.error(`Elastic Email API error ${error.status}:`, error.error);
    } else {
      throw error;
    }
  }
}
