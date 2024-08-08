export class BusinessDetail {
    BUSINESS_DETAIL_ID: number;
    PASSWORD: string;
    EMAIL_ADDRESS: string;
    BUSINESS_NAME: string;
    BUSINESS_ADDRESS: string;
    BUSINESS_CITY: string;
    BUSINESS_ZIP_CODE: string;
    BUSINESS_HOURS: string;
    BUSINESS_CATEGORY: string;
    BUSINESS_CATEGORY_TYPE: string;
    BUSINESS_PICTURE_ID: string;
    BUSINESS_IMPORTANT_NOTES: string;
    CREATED_BY: string = 'TEAM XPLORE';
    CREATED_DATE: Date;
    MODIFIED_BY: string = 'TEAM XPLORE';
    MODIFIED_DATE: Date;
    DELETED: boolean = false;
    uploadedFilesName: string[] = [];
}


export class BusinessFilesDetail {
    BUSINESS_FILES_DTEAIL_ID: number;
    BUSINESS_DETAIL_ID: number;
    FILE_PATH: string;
    FILE_PATH_1: string;
    CREATED_BY: string = 'TEAM XPLORE';
    CREATED_DATE: Date;
    MODIFIED_BY: string = 'TEAM XPLORE';
    MODIFIED_DATE: Date;
    DELETED: boolean = false;
}

export class SurveyLink {
    ENCRYPTED_PATIENT_ACCOUNT: string;
    SURVEY_METHOD: string;
    OPEN_SURVEY_METHOD: string;
}

export class NavigationAndToggle  {
    isShowQ1: boolean = true;
    isShowQ2: boolean = false;
    isShowQ3: boolean = false;
    isShowFeedback: boolean = false;
    isShowThanksToSurvay: boolean = false;
    q1YesToggle: boolean = false;
    q1NoToggle: boolean = false;
    q2YesToggle: boolean = false;
    q2NoToggle: boolean = false;
    q3YesToggle: boolean = false;
    q3NoToggle: boolean = false;
}

export class UserAccount {
    User_Name: string;
    EMAIL_ADDRESS: string;
    PASSWORD: string;
    CONFIRM_PASSWORD: string;
    UserNameEmail: string;
    LoginPassword: string;
}

