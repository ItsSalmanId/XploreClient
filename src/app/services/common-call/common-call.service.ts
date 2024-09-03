import { Injectable } from '@angular/core';
import { AccountUtility } from '../../utilities/account-utility';
import { SurveyAutomation, SurveyLink, UserAccount, UserProfileToken } from "../../models/login/login.model";
//import { PatientSurveyModel } from "../../models/patient-survey/patient-survey-model";
import { CommonCallService } from '../../services/commonCall/commonCall.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonCallsService {
  userAccount: UserAccount;

  constructor(private accountUtility: AccountUtility, private _commonCallService: CommonCallService
    ,private router: Router
  ) 
  {
    this.userAccount = new UserAccount();
   }

  logout()
  {
    this.userAccount = new UserAccount();
      console.log("click on RegisterNow");
      //if (this.userAccount) {
          //this._spinner.show();
          this.userAccount.APPLICATION_USER_ACCOUNTS_ID = Number(localStorage.getItem("Temp"));
          this._commonCallService.logoutUser(this.userAccount).subscribe(
              response => {
                  this.userAccount = response;
                 // this._spinner.hide();
                 //this.ShowToast("Alert", response.Message, response.success);
                 //this.toastr.success(response.Message, 'Toastr fun!');
                 //this.ShowToast("Xplore", response.Message, response.Success);
                 if(!this.NullCheckFun(this.userAccount))
                 {
                  this.router.navigate(['/products-list']);
                  //this.ShowToast("Xplore", 'JWT Token Expired, Please login again!!', true);
                  //this.currentTab = 'tab1';
                 }
                 else
                 {
                  //this.ShowToast("Xplore", 'JWT Token verified', true);
                 }
              });
     // }
  }
  NullCheckFun(obj: any): boolean {
    if (obj != null && obj !== undefined && obj != 'NaN' && obj !== '') {
        return true;
    }
    return false;
}
// ShowToast(message: string, title: string, success: boolean) {
//     let timeOut: number = success ? 2000 : 4000;
//     //let toastOptions: ToastOptions = { title: title, msg: message, timeout: timeOut };
//     if (success)
//       this.toastr.success(title, message);
//     else {
//       this.toastr.error(title, message);
//     }
//   } 

  getPatientDetails(data: SurveyAutomation) {
    return this.accountUtility.getUnauthorizePostCall('SurveyAutomation/GetPatientDetails', data);
  }

  decryptionUrl(data: SurveyLink) {
    return this.accountUtility.getUnauthorizePostCall('SurveyAutomation/DecryptionUrl', data);
  }

  getSurveyQuestionDetails(data: SurveyLink) {
    return this.accountUtility.getUnauthorizePostCall('SurveyAutomation/GetSurveyQuestionDetails', data);
  }

  registerUser(data: UserAccount) {
    return this.accountUtility.getUnauthorizePostCall('SurveyAutomation/RegisterUser', data);
  }
  loginUser(data: UserAccount) {
    return this.accountUtility.getUnauthorizePostCall('SurveyAutomation/LoginUser', data);
  }

  logintest(data: UserAccount) {
    return this.accountUtility.getUnauthorizePostCall('SurveyAutomation/LoginUser', data);
  }
  validateUser(data: UserAccount) {
    return this.accountUtility.getUnauthorizePostCall('SurveyAutomation/ValidateUser', data);
  }

  userToken(data: UserProfileToken) {
    return this.accountUtility.getUnauthorizePostCall('SurveyAutomation/UserToken', data);
  }
  logoutUser(data: UserAccount) {
    return this.accountUtility.getUnauthorizePostCall('SurveyAutomation/LogoutUser', data);
  }
  
//   updatePatientSurvey(data: PatientSurveyModel) {
//     return this.accountUtility.getUnauthorizePostCall('SurveyAutomation/UpdatePatientSurvey', data);
//   }
}

