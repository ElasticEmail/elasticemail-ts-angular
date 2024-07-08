/**
 * Elastic Email REST API
 * This API is based on the REST API architecture, allowing the user to easily manage their data with this resource-based approach.    Every API call is established on which specific request type (GET, POST, PUT, DELETE) will be used.    The API has a limit of 20 concurrent connections and a hard timeout of 600 seconds per request.    To start using this API, you will need your Access Token (available <a target=\"_blank\" href=\"https://app.elasticemail.com/marketing/settings/new/manage-api\">here</a>). Remember to keep it safe. Required access levels are listed in the given request’s description.    Downloadable library clients can be found in our Github repository <a target=\"_blank\" href=\"https://github.com/ElasticEmail?tab=repositories&q=%22rest+api%22+in%3Areadme\">here</a>
 *
 * The version of the OpenAPI document: 4.0.0
 * Contact: support@elasticemail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { EmailJobFailedStatus } from './emailJobFailedStatus';


export interface EmailJobStatus { 
    /**
     * ID number of your attachment
     */
    ID?: string;
    /**
     * Name of status: submitted, complete, in_progress
     */
    Status?: string;
    RecipientsCount?: number;
    Failed?: Array<EmailJobFailedStatus>;
    /**
     * Total emails failed.
     */
    FailedCount?: number;
    Sent?: Array<string>;
    /**
     * Total emails sent.
     */
    SentCount?: number;
    /**
     * Number of delivered messages
     */
    Delivered?: Array<string>;
    DeliveredCount?: number;
    Pending?: Array<string>;
    PendingCount?: number;
    /**
     * Number of opened messages
     */
    Opened?: Array<string>;
    /**
     * Total emails opened.
     */
    OpenedCount?: number;
    /**
     * Number of clicked messages
     */
    Clicked?: Array<string>;
    /**
     * Total emails clicked
     */
    ClickedCount?: number;
    /**
     * Number of unsubscribed messages
     */
    Unsubscribed?: Array<string>;
    /**
     * Total emails unsubscribed
     */
    UnsubscribedCount?: number;
    AbuseReports?: Array<string>;
    AbuseReportsCount?: number;
    /**
     * List of all MessageIDs for this job.
     */
    MessageIDs?: Array<string>;
}
