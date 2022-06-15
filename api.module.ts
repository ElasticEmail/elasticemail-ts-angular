import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';

import { CampaignsService } from './api/campaigns.service';
import { ContactsService } from './api/contacts.service';
import { EmailsService } from './api/emails.service';
import { EventsService } from './api/events.service';
import { FilesService } from './api/files.service';
import { InboundRouteService } from './api/inboundRoute.service';
import { ListsService } from './api/lists.service';
import { SecurityService } from './api/security.service';
import { SegmentsService } from './api/segments.service';
import { StatisticsService } from './api/statistics.service';
import { SubAccountsService } from './api/subAccounts.service';
import { SuppressionsService } from './api/suppressions.service';
import { TemplatesService } from './api/templates.service';
import { VerificationsService } from './api/verifications.service';

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
