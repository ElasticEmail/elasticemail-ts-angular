/**
 * Elastic Email REST API
 * This API is based on the REST API architecture, allowing the user to easily manage their data with this resource-based approach.    Every API call is established on which specific request type (GET, POST, PUT, DELETE) will be used.    The API has a limit of 20 concurrent connections and a hard timeout of 600 seconds per request.    To start using this API, you will need your Access Token (available <a target=\"_blank\" href=\"https://elasticemail.com/account#/settings/new/manage-api\">here</a>). Remember to keep it safe. Required access levels are listed in the given request’s description.    Downloadable library clients can be found in our Github repository <a target=\"_blank\" href=\"https://github.com/ElasticEmail?tab=repositories&q=%22rest+api%22+in%3Areadme\">here</a>
 *
 * The version of the OpenAPI document: 4.0.0
 * Contact: support@elasticemail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export type ContactHistEventType = 'Opened' | 'Clicked' | 'Bounced' | 'Unsubscribed' | 'Complained' | 'Activated' | 'TransactionalUnsubscribed' | 'ManualStatusChange' | 'ManualConsentTrackingChange' | 'ActivationSent' | 'JourneyStarted' | 'JourneyStepProcessed' | 'JourneyFinished' | 'Deleted';

export const ContactHistEventType = {
    Opened: 'Opened' as ContactHistEventType,
    Clicked: 'Clicked' as ContactHistEventType,
    Bounced: 'Bounced' as ContactHistEventType,
    Unsubscribed: 'Unsubscribed' as ContactHistEventType,
    Complained: 'Complained' as ContactHistEventType,
    Activated: 'Activated' as ContactHistEventType,
    TransactionalUnsubscribed: 'TransactionalUnsubscribed' as ContactHistEventType,
    ManualStatusChange: 'ManualStatusChange' as ContactHistEventType,
    ManualConsentTrackingChange: 'ManualConsentTrackingChange' as ContactHistEventType,
    ActivationSent: 'ActivationSent' as ContactHistEventType,
    JourneyStarted: 'JourneyStarted' as ContactHistEventType,
    JourneyStepProcessed: 'JourneyStepProcessed' as ContactHistEventType,
    JourneyFinished: 'JourneyFinished' as ContactHistEventType,
    Deleted: 'Deleted' as ContactHistEventType
};
