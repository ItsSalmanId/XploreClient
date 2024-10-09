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
    selector: 'app-blog-grid',
    templateUrl: './blog-grid.component.html',
    styleUrls: ['./blog-grid.component.scss']
})
export class BlogGridComponent implements OnInit {

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
            title: 'Blog Grid',
            backgroundImage: 'assets/img/page-title/page-title2.jpg'
        }
    ]
    singleBlogPost = [
        {
            mainImg: 'assets/img/blog/blog4.jpg',
            authorImg: 'assets/img/user1.jpg',
            authorName: 'Taylor',
            date: 'Aug 7, 2024',
            title: '10 Types of Social Proof and What Makes Them Effective',
            link: 'blog-details'
        },
        {
            mainImg: 'assets/img/blog/blog5.jpg',
            authorImg: 'assets/img/user2.jpg',
            authorName: 'Sarah',
            date: 'Aug 6, 2024',
            title: 'Tech Products That Make It Easier to Stay Home',
            link: 'blog-details'
        },
        {
            mainImg: 'assets/img/blog/blog6.jpg',
            authorImg: 'assets/img/user3.jpg',
            authorName: 'Andy',
            date: 'Aug 5, 2024',
            title: '13 Feel-Good Restaurant Stories from the Pandemic',
            link: 'blog-details'
        },
        {
            mainImg: 'assets/img/blog/blog7.jpg',
            authorImg: 'assets/img/user1.jpg',
            authorName: 'Taylor',
            date: 'Aug 4, 2024',
            title: '5 Ways to Convert Customers Into Advocates Brand',
            link: 'blog-details'
        },
        {
            mainImg: 'assets/img/blog/blog8.jpg',
            authorImg: 'assets/img/user2.jpg',
            authorName: 'Sarah',
            date: 'Aug 3, 2024',
            title: 'Vesax Tips To-Go: Getting Started With Analytics',
            link: 'blog-details'
        },
        {
            mainImg: 'assets/img/blog/blog9.jpg',
            authorImg: 'assets/img/user3.jpg',
            authorName: 'Andy',
            date: 'Aug 6, 2024',
            title: 'How to Beat the High Cost of Customer Questions',
            link: 'blog-details'
        },
        {
            mainImg: 'assets/img/blog/blog10.jpg',
            authorImg: 'assets/img/user1.jpg',
            authorName: 'Taylor',
            date: 'Aug 5, 2024',
            title: 'Tech Products That Make It Easier to Stay Home',
            link: 'blog-details'
        },
        {
            mainImg: 'assets/img/blog/blog11.jpg',
            authorImg: 'assets/img/user2.jpg',
            authorName: 'Sarah',
            date: 'Aug 4, 2024',
            title: 'Necessity May Give Us a Virtual Court System',
            link: 'blog-details'
        },
        {
            mainImg: 'assets/img/blog/blog12.jpg',
            authorImg: 'assets/img/user3.jpg',
            authorName: 'Andy',
            date: 'Aug 3, 2024',
            title: '3 Improvements the COVID-19 Pandemic May Force',
            link: 'blog-details'
        }
    ]

    blogGrid: number = 1;

}