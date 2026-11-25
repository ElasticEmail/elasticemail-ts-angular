/*
 * Add template
 * Creates an email template with an HTML and a plain-text body.
 * TemplateScope: Personal or Global.
 *
 * Required access level: ModifyTemplates
 *
 * Server-side only (Angular SSR or Node). The API key comes from ELASTICEMAIL_API_KEY
 * through the Configuration provider described in examples/README.md.
 */
import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import {
  BodyContentType,
  TemplatePayload,
  TemplateScope,
  TemplatesService,
} from '@elasticemail/elasticemail-client-ts-angular';

export async function addTemplate(): Promise<void> {
  const templates = inject(TemplatesService);

  const template: TemplatePayload = {
    Name: 'My new template',
    Subject: 'Default subject',
    Body: [
      { ContentType: BodyContentType.Html, Content: '<p>My template</p>', Charset: 'utf-8' },
      { ContentType: BodyContentType.PlainText, Content: 'My template', Charset: 'utf-8' },
    ],
    TemplateScope: TemplateScope.Personal,
  };

  try {
    const created = await firstValueFrom(templates.templatesPost(template));
    console.log(created);
  } catch (error) {
    if (error instanceof HttpErrorResponse) {
      console.error(`Elastic Email API error ${error.status}:`, error.error);
    } else {
      throw error;
    }
  }
}
