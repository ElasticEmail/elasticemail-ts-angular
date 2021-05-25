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
import { VerificationStatus } from './verificationStatus';
import { FileUploadResult } from './fileUploadResult';


/**
 * Simple verification file result info
 */
export interface VerificationFileResult { 
    /**
     * Identifier of this verification result
     */
    VerificationID?: string;
    /**
     * Origin file name
     */
    Filename?: string;
    /**
     * In what state does this verification result currently is
     */
    VerificationStatus?: VerificationStatus;
    /**
     * How many emails were detected in the file for verification
     */
    FileUploadResult?: FileUploadResult;
    /**
     * Date of creation in YYYY-MM-DDThh:ii:ss format
     */
    DateAdded?: string;
    /**
     * Origin file extension
     */
    Source?: string;
}

