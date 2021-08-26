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

import { Suppression } from '../model/models';


import { Configuration }                                     from '../configuration';



export interface SuppressionsServiceInterface {
    defaultHeaders: HttpHeaders;
    configuration: Configuration;

    /**
     * Get Bounce List
     * Retrieve your list of bounced emails. Required Access Level: ViewContacts
     * @param search Text fragment used for searching.
     * @param limit Maximum number of returned items.
     * @param offset How many items should be returned ahead.
     */
    suppressionsBouncesGet(search?: string, limit?: number, offset?: number, extraHttpRequestParams?: any): Observable<Array<Suppression>>;

    /**
     * Add Bounces Async
     * Add Bounced. Required Access Level: ModifyContacts
     * @param file 
     */
    suppressionsBouncesImportPost(file?: Blob, extraHttpRequestParams?: any): Observable<{}>;

    /**
     * Add Bounces
     * Add Bounced. Required Access Level: ModifyContacts
     * @param requestBody Emails to add as bounces. Limited to 1000 per request
     */
    suppressionsBouncesPost(requestBody: Array<string>, extraHttpRequestParams?: any): Observable<Array<Suppression>>;

    /**
     * Delete Suppression
     * Delete Suppression. Required Access Level: ViewContacts
     * @param email Proper email address.
     */
    suppressionsByEmailDelete(email: string, extraHttpRequestParams?: any): Observable<{}>;

    /**
     * Get Suppression
     * Retrieve your suppression. Required Access Level: ViewContacts
     * @param email Proper email address.
     */
    suppressionsByEmailGet(email: string, extraHttpRequestParams?: any): Observable<Suppression>;

    /**
     * Get Complaints List
     * Retrieve your list of complaints. Required Access Level: ViewContacts
     * @param search Text fragment used for searching.
     * @param limit Maximum number of returned items.
     * @param offset How many items should be returned ahead.
     */
    suppressionsComplaintsGet(search?: string, limit?: number, offset?: number, extraHttpRequestParams?: any): Observable<Array<Suppression>>;

    /**
     * Add Complaints Async
     * Add Complaints. Required Access Level: ModifyContacts
     * @param file 
     */
    suppressionsComplaintsImportPost(file?: Blob, extraHttpRequestParams?: any): Observable<{}>;

    /**
     * Add Complaints
     * Add Complaints. Required Access Level: ModifyContacts
     * @param requestBody Emails to add as complaints. Limited to 1000 per request
     */
    suppressionsComplaintsPost(requestBody: Array<string>, extraHttpRequestParams?: any): Observable<Array<Suppression>>;

    /**
     * Get Suppressions
     * Retrieve your suppressions. Required Access Level: ViewContacts
     * @param limit Maximum number of returned items.
     * @param offset How many items should be returned ahead.
     */
    suppressionsGet(limit?: number, offset?: number, extraHttpRequestParams?: any): Observable<Array<Suppression>>;

    /**
     * Get Unsubscribes List
     * Retrieve your list of unsubscribes. Required Access Level: ViewContacts
     * @param search Text fragment used for searching.
     * @param limit Maximum number of returned items.
     * @param offset How many items should be returned ahead.
     */
    suppressionsUnsubscribesGet(search?: string, limit?: number, offset?: number, extraHttpRequestParams?: any): Observable<Array<Suppression>>;

    /**
     * Add Unsubscribes Async
     * Add Unsubscribes. Required Access Level: ModifyContacts
     * @param file 
     */
    suppressionsUnsubscribesImportPost(file?: Blob, extraHttpRequestParams?: any): Observable<{}>;

    /**
     * Add Unsubscribes
     * Add Unsubscribes. Required Access Level: ModifyContacts
     * @param requestBody Emails to add as unsubscribes. Limited to 1000 per request
     */
    suppressionsUnsubscribesPost(requestBody: Array<string>, extraHttpRequestParams?: any): Observable<Array<Suppression>>;

}
