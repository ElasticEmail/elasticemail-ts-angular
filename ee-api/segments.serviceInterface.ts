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

import { Segment } from '../model/models';
import { SegmentPayload } from '../model/models';


import { Configuration }                                     from '../configuration';



export interface SegmentsServiceInterface {
    defaultHeaders: HttpHeaders;
    configuration: Configuration;

    /**
     * Delete Segment
     * Delete an existing segment. Required Access Level: ModifyContacts
     * @param name Name of your segment.
     */
    segmentsByNameDelete(name: string, extraHttpRequestParams?: any): Observable<{}>;

    /**
     * Load Segment
     * Returns details for the specified segment. Required Access Level: ViewContacts
     * @param name Name of the segment you want to load. Will load all contacts if the \&#39;All Contacts\&#39; name has been provided
     */
    segmentsByNameGet(name: string, extraHttpRequestParams?: any): Observable<Segment>;

    /**
     * Update Segment
     * Rename or change RULE for your segment. Required Access Level: ModifyContacts
     * @param name Name of your segment.
     * @param segmentPayload 
     */
    segmentsByNamePut(name: string, segmentPayload: SegmentPayload, extraHttpRequestParams?: any): Observable<Segment>;

    /**
     * Load Segments
     * Returns a list of all your available Segments. Required Access Level: ViewContacts
     * @param limit Maximum number of returned items.
     * @param offset How many items should be returned ahead.
     */
    segmentsGet(limit?: number, offset?: number, extraHttpRequestParams?: any): Observable<Array<Segment>>;

    /**
     * Add Segment
     * Add a new segment, based on specified RULE. Required Access Level: ModifyContacts
     * @param segmentPayload 
     */
    segmentsPost(segmentPayload: SegmentPayload, extraHttpRequestParams?: any): Observable<Segment>;

}
