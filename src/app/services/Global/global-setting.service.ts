import { Injectable, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
//import { OrderApproval } from '../../models/request-for-order/request-for-order.model';
//import { PrintPreviewGenericModel } from '../../models/Signature-Required/signature-required.model';
//import { PrintSendSubmitOrderModel } from '../../models/shared/print-send-submit-order/print-send-submit-order.model';

let userprofile: ProfileClass;
let userRole: RoleAndRights[] = [];
let talkRehabuserModules: TalkrehabDisabledModules[] = [];

@Injectable()
export class GlobalSettingService implements OnInit {

    ngOnInit(): void {
        this.ia = +window.localStorage.getItem("ia");
    }

    private practiceCode: number;
    private userName: string;
    private mfausername: string;
    private pass:string;
    private TaskRptUserName = '';
    private IS_TRASH : boolean;
    private DATE_FROM: Date;
    private DATE_TO: Date;
    private DATE_FROMStr: string;
    private DATE_TOStr: string;
    private CallfromReport: boolean;
    private authenticationToken: string;
    private ia: number;
    currentUrl: any;
    UrlFromEmail: any;
    UrlVerifyOrder: any;
    //orderApproval : OrderApproval;
    private tokenExpireIn: Date;
    private tokenIssued: Date;
    private patientAccountInProgress: string;
    private UrlPatientSurvey: any;
    private patientsetSurveyId: any;
    private UrlCallrecordingPlay: any;
    private RecordingPath: any;

    public today = new Date();
    public dd = this.today.getDate();
    public mm = this.today.getMonth() + 1;
    public yy = this.today.getFullYear();
    public day: string = "";
    public mon: string = "";
    public CompleteDate: string = "";
    public isAuthorized: boolean;
    public istalkRehab: boolean;
    //public PrintPreviewGenericModel: PrintPreviewGenericModel;
    get getUserFullName(): string{
        return this.GetUserProfile.LastName + ", " + this.GetUserProfile.FirstName;
    }
    
    get setMainIem(): boolean {
        return this.CallfromReport;
    }
    set setMainIem(value: boolean) {
        this.CallfromReport = value;
    }
    set setTokenExpiresIn(value: Date) {
        this.tokenExpireIn = value;
    }
    get getTokenExpiresIn() {
        return this.tokenExpireIn;
    }
    set setTokenIssued(value: Date) {
        this.tokenIssued = value;
    }
    get getTokenIssued() {
        return this.tokenIssued;
    }
    get setDateFrom(): Date {
        return this.DATE_FROM;
    }
    set setDateFrom(value: Date) {
        this.DATE_FROM = value;
    }
    get setDateTo(): Date {
        return this.DATE_TO;
    }
    set setDateTo(value: Date) {
        this.DATE_TO = value;
    }
    get setDateToStr(): string {
        return this.DATE_FROMStr;
    }
    set setDateToStr(value: string) {
        this.DATE_FROMStr = value;
    }
    get setDateFromStr(): string {
        return this.DATE_TOStr;
    }
    set setDateFromStr(value: string) {
        this.DATE_TOStr = value;
    }
    get setReportUserName(): string {
        return this.TaskRptUserName; // 'this.practiceCode;
    }

    set setReportUserName(value: string) {
        this.TaskRptUserName = value;
    }
    get setIsTrash(): boolean {
        return this.IS_TRASH;
    }
    set setIsTrash(value: boolean) {
        this.IS_TRASH = value;
    }
    constructor() {
    }


    get getPracticeCode(): number {
        return this.practiceCode; // this.practiceCode;
    }

    set setPracticeCode(pracCode: string) {
        this.practiceCode = +pracCode; // this.practiceCode = pracCode;
    }

    AuthToken() {
        return this.getAuthToken;
    }

    set setPatientAccountInProgress(patientAccount: string) {
        this.patientAccountInProgress = patientAccount;
    }

    get getPatientAccountInProgress(): string {
        return this.patientAccountInProgress;
    }

    set setSurveyId(setSurveyId: string) {
        this.patientsetSurveyId = setSurveyId;
    }

    get getSurveyId(): string {
        return this.patientsetSurveyId;
    }
    set setUserRole(uRole: any) {
        userRole = uRole;
    }

    get GetUserRole(): RoleAndRights[] {
        return userRole;
  }
  set SetTalkrehbaUserModule(Module: any) {    
    talkRehabuserModules = Module;
  }
  get GettalkRehabDisabledModules(): TalkrehabDisabledModules[] {
    return talkRehabuserModules;
  }

    // get/set current Url
    set setCurrentUrl(url: string) {
        this.currentUrl = url;
    }

    get getCurrentUrl(): string {
        return this.currentUrl;
    }
    // get/set UrlFromEmail
    set setUrlFromEmail(url: string) {
        this.UrlFromEmail = url;
    }

    get getUrlFromEmail(): string {
        return this.UrlFromEmail;
    }
    // get/set UrlVerifyOrder
    set setUrlVerifyOrder(url: string) {
        this.UrlVerifyOrder = url;
    }

    get getUrlVerifyOrder(): string {
        return this.UrlVerifyOrder;
    }

//get/set fro patientSurvey
get getUrlPatientSurvey(): string
    {
        return this.UrlPatientSurvey ;
    }
    set setUrlPatientSurvey(url: string)
    {
        this.UrlPatientSurvey = url;
  }
  //get/set for RecordingPlay
  get getUrlRecordingPlay(): string {
    return this.UrlCallrecordingPlay;
  }
  set setUrlRecordingPlay(url: string) {
    this.UrlCallrecordingPlay = url;
  }

  //get/set for RecordingPath
  get getRecordingPath(): string {
    return this.RecordingPath;
  }
  set setRecordingPath(url: string) {
    this.RecordingPath = url;
  }
     // get/set orderApproval
    //  set setOrderApproval(orderApproval: OrderApproval) {
    //     this.orderApproval._approval = orderApproval._approval;
    //     this.orderApproval.comments = orderApproval.comments;
    // }

    // get getOrderApproval(): OrderApproval {
    //     return this.orderApproval;
    // }
    
    SearchRightList(rightName: string) {
        if (rightName !== '' && rightName != null) {
            rightName = rightName.trim().toLowerCase();
        }
        if (this.GetUserRole != null || this.GetUserRole !== undefined) {
            for (let i = 0; i < this.GetUserRole.length; i++) {
                if (this.GetUserRole[i].RIGHT_NAME.trim().toLowerCase() === rightName.toString()) {
                    return true;
                }
            }
            return false;
        } else {
            return false;
        }
  }
  SearchDisabledModules(moduleName: string) {
    if (moduleName !== '' && moduleName != null) {
      moduleName = moduleName.trim().toLowerCase();
    }
    if (this.GettalkRehabDisabledModules != null && this.GettalkRehabDisabledModules.length > 0) {
      for (let i = 0; i < this.GettalkRehabDisabledModules.length; i++) {
        if (this.GettalkRehabDisabledModules[i].ModuleName && this.GettalkRehabDisabledModules[i].ModuleName.trim().toLowerCase() === moduleName.toString()) {
          return false;
        }
      }
      return true;
    } else {
      return true;
    }
  }
    // get set Authentication Token
    set setAuthToken(token: any) {
        this.authenticationToken = token;
    }

    get getAuthToken(): string {
        return this.authenticationToken;
    }
    // get set UserName
    set setUserName(userName: string) {
        this.userName = userName;
    }

    get getUserName(): string {
        return this.userName;
    }
    set setPass(pass:string){
        this.pass = pass;
    }
    get getPass():string{
        return this.pass
    }
    set setUserNamemfa(mfausername:string){
        this.mfausername = mfausername;
    }
    get getUserNamemfa():string{
        return this.mfausername
    }
    
    // empty invalid attempt counts and getter/setter
    removeIA() {
        window.localStorage.removeItem('ia');
    }
    set setIA(ia: number) {
        window.localStorage.setItem('ia', ia !== null ? ia.toString() : '0');
    }
    get getIA(): any {
        return window.localStorage.getItem('ia');
    }
    // Redirect To
    redirectTo(url: string): void {
        window.location.replace(window.location.origin + url);
    }
    // getting HttpOptionHeaders
    get getHttpOptions(): any {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Headers': '*',
                'Authorization': `Bearer ${this.getAuthToken}`,
                'Accept': 'application/json'
            })
        };
    }

    public clearTokenAndProfile() {
        this.setAuthToken = null;
        this.setIA = null;
        this.setUserName = null;
        this.setProfile = null;
    }
    get GetCurentDate(): string {

        if (this.dd < 10) {
            this.day = '0' + this.dd;
        }
        else {
            this.day = this.dd.toString();
        }
        if (this.mm < 10) {
            this.mon = '0' + this.mm;
        }
        else {
            this.mon = this.mm.toString();;
        }
        this.CompleteDate = this.mon + '/' + this.day + '/' + this.yy;
        return this.CompleteDate;
    }
    set setProfile(profile: any) {
        userprofile = profile;
    }

    get GetUserProfile(): ProfileClass {
        return userprofile;
    }
