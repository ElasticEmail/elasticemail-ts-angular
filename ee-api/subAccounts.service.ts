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
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent, HttpParameterCodec, HttpContext 
        }       from '@angular/common/http';
import { CustomHttpParameterCodec }                          from '../encoder';
import { Observable }                                        from 'rxjs';

import { SubAccountInfo } from '../model/models';
import { SubaccountEmailCreditsPayload } from '../model/models';
import { SubaccountEmailSettings } from '../model/models';
import { SubaccountPayload } from '../model/models';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';
import {
    SubAccountsServiceInterface
} from './subAccounts.serviceInterface';



@Injectable({
  providedIn: 'root'
})
export class SubAccountsService implements SubAccountsServiceInterface {

    protected basePath = 'https://api.elasticemail.com/v4';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public encoder: HttpParameterCodec;

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }


    private addToHttpParams(httpParams: HttpParams, value: any, key?: string): HttpParams {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        } else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    }

    private addToHttpParamsRecursive(httpParams: HttpParams, value?: any, key?: string): HttpParams {
        if (value == null) {
            return httpParams;
        }

        if (typeof value === "object") {
            if (Array.isArray(value)) {
                (value as any[]).forEach( elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
            } else if (value instanceof Date) {
                if (key != null) {
                    httpParams = httpParams.append(key,
                        (value as Date).toISOString().substr(0, 10));
                } else {
                   throw Error("key may not be null if value is Date");
                }
            } else {
                Object.keys(value).forEach( k => httpParams = this.addToHttpParamsRecursive(
                    httpParams, value[k], key != null ? `${key}.${k}` : k));
            }
        } else if (key != null) {
            httpParams = httpParams.append(key, value);
        } else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    }

    /**
     * Add, Subtract Email Credits
     * Update email credits of a subaccount by the given amount. Required Access Level: ModifySubAccounts
     * @param email Email address of Sub-Account
     * @param subaccountEmailCreditsPayload Amount of email credits to add or subtract from the current SubAccount email credits pool (positive or negative value)
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public subaccountsByEmailCreditsPatch(email: string, subaccountEmailCreditsPayload: SubaccountEmailCreditsPayload, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined, context?: HttpContext}): Observable<any>;
    public subaccountsByEmailCreditsPatch(email: string, subaccountEmailCreditsPayload: SubaccountEmailCreditsPayload, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined, context?: HttpContext}): Observable<HttpResponse<any>>;
    public subaccountsByEmailCreditsPatch(email: string, subaccountEmailCreditsPayload: SubaccountEmailCreditsPayload, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined, context?: HttpContext}): Observable<HttpEvent<any>>;
    public subaccountsByEmailCreditsPatch(email: string, subaccountEmailCreditsPayload: SubaccountEmailCreditsPayload, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: undefined, context?: HttpContext}): Observable<any> {
        if (email === null || email === undefined) {
            throw new Error('Required parameter email was null or undefined when calling subaccountsByEmailCreditsPatch.');
        }
        if (subaccountEmailCreditsPayload === null || subaccountEmailCreditsPayload === undefined) {
            throw new Error('Required parameter subaccountEmailCreditsPayload was null or undefined when calling subaccountsByEmailCreditsPatch.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (apikey) required
        localVarCredential = this.configuration.lookupCredential('apikey');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('X-ElasticEmail-ApiKey', localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' = 'json';
        if(localVarHttpHeaderAcceptSelected && localVarHttpHeaderAcceptSelected.startsWith('text')) {
            responseType_ = 'text';
        }

        return this.httpClient.patch<any>(`${this.configuration.basePath}/subaccounts/${encodeURIComponent(String(email))}/credits`,
            subaccountEmailCreditsPayload,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Delete SubAccount
     * Deletes specified SubAccount. An email will be sent to confirm this change. Required Access Level: ModifySubAccounts
     * @param email Email address of Sub-Account
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public subaccountsByEmailDelete(email: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined, context?: HttpContext}): Observable<any>;
    public subaccountsByEmailDelete(email: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined, context?: HttpContext}): Observable<HttpResponse<any>>;
    public subaccountsByEmailDelete(email: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined, context?: HttpContext}): Observable<HttpEvent<any>>;
    public subaccountsByEmailDelete(email: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: undefined, context?: HttpContext}): Observable<any> {
        if (email === null || email === undefined) {
            throw new Error('Required parameter email was null or undefined when calling subaccountsByEmailDelete.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (apikey) required
        localVarCredential = this.configuration.lookupCredential('apikey');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('X-ElasticEmail-ApiKey', localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' = 'json';
        if(localVarHttpHeaderAcceptSelected && localVarHttpHeaderAcceptSelected.startsWith('text')) {
            responseType_ = 'text';
        }

        return this.httpClient.delete<any>(`${this.configuration.basePath}/subaccounts/${encodeURIComponent(String(email))}`,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Load SubAccount
     * Returns details for the specified SubAccount. Required Access Level: ViewSubAccounts
     * @param email Email address of Sub-Account
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public subaccountsByEmailGet(email: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<SubAccountInfo>;
    public subaccountsByEmailGet(email: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<SubAccountInfo>>;
    public subaccountsByEmailGet(email: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<SubAccountInfo>>;
    public subaccountsByEmailGet(email: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (email === null || email === undefined) {
            throw new Error('Required parameter email was null or undefined when calling subaccountsByEmailGet.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (apikey) required
        localVarCredential = this.configuration.lookupCredential('apikey');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('X-ElasticEmail-ApiKey', localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' = 'json';
        if(localVarHttpHeaderAcceptSelected && localVarHttpHeaderAcceptSelected.startsWith('text')) {
            responseType_ = 'text';
        }

        return this.httpClient.get<SubAccountInfo>(`${this.configuration.basePath}/subaccounts/${encodeURIComponent(String(email))}`,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update SubAccount Email Settings
     * Update SubAccount email settings. Required Access Level: ModifySubAccounts
     * @param email 
     * @param subaccountEmailSettings Updated Email Settings
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public subaccountsByEmailSettingsEmailPut(email: string, subaccountEmailSettings: SubaccountEmailSettings, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<SubaccountEmailSettings>;
    public subaccountsByEmailSettingsEmailPut(email: string, subaccountEmailSettings: SubaccountEmailSettings, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<SubaccountEmailSettings>>;
    public subaccountsByEmailSettingsEmailPut(email: string, subaccountEmailSettings: SubaccountEmailSettings, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<SubaccountEmailSettings>>;
    public subaccountsByEmailSettingsEmailPut(email: string, subaccountEmailSettings: SubaccountEmailSettings, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (email === null || email === undefined) {
            throw new Error('Required parameter email was null or undefined when calling subaccountsByEmailSettingsEmailPut.');
        }
        if (subaccountEmailSettings === null || subaccountEmailSettings === undefined) {
            throw new Error('Required parameter subaccountEmailSettings was null or undefined when calling subaccountsByEmailSettingsEmailPut.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (apikey) required
        localVarCredential = this.configuration.lookupCredential('apikey');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('X-ElasticEmail-ApiKey', localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' = 'json';
        if(localVarHttpHeaderAcceptSelected && localVarHttpHeaderAcceptSelected.startsWith('text')) {
            responseType_ = 'text';
        }

        return this.httpClient.put<SubaccountEmailSettings>(`${this.configuration.basePath}/subaccounts/${encodeURIComponent(String(email))}/settings/email`,
            subaccountEmailSettings,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Load SubAccounts
     * Returns a list of all your SubAccounts. Required Access Level: ViewSubAccounts
     * @param limit Maximum number of returned items.
     * @param offset How many items should be returned ahead.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public subaccountsGet(limit?: number, offset?: number, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<Array<SubAccountInfo>>;
    public subaccountsGet(limit?: number, offset?: number, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<Array<SubAccountInfo>>>;
    public subaccountsGet(limit?: number, offset?: number, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<Array<SubAccountInfo>>>;
    public subaccountsGet(limit?: number, offset?: number, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (limit !== undefined && limit !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>limit, 'limit');
        }
        if (offset !== undefined && offset !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>offset, 'offset');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (apikey) required
        localVarCredential = this.configuration.lookupCredential('apikey');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('X-ElasticEmail-ApiKey', localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' = 'json';
        if(localVarHttpHeaderAcceptSelected && localVarHttpHeaderAcceptSelected.startsWith('text')) {
            responseType_ = 'text';
        }

        return this.httpClient.get<Array<SubAccountInfo>>(`${this.configuration.basePath}/subaccounts`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Add SubAccount
     * Add a new SubAccount to your Account. To receive an access token for this SubAccount, make a POST security/apikeys request using the \&#39;subaccount\&#39; parameter. Required Access Level: ModifySubAccounts
     * @param subaccountPayload 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public subaccountsPost(subaccountPayload: SubaccountPayload, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<SubAccountInfo>;
    public subaccountsPost(subaccountPayload: SubaccountPayload, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<SubAccountInfo>>;
    public subaccountsPost(subaccountPayload: SubaccountPayload, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<SubAccountInfo>>;
    public subaccountsPost(subaccountPayload: SubaccountPayload, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (subaccountPayload === null || subaccountPayload === undefined) {
            throw new Error('Required parameter subaccountPayload was null or undefined when calling subaccountsPost.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (apikey) required
        localVarCredential = this.configuration.lookupCredential('apikey');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('X-ElasticEmail-ApiKey', localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' = 'json';
        if(localVarHttpHeaderAcceptSelected && localVarHttpHeaderAcceptSelected.startsWith('text')) {
            responseType_ = 'text';
        }

        return this.httpClient.post<SubAccountInfo>(`${this.configuration.basePath}/subaccounts`,
            subaccountPayload,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
