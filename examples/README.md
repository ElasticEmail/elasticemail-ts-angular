# Elastic Email Angular SDK examples

Short examples for [`@elasticemail/elasticemail-client-ts-angular`](https://www.npmjs.com/package/@elasticemail/elasticemail-client-ts-angular), one per API operation. Each file in [functions/](functions) exports one async function that injects an SDK service (`EmailsService`, `ContactsService`…) and makes one call. Each has a `.md` walkthrough next to it.

> [!IMPORTANT]
> These examples run on a server only: in [Angular SSR](https://angular.dev/guide/ssr) server code or a Node script. Never put an API key in browser code. Anything in your browser bundle can be read by anyone who loads the page, and the browser can't read environment variables anyway. A browser app should call your own backend, which adds the key (see [Call through your own backend](../README.md#call-through-your-own-backend)).

## Install

```bash
npm install @elasticemail/elasticemail-client-ts-angular
```

The SDK needs Angular 19 (`@angular/core`, `@angular/common`) and RxJS 7.

Create an API key in your [API settings](https://help.elasticemail.com/en/articles/4799160-api-settings), with the access level the example needs (see the table below), and put it in the `ELASTICEMAIL_API_KEY` environment variable. Sends need a sender address on a [verified domain](https://help.elasticemail.com/en/articles/4934400-how-to-verify-your-domain).

## Configure the client

The examples don't set the API key themselves. Provide `HttpClient` and a `Configuration` once, in server-only config, and read the key from `process.env.ELASTICEMAIL_API_KEY`. With Angular SSR that is `app.config.server.ts`:

```typescript
// app.config.server.ts
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { Configuration } from '@elasticemail/elasticemail-client-ts-angular';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    {
      provide: Configuration,
      useFactory: () => {
        const apiKey = process.env['ELASTICEMAIL_API_KEY'];
        if (!apiKey) {
          throw new Error('Set the ELASTICEMAIL_API_KEY environment variable to your Elastic Email API key.');
        }
        return new Configuration({ credentials: { apikey: apiKey } });
      },
    },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
```

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withFetch())],
};
```

Each example calls `inject()`, so call it where injection works: in a constructor or field initializer of a server-side service, or with `runInInjectionContext(injector, sendTransactionalEmails)`.

## Run an example from Node

To try an example without an app, start Angular's injector in a small Node script. Create a folder and install the SDK, its Angular peers and [tsx](https://tsx.is):

```bash
mkdir ee-examples && cd ee-examples
npm init -y && npm pkg set type=module
npm install @elasticemail/elasticemail-client-ts-angular @angular/core@19 @angular/common@19 @angular/compiler@19 @angular/platform-browser@19 rxjs tsx
```

Copy an example (for instance `sendTransactionalEmails.ts`) into the folder, plus `files/contacts.csv` for `uploadContacts`. Then add `run.ts`:

```typescript
// run.ts
import '@angular/compiler';
import { enableProdMode, provideExperimentalZonelessChangeDetection, runInInjectionContext } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { createApplication } from '@angular/platform-browser';
import { Configuration } from '@elasticemail/elasticemail-client-ts-angular';
import { sendTransactionalEmails } from './sendTransactionalEmails';

const apiKey = process.env['ELASTICEMAIL_API_KEY'];
if (!apiKey) {
  console.error('Set the ELASTICEMAIL_API_KEY environment variable to your Elastic Email API key.');
  process.exit(1);
}

// Starts Angular's injector without rendering anything. Production mode skips
// development checks that expect a browser page.
enableProdMode();
const app = await createApplication({
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideHttpClient(withFetch()),
    { provide: Configuration, useValue: new Configuration({ credentials: { apikey: apiKey } }) },
  ],
});