//     public set setPrintpreview(preview: any) {
//         this.PrintPreviewGenericModel = new PrintPreviewGenericModel();
//         this.PrintPreviewGenericModel.PrintSendSubmitOrderModelObj = new PrintSendSubmitOrderModel();
//         this.PrintPreviewGenericModel = preview;
//     }

//     public get GetPrintpreview(): PrintPreviewGenericModel {
//         return this.PrintPreviewGenericModel;
// }
}


export class ProfileClass {
    userID: number;
    UserName: string;
    UserEmailAddress: string;
    PracticeCode: number;
    PracticeName: string;
    PRACTICE_CODE: string;
    PracticeAddress: string;
    PracticeAddressLine2: string;
    PracCity: string;
    PracState: string;
    PracZip: string;
    PracPhone: string;
    PracEmailAddress: string;
    UserType: string;
    FirstName: string;
    LastName: string;
    RoleId: number;
    IsAdmin: boolean;
    PRACTICE_ORGANIZATION_ID: number;
    Token: string;
    ROLE_NAME: string;
    PracticeDocumentDirectory: string;
    EXTENSION: string;
    IS_ACTIVE_EXTENSION: boolean;
    SENDER_TYPE: string;
    EMAIL: string;
    ApplicationUserRoles: RoleAndRights[];
    MFA: boolean;
    showMfaEanbleScreen: number;
}

export class RoleAndRights {
    ROLE_ID: number;
    ROLE_NAME: string;
    RIGHT_ID: number;
    RIGHTS_OF_ROLE_ID: number;
    RIGHT_NAME: string;
}

export class AuthViewModel {
    Profile: ProfileClass;
    access_token: string;
    token_type: string;
    expires_in: Date;
    issued: Date;
    expires: Date;
    error: string;
    error_description: string;
    mfa_modified_date:Date;
    
}
export class TalkrehabDisabledModules {
  TalkrehabModuleId: number;
  ModuleName: string;
  IsShow: boolean;
}

