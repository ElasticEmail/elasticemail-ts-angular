<div align="center">

<img src=".github/ee-logo.png" alt="Elastic Email" width="96" />

# Elastic Email Angular SDK

The official Angular client library for the [Elastic Email](https://elasticemail.com) REST API v4, built on Angular's `HttpClient` and RxJS.

[![npm](https://img.shields.io/npm/v/@elasticemail/elasticemail-client-ts-angular?logo=npm&label=npm&color=CB3837)](https://www.npmjs.com/package/@elasticemail/elasticemail-client-ts-angular)
[![npm downloads](https://img.shields.io/npm/dm/@elasticemail/elasticemail-client-ts-angular?logo=npm&label=downloads&color=CB3837)](https://www.npmjs.com/package/@elasticemail/elasticemail-client-ts-angular)
[![Angular](https://img.shields.io/badge/Angular-19-DD0031?logo=angular&logoColor=white)](https://angular.dev)
[![API](https://img.shields.io/badge/API-v4-0A7BBB)](https://elasticemail.com/developers/api-documentation/rest-api)
[![OpenAPI Generator](https://img.shields.io/badge/generated%20by-OpenAPI%20Generator-6BA539?logo=openapiinitiative&logoColor=white)](https://openapi-generator.tech)
[![License: MIT](https://img.shields.io/github/license/ElasticEmail/elasticemail-ts-angular?color=yellow)](LICENSE)

[![Latest release](https://img.shields.io/github/v/release/ElasticEmail/elasticemail-ts-angular?logo=github&label=release)](https://github.com/ElasticEmail/elasticemail-ts-angular/releases)
[![Last commit](https://img.shields.io/github/last-commit/ElasticEmail/elasticemail-ts-angular?logo=github)](https://github.com/ElasticEmail/elasticemail-ts-angular/commits/master)
[![Open issues](https://img.shields.io/github/issues/ElasticEmail/elasticemail-ts-angular?logo=github)](https://github.com/ElasticEmail/elasticemail-ts-angular/issues)
[![GitHub stars](https://img.shields.io/github/stars/ElasticEmail/elasticemail-ts-angular?style=flat&logo=github)](https://github.com/ElasticEmail/elasticemail-ts-angular/stargazers)

[Installation](#installation) •
[Quick start](#quick-start) •
[Examples](#more-examples) •
[API reference](#api-reference) •
[Models](#models) •
[Contributing](#contributing)

</div>

---

## Features

- **Transactional and bulk email.** Send single messages, bulk campaigns or CSV merge-file sends.
- **Contacts, lists and segments.** Add, update, import, export and bulk-delete contacts.
- **Campaigns and automations.** Create, update, pause and trigger automations for a contact.
- **Templates, files and attachments.** Manage templates and uploaded files.
- **Domains.** Verify sending domains and check SPF, DKIM, tracking and certificate status.
- **Webhooks and inbound routes.** Receive delivery events and route incoming mail.
- **Statistics, events and suppressions.** Track delivery, bounces, complaints and unsubscribes.
- **Subaccounts and security.** Manage subaccounts and API keys.
- **Angular-native.** Every API class is an injectable service (`providedIn: 'root'`) built on `HttpClient`. Methods return RxJS `Observable`s, and every request and response has a TypeScript type.

## Requirements

| Platform | Version |
| --- | --- |
| Angular | 19 (`@angular/core` and `@angular/common` `^19.0.0`) |
| RxJS | `^7.4.0` |
| TypeScript | `>=5.5.0 <5.7.0` |

You'll also need an Elastic Email **API key**. You can create one in your [API settings](https://app.elasticemail.com/marketing/settings/new/manage-api). Each endpoint's documentation lists the access level it needs.

## Installation

Install the [`@elasticemail/elasticemail-client-ts-angular`](https://www.npmjs.com/package/@elasticemail/elasticemail-client-ts-angular) package from npm:

```bash
npm install @elasticemail/elasticemail-client-ts-angular
```

Or with yarn or pnpm:

```bash
yarn add @elasticemail/elasticemail-client-ts-angular
pnpm add @elasticemail/elasticemail-client-ts-angular
```

Angular and RxJS are peer dependencies, so the SDK uses the versions your app already has. The package is built with [ng-packagr](https://github.com/ng-packagr/ng-packagr) in the Angular Package Format, so there's nothing to compile.

## Quick start

> [!IMPORTANT]
> Never ship your API key to a browser. Anything in your Angular bundle can be read by anyone who loads the page. Use the SDK with a key only in server-side code (for example [Angular SSR](https://angular.dev/guide/ssr)), or point the browser build at your own backend, which adds the key. See [Call through your own backend](#call-through-your-own-backend).

### Configure the client

Provide `HttpClient` and a `Configuration` with your API key. With Angular SSR, put the key in the server config (`app.config.server.ts`) so it never reaches the browser bundle:

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
      useFactory: () => new Configuration({
        credentials: { apikey: () => process.env['ELASTICEMAIL_API_KEY'] },
      }),
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

The API services (`EmailsService`, `ContactsService`…) are `providedIn: 'root'`, so you inject them directly. You don't need to import `ApiModule`.

> [!TIP]
> Keep your API key out of source code. Load it from an environment variable, a `.env` file that isn't committed, or a secrets manager.

### Send a transactional email

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import {
  BodyContentType,
  EmailsService,
  EmailTransactionalMessageData,
} from '@elasticemail/elasticemail-client-ts-angular';

@Injectable({ providedIn: 'root' })
export class WelcomeMailer {
  private readonly emails = inject(EmailsService);

  async sendWelcome(to: string): Promise<void> {
    const message: EmailTransactionalMessageData = {
      Recipients: {
        To: [to],
      },
      Content: {
        From: 'My App <no-reply@yourdomain.com>',
        Subject: 'Welcome aboard!',
        Body: [
          { ContentType: BodyContentType.Html, Content: '<h1>Hello!</h1><p>Thanks for signing up.</p>' },
          { ContentType: BodyContentType.PlainText, Content: 'Hello! Thanks for signing up.' },
        ],
      },
    };

    try {
      const result = await firstValueFrom(this.emails.emailsTransactionalPost(message));
      console.log(`Sent. TransactionID: ${result.TransactionID}, MessageID: ${result.MessageID}`);
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        console.error(`Elastic Email API error ${error.status}:`, error.error);
      } else {
        throw error;
      }
    }
  }
}
```

The `From` address must use a domain you've verified in your Elastic Email account.

> [!NOTE]
> Each method returns a cold `Observable`: nothing is sent until you subscribe (or call `firstValueFrom`). By default it emits the response body. Pass `'response'` as the `observe` argument to get the full `HttpResponse`, or `'events'` for progress events. Field names match the API's PascalCase names (`Recipients`, `Content`, `TransactionID`…).

### Send from a template with merge fields

```typescript
this.emails.emailsTransactionalPost({
  Recipients: { To: ['john.doe@example.com'] },
  Content: {
    From: 'My App <no-reply@yourdomain.com>',
    TemplateName: 'welcome-template',
    Merge: { firstname: 'John' },
  },
}).subscribe(result => console.log(result.TransactionID));
```

### Call through your own backend

In a browser build, leave the key out and set `basePath` to an endpoint on your own server that adds the `X-ElasticEmail-ApiKey` header and forwards the request to `https://api.elasticemail.com/v4`:

```typescript
// app.config.ts (browser)
import { Configuration } from '@elasticemail/elasticemail-client-ts-angular';

providers: [
  provideHttpClient(withFetch()),
  { provide: Configuration, useValue: new Configuration({ basePath: '/api/elasticemail' }) },
],
```

You can also provide the base path on its own with the `BASE_PATH` injection token: `{ provide: BASE_PATH, useValue: '/api/elasticemail' }`.

### Timeouts and headers

Requests go through Angular's `HttpClient`, so use an [interceptor](https://angular.dev/guide/http/interceptors) for headers, timeouts or retries on every call:

```typescript
import { HttpInterceptorFn, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { timeout } from 'rxjs';

const elasticEmailInterceptor: HttpInterceptorFn = (req, next) =>
  next(req.clone({ setHeaders: { 'X-My-Header': 'x' } })).pipe(timeout(30000)); // ms

providers: [provideHttpClient(withFetch(), withInterceptors([elasticEmailInterceptor]))],
```

For a single call, pipe RxJS operators onto the returned `Observable`, e.g. `this.emails.emailsTransactionalPost(message).pipe(timeout(30000))`.

<details>
<summary><strong>Using <code>ApiModule</code> in an NgModule app</strong></summary>

```typescript
import { NgModule } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { ApiModule, Configuration } from '@elasticemail/elasticemail-client-ts-angular';

export function apiConfigFactory(): Configuration {
  return new Configuration({ basePath: '/api/elasticemail' });
}

@NgModule({
  imports: [ApiModule.forRoot(apiConfigFactory)],
  providers: [provideHttpClient()],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Import `ApiModule` once, in your root module only. Importing it a second time throws `ApiModule is already loaded`.

</details>

<details>
<summary><strong>Customizing path parameter encoding</strong></summary>

By default only path parameters of style `simple`, and dates in `date-time` format, are encoded. Every Elastic Email path parameter uses the `simple` style, so most apps don't need to change this. To use your own encoder, pass `encodeParam` to the `Configuration`:

```typescript
import { Configuration, Param } from '@elasticemail/elasticemail-client-ts-angular';

new Configuration({
  encodeParam: (param: Param) => myParamEncoder(param),
});
```

</details>

## More examples

More complete, runnable samples are in the **[Elastic Email examples repository](https://github.com/ElasticEmail/elasticemail-examples)**. It covers transactional email, SMTP, webhooks, inbound email, contacts and serverless platforms across 20+ languages and frameworks.

- 🟢 [Node.js examples](https://github.com/ElasticEmail/elasticemail-examples/tree/main/nodejs-elasticemail-examples) (server-side TypeScript, for the backend your Angular app calls)
- 📂 [All examples](https://github.com/ElasticEmail/elasticemail-examples)

## Authentication

| Scheme | Header | Used for |
| --- | --- | --- |
| `apikey` | `X-ElasticEmail-ApiKey` | All API calls. Set it with `new Configuration({ credentials: { apikey } })` |

## API limits

- Up to **20 concurrent connections** per account
- A hard timeout of **600 seconds** per request

## API reference

All URIs are relative to `https://api.elasticemail.com/v4`. The SDK covers **114 endpoints** across 16 injectable services: `CampaignsService`, `ContactsService`, `DomainsService`, `EmailsService`, `EventsService`, `FilesService`, `InboundRouteService`, `ListsService`, `SecurityService`, `SegmentsService`, `StatisticsService`, `SubAccountsService`, `SuppressionsService`, `TemplatesService`, `VerificationsService` and `WebhookService`.

<details>
<summary><strong>Show all endpoints</strong></summary>

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*CampaignsService* | [**campaignsAutomationByNameTriggerPost**](api/campaigns.service.ts) | **POST** /campaigns/automation/{name}/trigger | Trigger Automation for Contact
*CampaignsService* | [**campaignsByNameDelete**](api/campaigns.service.ts) | **DELETE** /campaigns/{name} | Delete Campaign
*CampaignsService* | [**campaignsByNameGet**](api/campaigns.service.ts) | **GET** /campaigns/{name} | Load Campaign
*CampaignsService* | [**campaignsByNamePausePut**](api/campaigns.service.ts) | **PUT** /campaigns/{name}/pause | Pause Campaign
*CampaignsService* | [**campaignsByNamePut**](api/campaigns.service.ts) | **PUT** /campaigns/{name} | Update Campaign
*CampaignsService* | [**campaignsGet**](api/campaigns.service.ts) | **GET** /campaigns | Load Campaigns
*CampaignsService* | [**campaignsPost**](api/campaigns.service.ts) | **POST** /campaigns | Add Campaign
*ContactsService* | [**contactsByEmailDelete**](api/contacts.service.ts) | **DELETE** /contacts/{email} | Delete Contact
*ContactsService* | [**contactsByEmailGet**](api/contacts.service.ts) | **GET** /contacts/{email} | Load Contact
*ContactsService* | [**contactsByEmailPut**](api/contacts.service.ts) | **PUT** /contacts/{email} | Update Contact
*ContactsService* | [**contactsDeletePost**](api/contacts.service.ts) | **POST** /contacts/delete | Delete Contacts Bulk
*ContactsService* | [**contactsExportByIdStatusGet**](api/contacts.service.ts) | **GET** /contacts/export/{id}/status | Check Export Status
*ContactsService* | [**contactsExportPost**](api/contacts.service.ts) | **POST** /contacts/export | Export Contacts
*ContactsService* | [**contactsGet**](api/contacts.service.ts) | **GET** /contacts | Load Contacts
*ContactsService* | [**contactsImportPost**](api/contacts.service.ts) | **POST** /contacts/import | Upload Contacts
*ContactsService* | [**contactsPost**](api/contacts.service.ts) | **POST** /contacts | Add Contact
*DomainsService* | [**domainsByDomainDelete**](api/domains.service.ts) | **DELETE** /domains/{domain} | Delete Domain
*DomainsService* | [**domainsByDomainGet**](api/domains.service.ts) | **GET** /domains/{domain} | Load Domain
*DomainsService* | [**domainsByDomainPut**](api/domains.service.ts) | **PUT** /domains/{domain} | Update Domain
*DomainsService* | [**domainsByDomainRestrictedGet**](api/domains.service.ts) | **GET** /domains/{domain}/restricted | Check for domain restriction
*DomainsService* | [**domainsByDomainVerificationPut**](api/domains.service.ts) | **PUT** /domains/{domain}/verification | Verify Domain
*DomainsService* | [**domainsByEmailDefaultPatch**](api/domains.service.ts) | **PATCH** /domains/{email}/default | Set Default
*DomainsService* | [**domainsGet**](api/domains.service.ts) | **GET** /domains | Load Domains
*DomainsService* | [**domainsPost**](api/domains.service.ts) | **POST** /domains | Add Domain
*EmailsService* | [**emailsByMsgidViewGet**](api/emails.service.ts) | **GET** /emails/{msgid}/view | View Email
*EmailsService* | [**emailsByTransactionidStatusGet**](api/emails.service.ts) | **GET** /emails/{transactionid}/status | Get Status
*EmailsService* | [**emailsMergefilePost**](api/emails.service.ts) | **POST** /emails/mergefile | Send Bulk Emails CSV
*EmailsService* | [**emailsPost**](api/emails.service.ts) | **POST** /emails | Send Bulk Emails
*EmailsService* | [**emailsTransactionalPost**](api/emails.service.ts) | **POST** /emails/transactional | Send Transactional Email
*EventsService* | [**eventsByTransactionidGet**](api/events.service.ts) | **GET** /events/{transactionid} | Load Email Events
*EventsService* | [**eventsChannelsByNameExportPost**](api/events.service.ts) | **POST** /events/channels/{name}/export | Export Channel Events
*EventsService* | [**eventsChannelsByNameGet**](api/events.service.ts) | **GET** /events/channels/{name} | Load Channel Events
*EventsService* | [**eventsChannelsExportByIdStatusGet**](api/events.service.ts) | **GET** /events/channels/export/{id}/status | Check Channel Export Status
*EventsService* | [**eventsExportByIdStatusGet**](api/events.service.ts) | **GET** /events/export/{id}/status | Check Export Status
*EventsService* | [**eventsExportPost**](api/events.service.ts) | **POST** /events/export | Export Events
*EventsService* | [**eventsGet**](api/events.service.ts) | **GET** /events | Load Events
*FilesService* | [**filesByNameDelete**](api/files.service.ts) | **DELETE** /files/{name} | Delete File
*FilesService* | [**filesByNameGet**](api/files.service.ts) | **GET** /files/{name} | Download File
*FilesService* | [**filesByNameInfoGet**](api/files.service.ts) | **GET** /files/{name}/info | Load File Details
*FilesService* | [**filesGet**](api/files.service.ts) | **GET** /files | List Files
*FilesService* | [**filesPost**](api/files.service.ts) | **POST** /files | Upload File
*InboundRouteService* | [**inboundrouteByIdDelete**](api/inboundRoute.service.ts) | **DELETE** /inboundroute/{id} | Delete Route
*InboundRouteService* | [**inboundrouteByIdGet**](api/inboundRoute.service.ts) | **GET** /inboundroute/{id} | Get Route
*InboundRouteService* | [**inboundrouteByIdPut**](api/inboundRoute.service.ts) | **PUT** /inboundroute/{id} | Update Route
*InboundRouteService* | [**inboundrouteGet**](api/inboundRoute.service.ts) | **GET** /inboundroute | Get Routes
*InboundRouteService* | [**inboundrouteOrderPut**](api/inboundRoute.service.ts) | **PUT** /inboundroute/order | Update Sorting
*InboundRouteService* | [**inboundroutePost**](api/inboundRoute.service.ts) | **POST** /inboundroute | Create Route
*ListsService* | [**listsByListnameContactsGet**](api/lists.service.ts) | **GET** /lists/{listname}/contacts | Load Contacts in List
*ListsService* | [**listsByNameContactsPost**](api/lists.service.ts) | **POST** /lists/{name}/contacts | Add Contacts to List
*ListsService* | [**listsByNameContactsRemovePost**](api/lists.service.ts) | **POST** /lists/{name}/contacts/remove | Remove Contacts from List
*ListsService* | [**listsByNameDelete**](api/lists.service.ts) | **DELETE** /lists/{name} | Delete List
*ListsService* | [**listsByNameGet**](api/lists.service.ts) | **GET** /lists/{name} | Load List
*ListsService* | [**listsByNamePut**](api/lists.service.ts) | **PUT** /lists/{name} | Update List
*ListsService* | [**listsGet**](api/lists.service.ts) | **GET** /lists | Load Lists
*ListsService* | [**listsPost**](api/lists.service.ts) | **POST** /lists | Add List
*SecurityService* | [**securityApikeysByNameDelete**](api/security.service.ts) | **DELETE** /security/apikeys/{name} | Delete ApiKey
*SecurityService* | [**securityApikeysByNameGet**](api/security.service.ts) | **GET** /security/apikeys/{name} | Load ApiKey
*SecurityService* | [**securityApikeysByNamePut**](api/security.service.ts) | **PUT** /security/apikeys/{name} | Update ApiKey
*SecurityService* | [**securityApikeysGet**](api/security.service.ts) | **GET** /security/apikeys | List ApiKeys
*SecurityService* | [**securityApikeysPost**](api/security.service.ts) | **POST** /security/apikeys | Add ApiKey
*SecurityService* | [**securitySmtpByNameDelete**](api/security.service.ts) | **DELETE** /security/smtp/{name} | Delete SMTP Credential
*SecurityService* | [**securitySmtpByNameGet**](api/security.service.ts) | **GET** /security/smtp/{name} | Load SMTP Credential
*SecurityService* | [**securitySmtpByNamePut**](api/security.service.ts) | **PUT** /security/smtp/{name} | Update SMTP Credential
*SecurityService* | [**securitySmtpGet**](api/security.service.ts) | **GET** /security/smtp | List SMTP Credentials
*SecurityService* | [**securitySmtpPost**](api/security.service.ts) | **POST** /security/smtp | Add SMTP Credential
*SegmentsService* | [**segmentsByNameDelete**](api/segments.service.ts) | **DELETE** /segments/{name} | Delete Segment
*SegmentsService* | [**segmentsByNameGet**](api/segments.service.ts) | **GET** /segments/{name} | Load Segment
*SegmentsService* | [**segmentsByNamePut**](api/segments.service.ts) | **PUT** /segments/{name} | Update Segment
*SegmentsService* | [**segmentsGet**](api/segments.service.ts) | **GET** /segments | Load Segments
*SegmentsService* | [**segmentsPost**](api/segments.service.ts) | **POST** /segments | Add Segment
*StatisticsService* | [**statisticsCampaignsByNameGet**](api/statistics.service.ts) | **GET** /statistics/campaigns/{name} | Load Campaign Stats
*StatisticsService* | [**statisticsCampaignsGet**](api/statistics.service.ts) | **GET** /statistics/campaigns | Load Campaigns Stats
*StatisticsService* | [**statisticsChannelsByNameGet**](api/statistics.service.ts) | **GET** /statistics/channels/{name} | Load Channel Stats
*StatisticsService* | [**statisticsChannelsGet**](api/statistics.service.ts) | **GET** /statistics/channels | Load Channels Stats
*StatisticsService* | [**statisticsGet**](api/statistics.service.ts) | **GET** /statistics | Load Statistics
*SubAccountsService* | [**subaccountsByEmailApikeyGet**](api/subAccounts.service.ts) | **GET** /subaccounts/{email}/apikey | Get SubAccount ApiKey
*SubAccountsService* | [**subaccountsByEmailCreditsPatch**](api/subAccounts.service.ts) | **PATCH** /subaccounts/{email}/credits | Add, Subtract Email Credits
*SubAccountsService* | [**subaccountsByEmailDelete**](api/subAccounts.service.ts) | **DELETE** /subaccounts/{email} | Delete SubAccount
*SubAccountsService* | [**subaccountsByEmailGet**](api/subAccounts.service.ts) | **GET** /subaccounts/{email} | Load SubAccount
*SubAccountsService* | [**subaccountsByEmailSettingsEmailPut**](api/subAccounts.service.ts) | **PUT** /subaccounts/{email}/settings/email | Update SubAccount Email Settings
*SubAccountsService* | [**subaccountsGet**](api/subAccounts.service.ts) | **GET** /subaccounts | Load SubAccounts
*SubAccountsService* | [**subaccountsPost**](api/subAccounts.service.ts) | **POST** /subaccounts | Add SubAccount
*SuppressionsService* | [**suppressionsBouncesGet**](api/suppressions.service.ts) | **GET** /suppressions/bounces | Get Bounce List
*SuppressionsService* | [**suppressionsBouncesImportPost**](api/suppressions.service.ts) | **POST** /suppressions/bounces/import | Add Bounces Async
*SuppressionsService* | [**suppressionsBouncesPost**](api/suppressions.service.ts) | **POST** /suppressions/bounces | Add Bounces
*SuppressionsService* | [**suppressionsByEmailDelete**](api/suppressions.service.ts) | **DELETE** /suppressions/{email} | Delete Suppression
*SuppressionsService* | [**suppressionsByEmailGet**](api/suppressions.service.ts) | **GET** /suppressions/{email} | Get Suppression
*SuppressionsService* | [**suppressionsComplaintsGet**](api/suppressions.service.ts) | **GET** /suppressions/complaints | Get Complaints List
*SuppressionsService* | [**suppressionsComplaintsImportPost**](api/suppressions.service.ts) | **POST** /suppressions/complaints/import | Add Complaints Async
*SuppressionsService* | [**suppressionsComplaintsPost**](api/suppressions.service.ts) | **POST** /suppressions/complaints | Add Complaints
*SuppressionsService* | [**suppressionsGet**](api/suppressions.service.ts) | **GET** /suppressions | Get Suppressions
*SuppressionsService* | [**suppressionsUnsubscribesGet**](api/suppressions.service.ts) | **GET** /suppressions/unsubscribes | Get Unsubscribes List
*SuppressionsService* | [**suppressionsUnsubscribesImportPost**](api/suppressions.service.ts) | **POST** /suppressions/unsubscribes/import | Add Unsubscribes Async
*SuppressionsService* | [**suppressionsUnsubscribesPost**](api/suppressions.service.ts) | **POST** /suppressions/unsubscribes | Add Unsubscribes
*TemplatesService* | [**templatesByNameDelete**](api/templates.service.ts) | **DELETE** /templates/{name} | Delete Template
*TemplatesService* | [**templatesByNameGet**](api/templates.service.ts) | **GET** /templates/{name} | Load Template
*TemplatesService* | [**templatesByNamePut**](api/templates.service.ts) | **PUT** /templates/{name} | Update Template
*TemplatesService* | [**templatesGet**](api/templates.service.ts) | **GET** /templates | Load Templates
*TemplatesService* | [**templatesPost**](api/templates.service.ts) | **POST** /templates | Add Template
*VerificationsService* | [**verificationsByEmailDelete**](api/verifications.service.ts) | **DELETE** /verifications/{email} | Delete Email Verification Result
*VerificationsService* | [**verificationsByEmailGet**](api/verifications.service.ts) | **GET** /verifications/{email} | Get Email Verification Result
*VerificationsService* | [**verificationsByEmailPost**](api/verifications.service.ts) | **POST** /verifications/{email} | Verify Email
*VerificationsService* | [**verificationsFilesByIdDelete**](api/verifications.service.ts) | **DELETE** /verifications/files/{id} | Delete File Verification Result
*VerificationsService* | [**verificationsFilesByIdResultDownloadGet**](api/verifications.service.ts) | **GET** /verifications/files/{id}/result/download | Download File Verification Result
*VerificationsService* | [**verificationsFilesByIdResultGet**](api/verifications.service.ts) | **GET** /verifications/files/{id}/result | Get Detailed File Verification Result
*VerificationsService* | [**verificationsFilesByIdVerificationPost**](api/verifications.service.ts) | **POST** /verifications/files/{id}/verification | Start verification
*VerificationsService* | [**verificationsFilesPost**](api/verifications.service.ts) | **POST** /verifications/files | Upload File with Emails
*VerificationsService* | [**verificationsFilesResultGet**](api/verifications.service.ts) | **GET** /verifications/files/result | Get Files Verification Results
*VerificationsService* | [**verificationsGet**](api/verifications.service.ts) | **GET** /verifications | Get Emails Verification Results
*WebhookService* | [**webhookByPublicidDelete**](api/webhook.service.ts) | **DELETE** /webhook/{publicid} | Delete Webhook
*WebhookService* | [**webhookByPublicidGet**](api/webhook.service.ts) | **GET** /webhook/{publicid} | Load Webhook
*WebhookService* | [**webhookByPublicidPut**](api/webhook.service.ts) | **PUT** /webhook/{publicid} | Update Webhook
*WebhookService* | [**webhookGet**](api/webhook.service.ts) | **GET** /webhook | Load Webhooks
*WebhookService* | [**webhookPost**](api/webhook.service.ts) | **POST** /webhook | Add Webhook

</details>

## Models

All models are TypeScript interfaces (or `as const` enums) exported from the package root.

<details>
<summary><strong>Show all 98 models</strong></summary>

 - [AccessLevel](model/accessLevel.ts)
 - [AccountStatusEnum](model/accountStatusEnum.ts)
 - [ApiKey](model/apiKey.ts)
 - [ApiKeyPayload](model/apiKeyPayload.ts)
 - [BodyContentType](model/bodyContentType.ts)
 - [BodyPart](model/bodyPart.ts)
 - [Campaign](model/campaign.ts)
 - [CampaignOptions](model/campaignOptions.ts)
 - [CampaignRecipient](model/campaignRecipient.ts)
 - [CampaignStatus](model/campaignStatus.ts)
 - [CampaignTemplate](model/campaignTemplate.ts)
 - [CertificateValidationStatus](model/certificateValidationStatus.ts)
 - [ChannelLogStatusSummary](model/channelLogStatusSummary.ts)
 - [CompressionFormat](model/compressionFormat.ts)
 - [ConsentData](model/consentData.ts)
 - [ConsentTracking](model/consentTracking.ts)
 - [Contact](model/contact.ts)
 - [ContactActivity](model/contactActivity.ts)
 - [ContactPayload](model/contactPayload.ts)
 - [ContactSource](model/contactSource.ts)
 - [ContactStatus](model/contactStatus.ts)
 - [ContactUpdatePayload](model/contactUpdatePayload.ts)
 - [ContactsList](model/contactsList.ts)
 - [DKIMRecord](model/dKIMRecord.ts)
 - [DeliveryOptimizationType](model/deliveryOptimizationType.ts)
 - [DomainData](model/domainData.ts)
 - [DomainDetail](model/domainDetail.ts)
 - [DomainOwner](model/domainOwner.ts)
 - [DomainPayload](model/domainPayload.ts)
 - [DomainUpdatePayload](model/domainUpdatePayload.ts)
 - [EmailContent](model/emailContent.ts)
 - [EmailData](model/emailData.ts)
 - [EmailJobFailedStatus](model/emailJobFailedStatus.ts)
 - [EmailJobStatus](model/emailJobStatus.ts)
 - [EmailMessageData](model/emailMessageData.ts)
 - [EmailPredictedValidationStatus](model/emailPredictedValidationStatus.ts)
 - [EmailRecipient](model/emailRecipient.ts)
 - [EmailSend](model/emailSend.ts)
 - [EmailStatus](model/emailStatus.ts)
 - [EmailTransactionalMessageData](model/emailTransactionalMessageData.ts)
 - [EmailValidationResult](model/emailValidationResult.ts)
 - [EmailValidationStatus](model/emailValidationStatus.ts)
 - [EmailView](model/emailView.ts)
 - [EmailsPayload](model/emailsPayload.ts)
 - [EncodingType](model/encodingType.ts)
 - [EventType](model/eventType.ts)
 - [EventsOrderBy](model/eventsOrderBy.ts)
 - [ExportFileFormats](model/exportFileFormats.ts)
 - [ExportLink](model/exportLink.ts)
 - [ExportStatus](model/exportStatus.ts)
 - [FileInfo](model/fileInfo.ts)
 - [FilePayload](model/filePayload.ts)
 - [FileUploadResult](model/fileUploadResult.ts)
 - [InboundPayload](model/inboundPayload.ts)
 - [InboundRoute](model/inboundRoute.ts)
 - [InboundRouteActionType](model/inboundRouteActionType.ts)
 - [InboundRouteFilterType](model/inboundRouteFilterType.ts)
 - [ListPayload](model/listPayload.ts)
 - [ListUpdatePayload](model/listUpdatePayload.ts)
 - [LogJobStatus](model/logJobStatus.ts)
 - [LogStatusSummary](model/logStatusSummary.ts)
 - [MergeEmailPayload](model/mergeEmailPayload.ts)
 - [MessageAttachment](model/messageAttachment.ts)
 - [MessageCategory](model/messageCategory.ts)
 - [MessageCategoryEnum](model/messageCategoryEnum.ts)
 - [NewApiKey](model/newApiKey.ts)
 - [NewSmtpCredentials](model/newSmtpCredentials.ts)
 - [Options](model/options.ts)
 - [RecipientEvent](model/recipientEvent.ts)
 - [Segment](model/segment.ts)
 - [SegmentPayload](model/segmentPayload.ts)
 - [SmtpCredentials](model/smtpCredentials.ts)
 - [SmtpCredentialsPayload](model/smtpCredentialsPayload.ts)
 - [SortOrderItem](model/sortOrderItem.ts)
 - [SplitOptimizationType](model/splitOptimizationType.ts)
 - [SplitOptions](model/splitOptions.ts)
 - [SubAccountInfo](model/subAccountInfo.ts)
 - [SubaccountEmailCreditsPayload](model/subaccountEmailCreditsPayload.ts)
 - [SubaccountEmailSettings](model/subaccountEmailSettings.ts)
 - [SubaccountEmailSettingsPayload](model/subaccountEmailSettingsPayload.ts)
 - [SubaccountPayload](model/subaccountPayload.ts)
 - [SubaccountSettingsInfo](model/subaccountSettingsInfo.ts)
 - [SubaccountSettingsInfoPayload](model/subaccountSettingsInfoPayload.ts)
 - [Suppression](model/suppression.ts)
 - [Template](model/template.ts)
 - [TemplatePayload](model/templatePayload.ts)
 - [TemplateScope](model/templateScope.ts)
 - [TemplateType](model/templateType.ts)
 - [TrackingType](model/trackingType.ts)
 - [TrackingValidationStatus](model/trackingValidationStatus.ts)
 - [TransactionalRecipient](model/transactionalRecipient.ts)
 - [Utm](model/utm.ts)
 - [VerificationFileResult](model/verificationFileResult.ts)
 - [VerificationFileResultDetails](model/verificationFileResultDetails.ts)
 - [VerificationStatus](model/verificationStatus.ts)
 - [Webhook](model/webhook.ts)
 - [WebhookCreatePayload](model/webhookCreatePayload.ts)
 - [WebhookUpdatePayload](model/webhookUpdatePayload.ts)

</details>

## Building from source

```bash
npm install
npm run build
```

`npm run build` packages the library into `dist/` with [ng-packagr](https://github.com/ng-packagr/ng-packagr). To publish, run `npm publish dist` (note the `dist` folder).

## Versioning

The SDK follows the Elastic Email API v4. Package versions are listed on [npm](https://www.npmjs.com/package/@elasticemail/elasticemail-client-ts-angular?activeTab=versions) and release notes in [GitHub Releases](https://github.com/ElasticEmail/elasticemail-ts-angular/releases).

<details>
<summary>Build details</summary>

- API version: 4.0.0
- SDK version: 4.2.0
- Build package: `org.openapitools.codegen.languages.TypeScriptAngularClientCodegen`

</details>

## Contributing

Contributions are welcome! Most of this SDK is generated by [OpenAPI Generator](https://openapi-generator.tech) from the Elastic Email API specification, so please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

- 🐛 [Report a bug](https://github.com/ElasticEmail/elasticemail-ts-angular/issues/new?template=bug_report.md)
- 💡 [Request a feature](https://github.com/ElasticEmail/elasticemail-ts-angular/issues/new?template=feature_request.md)
- 🔒 [Report a security issue](SECURITY.md)

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md).

## Support

> [!IMPORTANT]
> The fastest way to get help is the **chat widget on [elasticemail.com](https://elasticemail.com)**. Our support team can help with your account, sending, deliverability and API questions.

- 💬 [Chat with support on elasticemail.com](https://elasticemail.com) (preferred)
- 📚 [API documentation](https://elasticemail.com/developers/api-documentation/rest-api)
- 🧪 [Examples repository](https://github.com/ElasticEmail/elasticemail-examples)
- 🐛 [GitHub issues](https://github.com/ElasticEmail/elasticemail-ts-angular/issues), for bugs in this SDK only

## License

Released under the [MIT License](LICENSE). Copyright © 2021–2026 Elastic Email.
