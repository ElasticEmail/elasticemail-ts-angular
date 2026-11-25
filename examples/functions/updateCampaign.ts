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
