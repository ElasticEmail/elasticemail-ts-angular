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

import { InboundPayload } from '../model/models';
import { InboundRoute } from '../model/models';
import { SortOrderItem } from '../model/models';


import { Configuration }                                     from '../configuration';



export interface InboundRouteServiceInterface {
    defaultHeaders: HttpHeaders;
    configuration: Configuration;

    /**
     * Delete Route
     * Deletes the Inbound Route. Required Access Level: ModifySettings
     * @param id 
     */
    inboundrouteByIdDelete(id: string, extraHttpRequestParams?: any): Observable<{}>;

    /**
     * Get Route
     * Load an Inbound Route. Required Access Level: ViewSettings
     * @param id ID number of your attachment
     */
    inboundrouteByIdGet(id: string, extraHttpRequestParams?: any): Observable<InboundRoute>;

    /**
     * Update Route
     * Update the Inbound Route. Required Access Level: ModifySettings
     * @param id 
     * @param inboundPayload 
     */
    inboundrouteByIdPut(id: string, inboundPayload: InboundPayload, extraHttpRequestParams?: any): Observable<InboundRoute>;

    /**
     * Get Routes
     * Get all your Inbound Routes. Required Access Level: ViewSettings
     */
    inboundrouteGet(extraHttpRequestParams?: any): Observable<Array<InboundRoute>>;

    /**
     * Update Sorting
     * Required Access Level: ViewSettings
     * @param sortOrderItem Change the ordering of inbound routes for when matching the inbound
     */
    inboundrouteOrderPut(sortOrderItem: Array<SortOrderItem>, extraHttpRequestParams?: any): Observable<Array<InboundRoute>>;

    /**
     * Create Route
     * Create new Inbound Route. Required Access Level: ModifySettings
     * @param inboundPayload 
     */
    inboundroutePost(inboundPayload: InboundPayload, extraHttpRequestParams?: any): Observable<InboundRoute>;

}