await runInInjectionContext(app.injector, sendTransactionalEmails);
app.destroy();
```

With `ELASTICEMAIL_API_KEY` set in your shell, run it:

```bash
npx tsx run.ts
```

To run another example, change the import and the function passed to `runInInjectionContext`.

## Examples

File names use the same camelCase names as the examples in the other Elastic Email SDKs.

| Example | What it does | SDK call | Access level |
| --- | --- | --- | --- |
| [addCampaign](functions/addCampaign.ts) ([walkthrough](functions/addCampaign.md)) | Create a campaign | `CampaignsService.campaignsPost` | ModifyCampaigns |
| [addContacts](functions/addContacts.ts) ([walkthrough](functions/addContacts.md)) | Add contacts to a list | `ContactsService.contactsPost` | ModifyContacts |
| [addList](functions/addList.ts) ([walkthrough](functions/addList.md)) | Create a contact list | `ListsService.listsPost` | ModifyContacts |
| [addTemplate](functions/addTemplate.ts) ([walkthrough](functions/addTemplate.md)) | Create a template | `TemplatesService.templatesPost` | ModifyTemplates |
| [deleteCampaign](functions/deleteCampaign.ts) ([walkthrough](functions/deleteCampaign.md)) | Delete a campaign | `CampaignsService.campaignsByNameDelete` | ModifyCampaigns |
| [deleteContact](functions/deleteContact.ts) ([walkthrough](functions/deleteContact.md)) | Delete one contact by email | `ContactsService.contactsByEmailDelete` | ModifyContacts |
| [deleteContacts](functions/deleteContacts.ts) ([walkthrough](functions/deleteContacts.md)) | Delete several contacts at once | `ContactsService.contactsDeletePost` | ModifyContacts |
| [deleteList](functions/deleteList.ts) ([walkthrough](functions/deleteList.md)) | Delete a contact list | `ListsService.listsByNameDelete` | ModifyContacts |
| [deleteTemplate](functions/deleteTemplate.ts) ([walkthrough](functions/deleteTemplate.md)) | Delete a template | `TemplatesService.templatesByNameDelete` | ModifyTemplates |
| [exportContacts](functions/exportContacts.ts) ([walkthrough](functions/exportContacts.md)) | Export contacts to a CSV file | `ContactsService.contactsExportPost` | Export |
| [loadCampaign](functions/loadCampaign.ts) ([walkthrough](functions/loadCampaign.md)) | Load a campaign | `CampaignsService.campaignsByNameGet` | ViewCampaigns |
| [loadCampaignsStats](functions/loadCampaignsStats.ts) ([walkthrough](functions/loadCampaignsStats.md)) | Load campaign statistics | `StatisticsService.statisticsCampaignsGet` | ViewChannels |
| [loadChannelsStats](functions/loadChannelsStats.ts) ([walkthrough](functions/loadChannelsStats.md)) | Load channel statistics | `StatisticsService.statisticsChannelsGet` | ViewChannels |
| [loadList](functions/loadList.ts) ([walkthrough](functions/loadList.md)) | Load a contact list | `ListsService.listsByNameGet` | ViewContacts |
| [loadStatistics](functions/loadStatistics.ts) ([walkthrough](functions/loadStatistics.md)) | Load account statistics for a date range | `StatisticsService.statisticsGet` | ViewReports |
| [loadTemplate](functions/loadTemplate.ts) ([walkthrough](functions/loadTemplate.md)) | Load a template | `TemplatesService.templatesByNameGet` | ViewTemplates |
| [sendBulkEmails](functions/sendBulkEmails.ts) ([walkthrough](functions/sendBulkEmails.md)) | Send a bulk email with merge fields | `EmailsService.emailsPost` | SendHttp |
| [sendTransactionalEmails](functions/sendTransactionalEmails.ts) ([walkthrough](functions/sendTransactionalEmails.md)) | Send a transactional email | `EmailsService.emailsTransactionalPost` | SendHttp |
| [sendTransactionalEmailsWithAttachment](functions/sendTransactionalEmailsWithAttachment.ts) ([walkthrough](functions/sendTransactionalEmailsWithAttachment.md)) | Send a transactional email with a PDF attached | `EmailsService.emailsTransactionalPost` | SendHttp |
| [updateCampaign](functions/updateCampaign.ts) ([walkthrough](functions/updateCampaign.md)) | Update a campaign | `CampaignsService.campaignsByNamePut` | ModifyCampaigns |
| [uploadContacts](functions/uploadContacts.ts) ([walkthrough](functions/uploadContacts.md)) | Import contacts from a CSV file | `ContactsService.contactsImportPost` | ModifyContacts |

The send examples pass an `Idempotency-Key` (a `crypto.randomUUID()`) as the second argument of `emailsTransactionalPost` / `emailsPost`, so retrying a send that timed out can't deliver it twice. They print the key next to the `TransactionID`. See [Retry a send safely](../README.md#retry-a-send-safely-idempotency-key).
