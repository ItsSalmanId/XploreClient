import { Component, OnInit } from '@angular/core';
import { AddBusinessService } from '../../../services/AddBusiness/AddBusiness.service'
import { BusinessDetail, BusinessFilesDetailList, TimeSlots, BusinessBlogDetail } from "../../../models/AddBusiness/AddBusiness.model";
import { Observable } from 'rxjs';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DropzoneConfig } from 'ngx-dropzone-wrapper';
import { GlobalSettingService } from '../../../services/Global/global-setting.service';
import { GenericUtility } from '../../../utilities/generic-utility';
//declare var $: any;
import Dropzone from 'dropzone';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';
import * as $ from 'jquery'; // Import jQuery

@Component({
    selector: 'app-blog-details',
    templateUrl: './blog-details.component.html',
    styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {
    businessDetail: BusinessDetail;
    config: DropzoneConfig;
    uploadedFilesName: string[] = [];
    uploadedFilesNameClient: string[] = [];
    disableTreatmentLocation: boolean;
    selectedImagesList: BusinessFilesDetailList[];
    businessBlogDetail: BusinessBlogDetail;
      isLoading: boolean;
    businessBlogDetails: BusinessBlogDetail;
    businessBlogDetailsList: BusinessBlogDetail[] = [];
    selectedBlogId: string;
    blogModal: BusinessBlogDetail;
    blogImage: string;
  
      constructor(private router: Router, private _addBusinessService: AddBusinessService, public _globalSettingService: GlobalSettingService, private _genericUtilities: GenericUtility) {
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
           this.businessBlogDetail = new BusinessBlogDetail();
           this.businessDetail = new BusinessDetail();
           this.businessBlogDetails = new BusinessBlogDetail();
      this.businessBlogDetailsList = [];
       }

    ngOnInit(): void {
        this.getBlogsDetails();
    }
    getBlogsDetails()
    {
        this.selectedBlogId = localStorage.getItem('selectedBlogId');

        console.log(this.businessDetail);
        console.log("click on RegisterNow");
        this.businessDetail.EMAIL_ADDRESS = "itssalmanid@gmail.com";
        // if (this.businessDetail) {
        //     //this._spinner.show();
            this._addBusinessService.getBlogsDetails(this.businessBlogDetails).subscribe(
                response => {
                    console.log(response);
                    this.businessBlogDetailsList = response;
                    this.blogModal = this.businessBlogDetailsList.find(blog => blog.BUSINESS_BLOG_ID === Number(this.selectedBlogId));
                    this.blogImage = this.blogModal.uploadedFilesName[0];

                   // this._spinner.hide();
                   //this.ShowToast("Alert", response.Message, response.success);
                   //this.toastr.success(response.Message, 'Toastr fun!');
                   //this.ShowToast("Xplore", response.Message, response.Success);
                 
                });
        //}
     }

    pageTitleContent = [
        {
            title: 'Blog Details',
            backgroundImage: 'assets/img/page-title/page-title1.jpg'
        }
    ]

}