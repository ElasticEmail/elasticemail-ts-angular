/*
 * Add campaign
 * Creates a new campaign that sends the "hello_template" template to the "my list name" list.
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

export async function addCampaign(): Promise<void> {
  const campaigns = inject(CampaignsService);

  const campaign: Campaign = {
    Name: 'hello campaign',
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
    const result = await firstValueFrom(campaigns.campaignsPost(campaign));
    console.log(result);
  } catch (error) {
    if (error instanceof HttpErrorResponse) {
      console.error(`Elastic Email API error ${error.status}:`, error.error);
    } else {
      throw error;
    }
  }
}
