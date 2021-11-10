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

import { Template } from '../model/models';
import { TemplatePayload } from '../model/models';
import { TemplateScope } from '../model/models';
import { TemplateType } from '../model/models';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';
import {
    TemplatesServiceInterface
} from './templates.serviceInterface';



@Injectable({
  providedIn: 'root'
})
export class TemplatesService implements TemplatesServiceInterface {

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
     * Delete Template
     * Delete template with the specified name. Required Access Level: ModifyTemplates
     * @param name Name of template.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public templatesByNameDelete(name: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined, context?: HttpContext}): Observable<any>;
    public templatesByNameDelete(name: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined, context?: HttpContext}): Observable<HttpResponse<any>>;
    public templatesByNameDelete(name: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined, context?: HttpContext}): Observable<HttpEvent<any>>;
    public templatesByNameDelete(name: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: undefined, context?: HttpContext}): Observable<any> {
        if (name === null || name === undefined) {
            throw new Error('Required parameter name was null or undefined when calling templatesByNameDelete.');
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

        return this.httpClient.delete<any>(`${this.configuration.basePath}/templates/${encodeURIComponent(String(name))}`,
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
     * Load Template
     * Load detailed information of the specified template. Required Access Level: ViewTemplates
     * @param name Name of template.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public templatesByNameGet(name: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<Template>;
    public templatesByNameGet(name: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<Template>>;
    public templatesByNameGet(name: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<Template>>;
    public templatesByNameGet(name: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (name === null || name === undefined) {
            throw new Error('Required parameter name was null or undefined when calling templatesByNameGet.');
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

        return this.httpClient.get<Template>(`${this.configuration.basePath}/templates/${encodeURIComponent(String(name))}`,
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
     * Update Template
     * Update existing template, overwriting existing data. Required Access Level: ModifyTemplates
     * @param name Name of template.
     * @param templatePayload 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public templatesByNamePut(name: string, templatePayload: TemplatePayload, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<Template>;
    public templatesByNamePut(name: string, templatePayload: TemplatePayload, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<Template>>;
    public templatesByNamePut(name: string, templatePayload: TemplatePayload, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<Template>>;
    public templatesByNamePut(name: string, templatePayload: TemplatePayload, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (name === null || name === undefined) {
            throw new Error('Required parameter name was null or undefined when calling templatesByNamePut.');
        }
        if (templatePayload === null || templatePayload === undefined) {
            throw new Error('Required parameter templatePayload was null or undefined when calling templatesByNamePut.');
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

        return this.httpClient.put<Template>(`${this.configuration.basePath}/templates/${encodeURIComponent(String(name))}`,
            templatePayload,
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
     * Load Templates
     * Returns a list of templates for the specified type. Required Access Level: ViewTemplates
     * @param scopeType Return templates with specified scope only
     * @param templateTypes Return templates with specified type only
     * @param limit Maximum number of returned items.
     * @param offset How many items should be returned ahead.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public templatesGet(scopeType: Array<TemplateScope>, templateTypes?: Array<TemplateType>, limit?: number, offset?: number, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<Array<Template>>;
    public templatesGet(scopeType: Array<TemplateScope>, templateTypes?: Array<TemplateType>, limit?: number, offset?: number, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<Array<Template>>>;
    public templatesGet(scopeType: Array<TemplateScope>, templateTypes?: Array<TemplateType>, limit?: number, offset?: number, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<Array<Template>>>;
    public templatesGet(scopeType: Array<TemplateScope>, templateTypes?: Array<TemplateType>, limit?: number, offset?: number, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (scopeType === null || scopeType === undefined) {
            throw new Error('Required parameter scopeType was null or undefined when calling templatesGet.');
        }

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (scopeType) {
            scopeType.forEach((element) => {
                localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
                  <any>element, 'scopeType');
            })
        }
        if (templateTypes) {
            templateTypes.forEach((element) => {
                localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
                  <any>element, 'templateTypes');
            })
        }
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

        return this.httpClient.get<Array<Template>>(`${this.configuration.basePath}/templates`,
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
     * Add Template
     * Add a new Template. Required Access Level: ModifyTemplates
     * @param templatePayload 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public templatesPost(templatePayload: TemplatePayload, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<Template>;
    public templatesPost(templatePayload: TemplatePayload, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<Template>>;
    public templatesPost(templatePayload: TemplatePayload, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<Template>>;
    public templatesPost(templatePayload: TemplatePayload, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (templatePayload === null || templatePayload === undefined) {
            throw new Error('Required parameter templatePayload was null or undefined when calling templatesPost.');
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

        return this.httpClient.post<Template>(`${this.configuration.basePath}/templates`,
            templatePayload,
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
