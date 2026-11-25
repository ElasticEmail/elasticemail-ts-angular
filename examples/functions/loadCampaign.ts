/*
 * Load campaign
 * Loads one campaign by name: its status, recipients, sender, subject and template.
 *
 * Required access level: ViewCampaigns
 *
 * Server-side only (Angular SSR or Node). The API key comes from ELASTICEMAIL_API_KEY
 * through the Configuration provider described in examples/README.md.
 */
import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { CampaignsService } from '@elasticemail/elasticemail-client-ts-angular';

export async function loadCampaign(): Promise<void> {
  const campaigns = inject(CampaignsService);

  const name = 'hello campaign';

  try {
    const campaign = await firstValueFrom(campaigns.campaignsByNameGet(name));
    console.log(campaign);
  } catch (error) {
    if (error instanceof HttpErrorResponse) {
      console.error(`Elastic Email API error ${error.status}:`, error.error);
    } else {
      throw error;
    }
  }
}
