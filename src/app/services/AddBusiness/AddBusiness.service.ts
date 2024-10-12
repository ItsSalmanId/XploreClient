import { Injectable } from '@angular/core';
import { AccountUtility } from '../../utilities/account-utility';
import { SurveyAutomation, SurveyLink, UserAccount } from "../../models/login/login.model";
import { BusinessDetail, BusinessFilesDetailList, BusinessBlogDetail, BusinessRating, ReelsDetails, 
  ReelsCommentsDetails, UserFollowDetails, ReelSaved } from "../../models/AddBusiness/AddBusiness.model";
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

  getBusinessByCategory(data: BusinessDetail) {
    return this.accountUtility.getUnauthorizePostCall('SurveyAutomation/GetBusinessByCategory', data);
  }
  
  getSelectedBusiness(data: BusinessDetail) {
    return this.accountUtility.getUnauthorizePostCall('SurveyAutomation/GetSelectedBusiness', data);
  }

  deleteSelectedImage(data: BusinessFilesDetailList[]) {
    return this.accountUtility.getUnauthorizePostCall('SurveyAutomation/DeleteSelectedImage', data);
  }

  // deleteBusinessDetails(data: BusinessDetail) {
  //   return this.accountUtility.getUnauthorizePostCall('SurveyAutomation/GetBusiness', data);
  // }

  deleteBusinessDetails(businessId: number): any {
    return this.accountUtility.getUnauthorizeGetCall(`SurveyAutomation/DeleteBusinessDetails?businessId=${businessId}`);
  }

  addUpdateBlogBusiness(data: BusinessBlogDetail) {
    return this.accountUtility.getUnauthorizePostCall('SurveyAutomation/AddUpdateBlogBusiness', data);
  }
  getUserDetails(data: UserAccount[]) {
    return this.accountUtility.getUnauthorizePostCall('SurveyAutomation/GetUserDetails', data);
  }

  deleteUser(data: UserAccount) {
    return this.accountUtility.getUnauthorizePostCall('SurveyAutomation/DeleteUser', data);
  }
  editUser(data: UserAccount) {
    return this.accountUtility.getUnauthorizePostCall('SurveyAutomation/EditUser', data);
  }

  getBlogsDetails(data: BusinessBlogDetail) {
    return this.accountUtility.getUnauthorizePostCall('SurveyAutomation/GetBlogsDetails', data);
  }
  submitRating(data: BusinessRating) {
    return this.accountUtility.getUnauthorizePostCall('SurveyAutomation/SubmitRating', data);
  }
  getBusinessRating(data: BusinessRating) {
    return this.accountUtility.getUnauthorizePostCall('SurveyAutomation/GetBusinessRating', data);
  }

  //reels
  addUpdateReels(data: ReelsDetails) {
    return this.accountUtility.getUnauthorizePostCall('SurveyAutomation/AddUpdateReels', data);
  }

  getReelsDetails(data: ReelsDetails) {
    return this.accountUtility.getUnauthorizePostCall('SurveyAutomation/GetReelsDetails', data);
  }
  postComment(data: ReelsCommentsDetails) {
    return this.accountUtility.getUnauthorizePostCall('SurveyAutomation/PostComment', data);
  }
  getCommentsByReel(data: ReelsCommentsDetails) {
    return this.accountUtility.getUnauthorizePostCall('SurveyAutomation/GetCommentsByReel', data);
  }

  addUpdateFollower(data: UserFollowDetails) {
    return this.accountUtility.getUnauthorizePostCall('SurveyAutomation/AddUpdateFollower', data);
  }

  getUserReels(data: UserAccount) {
    return this.accountUtility.getUnauthorizePostCall('SurveyAutomation/GetUserReels', data);
  }
  getReelsUserProfile(data: UserAccount) {
    return this.accountUtility.getUnauthorizePostCall('SurveyAutomation/GetReelsUserProfile', data);
  }
  getLikeByReel(data: ReelsDetails) {
    return this.accountUtility.getUnauthorizePostCall('SurveyAutomation/GetLikeByReel', data);
  }
  savedPost(data: ReelSaved) {
    return this.accountUtility.getUnauthorizePostCall('SurveyAutomation/SavedPost', data);
  }
  addUpdateReelsStatus(data: ReelsDetails) {
    return this.accountUtility.getUnauthorizePostCall('SurveyAutomation/AddUpdateReelsStatus', data);
  }
  getReelsStatus(data: ReelsDetails) {
    return this.accountUtility.getUnauthorizePostCall('SurveyAutomation/GetReelsStatus', data);
  }
  addBusinessReviews(data: BusinessDetail) {
    return this.accountUtility.getUnauthorizePostCall('SurveyAutomation/AddBusinessReviews', data);
  }


}
