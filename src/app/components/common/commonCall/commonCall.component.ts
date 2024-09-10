import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AddBusinessService } from '../../../services/AddBusiness/AddBusiness.service'
import { BusinessDetail, BusinessFilesDetailList, TimeSlots,  } from "../../../models/AddBusiness/AddBusiness.model";
import { Observable } from 'rxjs';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DropzoneConfig } from 'ngx-dropzone-wrapper';
import { GlobalSettingService } from '../../../services/Global/global-setting.service';
import { GenericUtility } from '../../../utilities/generic-utility';
//declare var $: any;
import Dropzone from 'dropzone';
import { OwlOptions } from 'ngx-owl-carousel-o';
import * as $ from 'jquery'; // Import jQuery
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SurveyAutomation, SurveyQuestions, SurveyLink, NavigationAndToggle, UserAccount, UserProfileToken } from "../../../models/login/login.model";
import { CommonCallService } from '../../../services/commonCall/commonCall.service'

@Component({
    selector: 'app-common-call',
    templateUrl: './commonCall.component.html',
    styleUrls: ['./commonCall.component.scss']
})
export class CommonCall implements OnChanges {
    config: DropzoneConfig;
    
    businessDetail: BusinessDetail; 
    selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  previews: string[] = [];
  imageInfos?: Observable<any>;

  //uploadedFilesName: string[];
    uploadedFilesName: string[] = [];
    uploadedFilesNameClient: string[] = [];
    disableTreatmentLocation: boolean;
    selectedImagesList: BusinessFilesDetailList[];
    selectedListStr: string;
    timeSlots: string[] = [];
    userProfileToken: UserProfileToken;
    userAccount: UserAccount

    constructor(private _commonCallService: CommonCallService, private _addBusinessService: AddBusinessService, public _globalSettingService: GlobalSettingService, private _genericUtilities: GenericUtility, private toastr: ToastrService
        ,private router: Router) { 
            this.businessDetail = new BusinessDetail();
            this.config = new DropzoneConfig();
            this.config.url = this._genericUtilities.getBaseIp()+'UploadFiles/UploadFilesAPI';
            //this.config.url = "http://localhost:4200";
            
               this.config.headers = { 'Authorization': `Bearer ${this._globalSettingService.getAuthToken}` };
               // this.config.acceptedFiles = '.pdf, .png, .jpg, .JPG, .jpeg, .tiff, .tif, .docx';//.pdf .png .jpg .JPG .jpeg .tiff .tif .docx
               this.config.acceptedFiles = '.pdf, .jpg, .jpeg, .png, .tif, .gif, .tiff, .bmp'; //, .docx, .txt
               this.config.maxFiles = 5;
               this.config.maxFilesize = 20;
               this.config.addRemoveLinks = true;
               this.config.dictCancelUploadConfirmation = "Are you sure you want to cancel upload?";
       
               this.uploadedFilesName = [];
               this.uploadedFilesNameClient = [];
               this.selectedImagesList = [];
               this.selectedImagesList = [];
               this.userProfileToken = new UserProfileToken();
               this.userAccount = new UserAccount();
        
    }

    ngOnInit(): void {
    }
    ngOnChanges(changes: SimpleChanges) {
        if (changes['value']) {
          
        }
      }

    NullCheckFun(obj: any): boolean {
        if (obj != null && obj !== undefined && obj != 'NaN' && obj !== '') {
            return true;
        }
        return false;
    }
    ShowToast(message: string, title: string, success: boolean) {
        let timeOut: number = success ? 2000 : 4000;
        //let toastOptions: ToastOptions = { title: title, msg: message, timeout: timeOut };
        if (success)
          this.toastr.success(title, message);
        else {
          this.toastr.error(title, message);
        }
      } 

    userToken()
    {
        console.log("click on RegisterNow");
        if (this.userProfileToken) {
            //this._spinner.show();
            this.userProfileToken.USER_ID = Number(localStorage.getItem("Temp"));
            this._commonCallService.userToken(this.userProfileToken).subscribe(
                response => {
                    this.userProfileToken = response;
                   // this._spinner.hide();
                   //this.ShowToast("Alert", response.Message, response.success);
                   //this.toastr.success(response.Message, 'Toastr fun!');
                   //this.ShowToast("Xplore", response.Message, response.Success);
                   if(!this.NullCheckFun(this.userProfileToken))
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
        }
    }

    logout()
    {
        console.log("click on RegisterNow");
        if (this.userAccount) {
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
        }
    }

    sectionTitle = [
        {
            title: 'Meet Our Awesome Team',
            paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra.'
        }
    ]
    singleTeamMember = [
        {
            img: 'assets/img/team/team1.jpg',
            title: 'James Anderson',
            designation: 'CEO & Founder',
            social: [
                {
                    icon: 'bx bxl-facebook',
                    link: '#'
                },
                {
                    icon: 'bx bxl-twitter',
                    link: '#'
                },
                {
                    icon: 'bx bxl-linkedin',
                    link: '#'
                }
            ]
        },
        {
            img: 'assets/img/team/team2.jpg',
            title: 'Sarah Taylor',
            designation: 'Co-Founder',
            social: [
                {
                    icon: 'bx bxl-facebook',
                    link: '#'
                },
                {
                    icon: 'bx bxl-twitter',
                    link: '#'
                },
                {
                    icon: 'bx bxl-linkedin',
                    link: '#'
                }
            ]
        },
        {
            img: 'assets/img/team/team3.jpg',
            title: 'Steven Smith',
            designation: 'Web Developer',
            social: [
                {
                    icon: 'bx bxl-facebook',
                    link: '#'
                },
                {
                    icon: 'bx bxl-twitter',
                    link: '#'
                },
                {
                    icon: 'bx bxl-linkedin',
                    link: '#'
                }
            ]
        },
        {
            img: 'assets/img/team/team4.jpg',
            title: 'John Capabel',
            designation: 'Programer',
            social: [
                {
                    icon: 'bx bxl-facebook',
                    link: '#'
                },
                {
                    icon: 'bx bxl-twitter',
                    link: '#'
                },
                {
                    icon: 'bx bxl-linkedin',
                    link: '#'
                }
            ]
        }
    ]

}