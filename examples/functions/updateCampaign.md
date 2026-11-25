# Update Campaign

*Required Access Level: ModifyCampaigns*

This example updates an existing campaign: its name, sender, template and recipient list. With the `Draft` status the campaign is only saved; other statuses send it right away or at the scheduled time.

> [!IMPORTANT]
> Run this on a server only: in [Angular SSR](https://angular.dev/guide/ssr) server code or a Node script, never in browser code. Anything in your browser bundle can be read by anyone who loads the page, and the browser can't read environment variables anyway. A browser app should call your own backend, which calls Elastic Email.

## Preparation

1. Install the SDK: `npm install @elasticemail/elasticemail-client-ts-angular`.
2. Create an API key with the **ModifyCampaigns** access level in your [API settings](https://help.elasticemail.com/en/articles/4799160-api-settings) and put it in the `ELASTICEMAIL_API_KEY` environment variable.
3. Provide `HttpClient` and a `Configuration` that reads `process.env.ELASTICEMAIL_API_KEY`, as shown in [Configure the client](../README.md#configure-the-client).

Then create `updateCampaign.ts` with the code below and replace the sample values (email addresses, names) with your own.

## Let's dig into the code

Import Angular's `inject`, `HttpErrorResponse` for API errors, RxJS `firstValueFrom` to turn the returned `Observable` into a `Promise`, and the SDK types:

```typescript
import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Campaign, CampaignsService, CampaignStatus } from '@elasticemail/elasticemail-client-ts-angular';
```

The example is a function that runs in an Angular injection context. Inject `CampaignsService`.

```typescript
export async function updateCampaign(): Promise<void> {
  const campaigns = inject(CampaignsService);
```

Name the campaign to update.

```typescript
  const name = 'hello campaign';
```

Describe the campaign as it should be after the update. `From` must be on a domain you have verified.

```typescript
  const campaign: Campaign = {
    Name: 'hello campaign update',
    Status: CampaignStatus.Draft,
    Content: [
      {
        From: 'myemail@domain.com',
        ReplyTo: 'myemail@domain.com',
        Subject: 'Hello',
        TemplateName: 'hello_template',
      },
    ],
    Recipients: {
      ListNames: ['my list name'],
    },
  };
```

Call `campaignsByNamePut`. The API returns the updated campaign.

If the API answers with an error, the Observable fails with an `HttpErrorResponse`: the `catch` block prints its status and the API's error message. Anything else is rethrown.

```typescript
  try {
    const result = await firstValueFrom(campaigns.campaignsByNamePut(name, campaign));
    console.log(result);
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
 * Update campaign
 * Updates the "hello campaign" campaign: new name, sender, template and recipient list.
 * With Status Draft it is only saved; other statuses send now or at the scheduled time.
 *
 * Required access level: ModifyCampaigns
 *
 * Server-side only (Angular SSR or Node). The API key comes from ELASTICEMAIL_API_KEY
 * through the Configuration provider described in examples/README.md.
 */
import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Campaign, CampaignsService, CampaignStatus } from '@elasticemail/elasticemail-client-ts-angular';

export async function updateCampaign(): Promise<void> {
  const campaigns = inject(CampaignsService);

  const name = 'hello campaign';

  const campaign: Campaign = {
    Name: 'hello campaign update',
    Status: CampaignStatus.Draft,
    Content: [
      {
        From: 'myemail@domain.com',
        ReplyTo: 'myemail@domain.com',
        Subject: 'Hello',
        TemplateName: 'hello_template',
      },
    ],
    Recipients: {
      ListNames: ['my list name'],
    },
  };

  try {
    const result = await firstValueFrom(campaigns.campaignsByNamePut(name, campaign));
    console.log(result);
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

Call `updateCampaign()` from server-side code that runs in an injection context, or run it from Node with the runner in [Run an example from Node](../README.md#run-an-example-from-node):

```bash
npx tsx run.ts
```
