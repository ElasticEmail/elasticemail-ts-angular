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
import { BodyPart } from './bodyPart';
import { MessageAttachment } from './messageAttachment';
import { Utm } from './utm';


/**
 * Proper e-mail content
 */
export interface EmailContent { 
    /**
     * List of e-mail body parts, with user-provided MIME types (text/html, text/plain etc)
     */
    Body?: Array<BodyPart>;
    /**
     * A key-value collection of custom merge fields, shared between recipients. Should be used in e-mail body like so: {firstname}, {lastname} etc.
     */
    Merge?: { [key: string]: string; };
    /**
     * Attachments provided by sending binary data
     */
    Attachments?: Array<MessageAttachment>;
    /**
     * A key-value collection of custom e-mail headers.
     */
    Headers?: { [key: string]: string; };
    /**
     * Postback header.
     */
    Postback?: string;
    /**
     * E-mail with an optional name to be used as the envelope from address (e.g.: John Doe <email@domain.com>)
     */
    EnvelopeFrom?: string;
    /**
     * Your e-mail with an optional name (e.g.: John Doe <email@domain.com>)
     */
    From?: string;
    /**
     * To what address should the recipients reply to (e.g. John Doe <email@domain.com>)
     */
    ReplyTo?: string;
    /**
     * Default subject of email.
     */
    Subject?: string;
    /**
     * Name of template.
     */
    TemplateName?: string;
    /**
     * Names of previously uploaded files that should be sent as downloadable attachments
     */
    AttachFiles?: Array<string>;
    Utm?: Utm;
}

