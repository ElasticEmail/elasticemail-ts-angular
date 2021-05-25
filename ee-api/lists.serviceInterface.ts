/**
 * Elastic Email REST API
 * This API is based on the REST API architecture, allowing the user to easily manage their data with this resource-based approach.    Every API call is established on which specific request type (GET, POST, PUT, DELETE) will be used.    To start using this API, you will need your Access Token (available <a target=\"_blank\" href=\"https://elasticemail.com/account#/settings/new/manage-api\">here</a>). Remember to keep it safe. Required access levels are listed in the given request’s description.    This is the documentation for REST API. If you’d like to read our legacy documentation regarding Web API v2 click <a target=\"_blank\" href=\"https://api.elasticemail.com/public/help\">here</a>.    Downloadable library clients can be found in our Github repository <a target=\"_blank\" href=\"https://github.com/ElasticEmail?tab=repositories&q=%22rest+api%22+in%3Areadme\">here</a>
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

import { ContactsList } from '../model/models';
import { EmailsPayload } from '../model/models';
import { ListPayload } from '../model/models';
import { ListUpdatePayload } from '../model/models';


import { Configuration }                                     from '../configuration';



export interface ListsServiceInterface {
    defaultHeaders: HttpHeaders;
    configuration: Configuration;

    /**
     * Add Contacts to List
     * Add existing Contacts to specified list. Required Access Level: ModifyContacts
     * @param name Name of your list.
     * @param emailsPayload Provide either rule or a list of emails, not both.
     */
    listsByNameContactsPost(name: string, emailsPayload: EmailsPayload, extraHttpRequestParams?: any): Observable<ContactsList>;

    /**
     * Remove Contacts from List
     * Remove specified Contacts from your list. Required Access Level: ModifyContacts
     * @param name Name of your list.
     * @param emailsPayload Provide either rule or a list of emails, not both.
     */
    listsByNameContactsRemovePost(name: string, emailsPayload: EmailsPayload, extraHttpRequestParams?: any): Observable<{}>;

    /**
     * Delete List
     * Deletes List and removes all the Contacts from it (does not delete Contacts). Required Access Level: ModifyContacts
     * @param name Name of your list.
     */
    listsByNameDelete(name: string, extraHttpRequestParams?: any): Observable<{}>;

    /**
     * Load List
     * Returns detailed information about specified list. Required Access Level: ViewContacts
     * @param name Name of your list.
     */
    listsByNameGet(name: string, extraHttpRequestParams?: any): Observable<ContactsList>;

    /**
     * Update List
     * Update existing list. Required Access Level: ModifyContacts
     * @param name Name of your list.
     * @param listUpdatePayload 
     */
    listsByNamePut(name: string, listUpdatePayload: ListUpdatePayload, extraHttpRequestParams?: any): Observable<ContactsList>;

    /**
     * Load Lists
     * Returns all your existing lists. Required Access Level: ViewContacts
     * @param limit Maximum number of returned items.
     * @param offset How many items should be returned ahead.
     */
    listsGet(limit?: number, offset?: number, extraHttpRequestParams?: any): Observable<Array<ContactsList>>;

    /**
     * Add List
     * Add a new list. Required Access Level: ModifyContacts
     * @param listPayload 
     */
    listsPost(listPayload: ListPayload, extraHttpRequestParams?: any): Observable<ContactsList>;

}
