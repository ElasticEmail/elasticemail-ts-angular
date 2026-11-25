# Add Template

*Required Access Level: ModifyTemplates*

This example creates an email template with an HTML and a plain-text body.

> [!IMPORTANT]
> Run this on a server only: in [Angular SSR](https://angular.dev/guide/ssr) server code or a Node script, never in browser code. Anything in your browser bundle can be read by anyone who loads the page, and the browser can't read environment variables anyway. A browser app should call your own backend, which calls Elastic Email.

## Preparation

1. Install the SDK: `npm install @elasticemail/elasticemail-client-ts-angular`.
2. Create an API key with the **ModifyTemplates** access level in your [API settings](https://help.elasticemail.com/en/articles/4799160-api-settings) and put it in the `ELASTICEMAIL_API_KEY` environment variable.
3. Provide `HttpClient` and a `Configuration` that reads `process.env.ELASTICEMAIL_API_KEY`, as shown in [Configure the client](../README.md#configure-the-client).

Then create `addTemplate.ts` with the code below and replace the sample values (email addresses, names) with your own.

## Let's dig into the code

Import Angular's `inject`, `HttpErrorResponse` for API errors, RxJS `firstValueFrom` to turn the returned `Observable` into a `Promise`, and the SDK types:

```typescript
import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import {
  BodyContentType,
  TemplatePayload,
  TemplateScope,
  TemplatesService,
} from '@elasticemail/elasticemail-client-ts-angular';
```

The example is a function that runs in an Angular injection context. Inject `TemplatesService`.

```typescript
export async function addTemplate(): Promise<void> {
  const templates = inject(TemplatesService);
```

Describe the template: name, default subject, the HTML and plain-text body parts, and its scope (`Personal` or `Global`).

```typescript
  const template: TemplatePayload = {
    Name: 'My new template',
    Subject: 'Default subject',
    Body: [
      { ContentType: BodyContentType.Html, Content: '<p>My template</p>', Charset: 'utf-8' },
      { ContentType: BodyContentType.PlainText, Content: 'My template', Charset: 'utf-8' },
    ],
    TemplateScope: TemplateScope.Personal,
  };
```

Call `templatesPost`. The API returns the new template.

If the API answers with an error, the Observable fails with an `HttpErrorResponse`: the `catch` block prints its status and the API's error message. Anything else is rethrown.

```typescript
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
```

## The whole code to copy and paste

```typescript
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
```

## Run the code

Call `addTemplate()` from server-side code that runs in an injection context, or run it from Node with the runner in [Run an example from Node](../README.md#run-an-example-from-node):

```bash
npx tsx run.ts
```
