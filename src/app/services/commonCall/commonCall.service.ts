import { Injectable } from '@angular/core';
import { AccountUtility } from '../../utilities/account-utility';
import { SurveyAutomation, SurveyLink, UserAccount, UserProfileToken } from "../../models/login/login.model";
//import { PatientSurveyModel } from "../../models/patient-survey/patient-survey-model";

@Injectable({
  providedIn: 'root'
})
export class CommonCallService {

  constructor(private accountUtility: AccountUtility) { 
    
  }

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

