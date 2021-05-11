import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';

import { CampaignsService } from './ee-api/campaigns.service';
import { ContactsService } from './ee-api/contacts.service';
import { EmailsService } from './ee-api/emails.service';
import { EventsService } from './ee-api/events.service';
import { FilesService } from './ee-api/files.service';
import { InboundRouteService } from './ee-api/inboundRoute.service';
import { ListsService } from './ee-api/lists.service';
import { SecurityService } from './ee-api/security.service';
import { SegmentsService } from './ee-api/segments.service';
import { StatisticsService } from './ee-api/statistics.service';
import { SubAccountsService } from './ee-api/subAccounts.service';
import { SuppressionsService } from './ee-api/suppressions.service';
import { TemplatesService } from './ee-api/templates.service';
import { VerificationsService } from './ee-api/verifications.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: []
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
