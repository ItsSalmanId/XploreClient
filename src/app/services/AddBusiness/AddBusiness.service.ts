import { Injectable } from '@angular/core';
import { AccountUtility } from '../../utilities/account-utility';
import { SurveyAutomation, SurveyLink, UserAccount } from "../../models/login/login.model";
import { BusinessDetail } from "../../models/AddBusiness/AddBusiness.model";
//import { PatientSurveyModel } from "../../models/patient-survey/patient-survey-model";

@Injectable({
  providedIn: 'root'
})
export class AddBusinessService {

  constructor(private accountUtility: AccountUtility) { }

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

  addUpdateBusiness(data: BusinessDetail) {
    return this.accountUtility.getUnauthorizePostCall('SurveyAutomation/AddUpdateBusinessDetails', data);
  }

  getBusinessDetails(data: BusinessDetail) {
    return this.accountUtility.getUnauthorizePostCall('SurveyAutomation/GetBusiness', data);
  }
  getSelectedBusiness(data: BusinessDetail) {
    return this.accountUtility.getUnauthorizePostCall('SurveyAutomation/GetSelectedBusiness', data);
  }


  // deleteBusinessDetails(data: BusinessDetail) {
  //   return this.accountUtility.getUnauthorizePostCall('SurveyAutomation/GetBusiness', data);
  // }

  deleteBusinessDetails(businessId: number): any {
    return this.accountUtility.getUnauthorizeGetCall(`SurveyAutomation/DeleteBusinessDetails?businessId=${businessId}`);
  }
//   updatePatientSurvey(data: PatientSurveyModel) {
//     return this.accountUtility.getUnauthorizePostCall('SurveyAutomation/UpdatePatientSurvey', data);
//   }
}
