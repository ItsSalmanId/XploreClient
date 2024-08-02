import { ProfileClass } from '../../services/Global/global-setting.service';

export class OtpModel {
    constructor() {

    }
    public userName: string;
    public applicationName: string;
    public deviceInfo: string = '';
    public OtpCode: string = '';
    public OtpCaptcha:boolean;
    public ErrorMessage:string='';
    public loginCount:number;
    public NewToken:string = '';
    public Profile: ProfileClass;
    public token_type: string;
    public ExpiresOn: Date;
    public IssuedOn: Date;
    public expires: Date;
    public isLogOut: boolean;
    public otpkey:string='';
}

export class LoginViewModelMfa {
    public username: string;
    public password: string;
    public grant_type = 'password';
    public encodedResponse: string = '';
    public isTalkRehab: boolean;
    public utcDateTime:string;
    public isTimeCompleted:boolean;
}


