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
import { EncodingType } from './encodingType';


/**
 * E-mail configuration
 */
export interface Options { 
    /**
     * By how long should an e-mail be delayed (in minutes). Maximum is 35 days.
     */
    TimeOffset?: number | null;
    /**
     * Name of your custom IP Pool to be used in the sending process
     */
    PoolName?: string;
    /**
     * Name of selected channel.
     */
    ChannelName?: string;
    /**
     * 0 for None, 1 for Raw7Bit, 2 for Raw8Bit, 3 for QuotedPrintable, 4 for Base64 (Default), 5 for Uue note that you can also provide the text version such as \"Raw7Bit\" for value 1. NOTE: Base64 or QuotedPrintable is recommended if you are validating your domain(s) with DKIM.
     */
    Encoding?: EncodingType;
    /**
     * Should the opens be tracked? If no value has been provided, Account\'s default setting will be used.
     */
    TrackOpens?: boolean;
    /**
     * Should the clicks be tracked? If no value has been provided, Account\'s default setting will be used.
     */
    TrackClicks?: boolean;
}

