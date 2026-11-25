/*
 * Load campaigns stats
 * Loads delivery statistics for your campaigns (first 100).
 *
 * Required access level: ViewChannels
 *
 * Server-side only (Angular SSR or Node). The API key comes from ELASTICEMAIL_API_KEY
 * through the Configuration provider described in examples/README.md.
 */
import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { StatisticsService } from '@elasticemail/elasticemail-client-ts-angular';

export async function loadCampaignsStats(): Promise<void> {
  const statistics = inject(StatisticsService);

  try {
    const stats = await firstValueFrom(statistics.statisticsCampaignsGet(100, 0)); // limit, offset
    console.log(stats);
  } catch (error) {
    if (error instanceof HttpErrorResponse) {
      console.error(`Elastic Email API error ${error.status}:`, error.error);
    } else {
      throw error;
    }
  }
}
