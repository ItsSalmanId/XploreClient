export class SurveyAutomation {
    PATIENT_ACCOUNT: Number;
    PATIENT_ACCOUNT_STR: string;
    REGION: string;
    PROVIDER: string;
    DATE_OF_SURVEY: Date;
    PT_OT_SLP: string;
    SERVICE_OR_PAYMENT_DESCRIPTION: string;
    IS_IMPROVED_SETISFACTION: boolean;
    SURVEY_ID: number;
}

export class SurveyQuestions {
    SURVEY_QUESTIONS: string;
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

