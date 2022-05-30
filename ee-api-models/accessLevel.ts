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


export type AccessLevel = 'None' | 'ViewAccount' | 'ViewContacts' | 'ViewForms' | 'ViewTemplates' | 'ViewCampaigns' | 'ViewChannels' | 'ViewAutomations' | 'ViewSurveys' | 'ViewSettings' | 'ViewBilling' | 'ViewSubAccounts' | 'ViewUsers' | 'ViewFiles' | 'ViewReports' | 'ModifyAccount' | 'ModifyContacts' | 'ModifyForms' | 'ModifyTemplates' | 'ModifyCampaigns' | 'ModifyChannels' | 'ModifyAutomations' | 'ModifySurveys' | 'ModifyFiles' | 'Export' | 'SendSmtp' | 'SendSMS' | 'ModifySettings' | 'ModifyBilling' | 'ModifyProfile' | 'ModifySubAccounts' | 'ModifyUsers' | 'Security' | 'ModifyLanguage' | 'ViewSupport' | 'SendHttp' | 'Modify2FA' | 'ModifySupport' | 'ViewCustomFields' | 'ModifyCustomFields' | 'ModifyWebNotifications' | 'ExtendedLogs' | 'VerifyEmails' | 'ViewEmailVerifications' | 'ViewMarketing' | 'ViewEmailApi' | 'ViewInbound' | 'ModifyLandingPages' | 'ViewLandingPages' | 'ModifySuppressions' | 'ViewSuppressions';

export const AccessLevel = {
    None: 'None' as AccessLevel,
    ViewAccount: 'ViewAccount' as AccessLevel,
    ViewContacts: 'ViewContacts' as AccessLevel,
    ViewForms: 'ViewForms' as AccessLevel,
    ViewTemplates: 'ViewTemplates' as AccessLevel,
    ViewCampaigns: 'ViewCampaigns' as AccessLevel,
    ViewChannels: 'ViewChannels' as AccessLevel,
    ViewAutomations: 'ViewAutomations' as AccessLevel,
    ViewSurveys: 'ViewSurveys' as AccessLevel,
    ViewSettings: 'ViewSettings' as AccessLevel,
    ViewBilling: 'ViewBilling' as AccessLevel,
    ViewSubAccounts: 'ViewSubAccounts' as AccessLevel,
    ViewUsers: 'ViewUsers' as AccessLevel,
    ViewFiles: 'ViewFiles' as AccessLevel,
    ViewReports: 'ViewReports' as AccessLevel,
    ModifyAccount: 'ModifyAccount' as AccessLevel,
    ModifyContacts: 'ModifyContacts' as AccessLevel,
    ModifyForms: 'ModifyForms' as AccessLevel,
    ModifyTemplates: 'ModifyTemplates' as AccessLevel,
    ModifyCampaigns: 'ModifyCampaigns' as AccessLevel,
    ModifyChannels: 'ModifyChannels' as AccessLevel,
    ModifyAutomations: 'ModifyAutomations' as AccessLevel,
    ModifySurveys: 'ModifySurveys' as AccessLevel,
    ModifyFiles: 'ModifyFiles' as AccessLevel,
    Export: 'Export' as AccessLevel,
    SendSmtp: 'SendSmtp' as AccessLevel,
    SendSms: 'SendSMS' as AccessLevel,
    ModifySettings: 'ModifySettings' as AccessLevel,
    ModifyBilling: 'ModifyBilling' as AccessLevel,
    ModifyProfile: 'ModifyProfile' as AccessLevel,
    ModifySubAccounts: 'ModifySubAccounts' as AccessLevel,
    ModifyUsers: 'ModifyUsers' as AccessLevel,
    Security: 'Security' as AccessLevel,
    ModifyLanguage: 'ModifyLanguage' as AccessLevel,
    ViewSupport: 'ViewSupport' as AccessLevel,
    SendHttp: 'SendHttp' as AccessLevel,
    Modify2Fa: 'Modify2FA' as AccessLevel,
    ModifySupport: 'ModifySupport' as AccessLevel,
    ViewCustomFields: 'ViewCustomFields' as AccessLevel,
    ModifyCustomFields: 'ModifyCustomFields' as AccessLevel,
    ModifyWebNotifications: 'ModifyWebNotifications' as AccessLevel,
    ExtendedLogs: 'ExtendedLogs' as AccessLevel,
    VerifyEmails: 'VerifyEmails' as AccessLevel,
    ViewEmailVerifications: 'ViewEmailVerifications' as AccessLevel,
    ViewMarketing: 'ViewMarketing' as AccessLevel,
    ViewEmailApi: 'ViewEmailApi' as AccessLevel,
    ViewInbound: 'ViewInbound' as AccessLevel,
    ModifyLandingPages: 'ModifyLandingPages' as AccessLevel,
    ViewLandingPages: 'ViewLandingPages' as AccessLevel,
    ModifySuppressions: 'ModifySuppressions' as AccessLevel,
    ViewSuppressions: 'ViewSuppressions' as AccessLevel
};

