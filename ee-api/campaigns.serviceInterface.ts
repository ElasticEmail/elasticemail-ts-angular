/**
 * Elastic Email REST API
 * This API is based on the REST API architecture, allowing the user to easily manage their data with this resource-based approach.    Every API call is established on which specific request type (GET, POST, PUT, DELETE) will be used.    The API has a limit of 20 concurrent connections and a hard timeout of 600 seconds per request.    To start using this API, you will need your Access Token (available <a target=\"_blank\" href=\"https://elasticemail.com/account#/settings/new/manage-api\">here</a>). Remember to keep it safe. Required access levels are listed in the given request’s description.    This is the documentation for REST API. If you’d like to read our legacy documentation regarding Web API v2 click <a target=\"_blank\" href=\"https://api.elasticemail.com/public/help\">here</a>.    Downloadable library clients can be found in our Github repository <a target=\"_blank\" href=\"https://github.com/ElasticEmail?tab=repositories&q=%22rest+api%22+in%3Areadme\">here</a>
 *
 * The version of the OpenAPI document: 4.0.0
 * Contact: support@elasticemail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { HttpHeaders }                                       from '@angular/common/http';

import { Observable }                                        from 'rxjs';

import { Campaign } from '../model/models';


import { Configuration }                                     from '../configuration';



export interface CampaignsServiceInterface {
    defaultHeaders: HttpHeaders;
    configuration: Configuration;

    /**
     * Delete Campaign
     * Delete the specific campaign.  This does not cancel in progress email, see Cancel In Progress. Required Access Level: ModifyCampaigns
     * @param name Name of Campaign to delete
     */
    campaignsByNameDelete(name: string, extraHttpRequestParams?: any): Observable<{}>;

    /**
     * Load Campaign
     * Returns the specified campaign details. Required Access Level: ViewCampaigns
     * @param name Name of Campaign to get
     */
    campaignsByNameGet(name: string, extraHttpRequestParams?: any): Observable<Campaign>;

    /**
     * Update Campaign
     * Updates a previously added campaign.  Only Active and Paused campaigns can be updated. Required Access Level: ModifyCampaigns
     * @param name Name of Campaign to update
     * @param campaign JSON representation of a campaign
     */
    campaignsByNamePut(name: string, campaign: Campaign, extraHttpRequestParams?: any): Observable<Campaign>;

    /**
     * Load Campaigns
     * Returns a list all of your campaigns. Limited to 1000 results. Required Access Level: ViewCampaigns
     * @param search Text fragment used for searching in Campaign name (using the \&#39;contains\&#39; rule)
     * @param offset How many items should be returned ahead.
     * @param limit Maximum number of returned items.
     */
    campaignsGet(search?: string, offset?: number, limit?: number, extraHttpRequestParams?: any): Observable<Array<Campaign>>;

    /**
     * Add Campaign
     * Add a campaign for processing. Required Access Level: ModifyCampaigns
     * @param campaign JSON representation of a campaign
     */
    campaignsPost(campaign: Campaign, extraHttpRequestParams?: any): Observable<Campaign>;

}
