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
