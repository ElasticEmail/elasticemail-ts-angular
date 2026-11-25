/*
 * Delete campaign
 * Deletes one campaign by name.
 *
 * Required access level: ModifyCampaigns
 *
 * Server-side only (Angular SSR or Node). The API key comes from ELASTICEMAIL_API_KEY
 * through the Configuration provider described in examples/README.md.
 */
import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { CampaignsService } from '@elasticemail/elasticemail-client-ts-angular';

export async function deleteCampaign(): Promise<void> {
  const campaigns = inject(CampaignsService);

  const name = 'hello campaign';

  try {
    await firstValueFrom(campaigns.campaignsByNameDelete(name));
    console.log('Campaign deleted.');
  } catch (error) {
    if (error instanceof HttpErrorResponse) {
      console.error(`Elastic Email API error ${error.status}:`, error.error);
    } else {
      throw error;
    }
  }
}
