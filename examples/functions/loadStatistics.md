# Load Statistics

*Required Access Level: ViewReports*

This example loads account-wide delivery statistics for a date range.

> [!IMPORTANT]
> Run this on a server only: in [Angular SSR](https://angular.dev/guide/ssr) server code or a Node script, never in browser code. Anything in your browser bundle can be read by anyone who loads the page, and the browser can't read environment variables anyway. A browser app should call your own backend, which calls Elastic Email.

## Preparation

1. Install the SDK: `npm install @elasticemail/elasticemail-client-ts-angular`.
2. Create an API key with the **ViewReports** access level in your [API settings](https://help.elasticemail.com/en/articles/4799160-api-settings) and put it in the `ELASTICEMAIL_API_KEY` environment variable.
3. Provide `HttpClient` and a `Configuration` that reads `process.env.ELASTICEMAIL_API_KEY`, as shown in [Configure the client](../README.md#configure-the-client).

Then create `loadStatistics.ts` with the code below and replace the sample values (email addresses, names) with your own.

## Let's dig into the code

Import Angular's `inject`, `HttpErrorResponse` for API errors, RxJS `firstValueFrom` to turn the returned `Observable` into a `Promise`, and the SDK types:

```typescript
import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { StatisticsService } from '@elasticemail/elasticemail-client-ts-angular';
```

The example is a function that runs in an Angular injection context. Inject `StatisticsService`.

```typescript
export async function loadStatistics(): Promise<void> {
  const statistics = inject(StatisticsService);
```

Set the date range in the `YYYY-MM-DDThh:mm:ss` format. The end date is optional: call `statisticsGet(from)` to get everything since the start date.

```typescript
  const from = '2022-01-01T00:00:00';
  const to = '2022-01-30T00:00:00';
```

Call `statisticsGet` and print the result.

If the API answers with an error, the Observable fails with an `HttpErrorResponse`: the `catch` block prints its status and the API's error message. Anything else is rethrown.

```typescript
  try {
    const stats = await firstValueFrom(statistics.statisticsGet(from, to));
    console.log(`From ${from} to ${to}:`, stats);
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
 * Load statistics
 * Loads account-wide delivery statistics for a date range.
 * Dates use the YYYY-MM-DDThh:mm:ss format; the end date is optional.
 *
 * Required access level: ViewReports
 *
 * Server-side only (Angular SSR or Node). The API key comes from ELASTICEMAIL_API_KEY
 * through the Configuration provider described in examples/README.md.
 */
import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { StatisticsService } from '@elasticemail/elasticemail-client-ts-angular';

export async function loadStatistics(): Promise<void> {
  const statistics = inject(StatisticsService);

  const from = '2022-01-01T00:00:00';
  const to = '2022-01-30T00:00:00';

  try {
    const stats = await firstValueFrom(statistics.statisticsGet(from, to));
    console.log(`From ${from} to ${to}:`, stats);
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

Call `loadStatistics()` from server-side code that runs in an injection context, or run it from Node with the runner in [Run an example from Node](../README.md#run-an-example-from-node):

```bash
npx tsx run.ts
```
