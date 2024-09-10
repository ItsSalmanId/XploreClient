import { Component, OnInit } from '@angular/core';
import { AddBusinessService } from '../../../../services/AddBusiness/AddBusiness.service'
import { BusinessDetail, BusinessFilesDetailList, TimeSlots } from "../../../../models/AddBusiness/AddBusiness.model";
import { Observable } from 'rxjs';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DropzoneConfig } from 'ngx-dropzone-wrapper';
import { GlobalSettingService } from '../../../../services/Global/global-setting.service';
import { GenericUtility } from '../../../../utilities/generic-utility';
//declare var $: any;
import Dropzone from 'dropzone';
import { OwlOptions } from 'ngx-owl-carousel-o';
import * as $ from 'jquery'; // Import jQuery
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
    selector: 'app-dashboard-edit-listings',
    templateUrl: './dashboard-edit-listings.component.html',
    styleUrls: ['./dashboard-edit-listings.component.scss']
})
export class DashboardEditListingsComponent implements OnInit {

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
    isLoading: boolean;
     

    constructor(private _addBusinessService: AddBusinessService, public _globalSettingService: GlobalSettingService, private _genericUtilities: GenericUtility, private toastr: ToastrService
        ,private router: Router
    ) 
    { 
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

    }

    ngOnInit(): void {
        this.timeSlots = TimeSlots;
this.getBusiness();
    }

    existingImages = [
        { name: 'image1.jpg', size: 12345, url: 'http://localhost:11492/FoxDocumentDirectory/RequestForOrder/UploadImages/Captur2e%20-%20Copy_638584824582889755.PNG' },
        { name: 'image2.jpg', size: 67890, url: 'http://localhost:11492/FoxDocumentDirectory/RequestForOrder/UploadImages/Captur2e%20-%20Copy_638584824582889755.PNG' }
      ];

    // ngAfterViewInit() {
    //     // Initialize Dropzone
    //     Dropzone.autoDiscover = false;
    //     const dropzone = new Dropzone('#p-uploadimg-dropzone', this.config);
    
    //     // Add existing images
    //     this.existingImages.forEach(image => {
    //       const mockFile = {
    //         name: image.name,
    //         size: image.size,
    //         status: Dropzone.ADDED,
    //         url: image.url
    //       };
    
    //       dropzone.emit('addedfile', mockFile);
    //       dropzone.emit('thumbnail', mockFile, image.url);
    //       dropzone.emit('complete', mockFile);
    //     });
    //   }
    
    
    breadcrumb = [
        {
            title: 'Edit Listings',
            subTitle: 'Dashboard'
        }
    ]
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
    addUpdateBusiness()
    {
        if (!this.NullCheckFun(this.businessDetail.BUSINESS_CITY) ||
        !this.NullCheckFun(this.businessDetail.BUSINESS_NAME) ||
        !this.NullCheckFun(this.businessDetail.BUSINESS_ADDRESS) ||
        !this.NullCheckFun(this.businessDetail.EMAIL_ADDRESS) ||
        !this.NullCheckFun(this.businessDetail.BUSINESS_NAME) ||
        !this.NullCheckFun(this.businessDetail.CONTACT_NO) ||
        !this.NullCheckFun(this.businessDetail.BUSINESS_CATEGORY) ||
        !this.NullCheckFun(this.businessDetail.BUSINESS_IMPORTANT_NOTES) 
        ) 
        {
            this.ShowToast("Xplore", "One or more required fields are empty.", false);
        }
        else
        {
            if(this.uploadedFilesName.length == 0 &&
                 this.businessDetail.BusinessFilesDetail.length == 0)
                {
                 this.ShowToast("Xplore", "At least one picture is required. Please upload one.", false);
                }
            else
            {
                console.log(this.businessDetail);
                console.log("click on RegisterNow");
                if (this.businessDetail) {
                    this.businessDetail.uploadedFilesName = this.uploadedFilesName;
                    //this._spinner.show();
                    this._addBusinessService.addUpdateBusiness(this.businessDetail).subscribe(
                        response => {
                            this.ShowToast("Xplore", "Your business has been successfully edit.", true);
                            this.router.navigate(['/dashboard-my-listings']);
                           // this._spinner.hide();
                           //this.ShowToast("Alert", response.Message, response.success);
                           //this.toastr.success(response.Message, 'Toastr fun!');
                           //this.ShowToast("Xplore", response.Message, response.Success);
                         
                        });
                }   
            }

        }
    }

    getBusiness()
    {
        this.isLoading = true;
        let selectedIdForEdit = localStorage.getItem("selectedIdForEdit");
        console.log(this.businessDetail);
        this.businessDetail.BUSINESS_DETAIL_ID = Number(selectedIdForEdit);


        console.log(this.businessDetail);
        console.log("click on RegisterNow");
        this.businessDetail.EMAIL_ADDRESS = "itssalmanid@gmail.com";
        if (this.businessDetail) {
            //this._spinner.show();
            this._addBusinessService.getSelectedBusiness(this.businessDetail).subscribe(
                response => {
                    console.log(response);
                    this.businessDetail = response;
                    this.isLoading = false;
                   // this._spinner.hide();
                   //this.ShowToast("Alert", response.Message, response.success);
                   //this.toastr.success(response.Message, 'Toastr fun!');
                   //this.ShowToast("Xplore", response.Message, response.Success);
                 
                });
        }
    }

    deleteSelectedRecord()
    {
        this.isLoading = true;
        this.selectedListStr  = '';
        for (const entry of this.selectedImages) {
            const id = entry;
            const detail = new BusinessFilesDetailList();
            detail.BUSINESS_FILES_DTEAIL_ID = id;
            this.selectedImagesList.push(detail);

            //this.selectedListStr = this.selectedListStr + id + ',';
            //this.selectedImagesList.push({ BUSINESS_FILES_DETAIL_ID: Number(id });
          }

console.log(this.selectedImagesList);
          

        // const businessFilesDetailListArray: BusinessFilesDetailList[] = this.selectedImages[0].map(id => new BusinessFilesDetailList(BUSINESS_FILES_DTEAIL_ID));
        // var id = this.selectedImages;
        // this.selectedImagesList.ids = this.selectedImages.map(item => item.);
        // console.log(this.businessDetail);
        // console.log("click on RegisterNow");
        // this.businessDetail.EMAIL_ADDRESS = "itssalmanid@gmail.com";
        if (this.selectedImagesList != null) {
            //this._spinner.show();
            this._addBusinessService.deleteSelectedImage(this.selectedImagesList).subscribe(
                response => {
                    console.log(response);
                    this.isLoading = true;
                    //this.getBusiness();
                    //this.businessDetailsList = response;
                   // this._spinner.hide();
                   //this.ShowToast("Alert", response.Message, response.success);
                   //this.toastr.success(response.Message, 'Toastr fun!');
                   //this.ShowToast("Xplore", response.Message, response.Success);
                 
                });
        }

    }


    onRemoveFile($event) {
        //console.log("onRemoveFile");
        let index: number = this.uploadedFilesNameClient.indexOf($event.name);
        if (index > -1) {
            this.uploadedFilesName.splice(index, 1);
            this.uploadedFilesNameClient.splice(index, 1);
        }
    }

    onMaxFilesReached() {
        //console.log("onMaxFilesReached");
    }

    onMaxFilesExceeded() {
        //console.log("onMaxFilesExceeded");
        //$("#modal-max-limit-exceed").modal("show");

        //this.ShowToast("File Upload", "A maximum of 5 files can be attached.", false);
    }

    onCanceled($event) {
        //console.log("onCanceled");
        //console.log($event);
    }

    customOptions: OwlOptions = {
		loop: true,
		nav: true,
		dots: false,
		animateOut: 'fadeOut',
		animateIn: 'fadeIn',
		autoplayHoverPause: true,
		autoplay: true,
		mouseDrag: false,
		items: 1,
        navText: [
            "<i class='flaticon-left-chevron'></i>",
            "<i class='flaticon-right-chevron'></i>"
        ]
    }

    onUploadSuccess($event) {
        //console.log("onUploadSuccess");
        this.uploadedFilesName.push($event[1].FilePath);
        this.uploadedFilesNameClient.push($event[0].name);
        this.disableTreatmentLocation = false;
        console.log(this.uploadedFilesNameClient);
        console.log(this.uploadedFilesName);

        //if ($event[0].type.indexOf("tif") > -1) {
        //}
        $(".dz-image > img").each(function () {
            if ($(this).attr("alt") != undefined && $(this).attr("alt").indexOf('.tif') > -1) {
                $(this).attr("src", "data:image/png;base64,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");
                $(this).css("width", "100%");
            }
        });
    }  
    onUploadError($event) {
        console.log("onUploadError");
    //   if ($event[1].indexOf("You can't upload files of this type.") > -1) {
    //     this.ModalSuccessObj.HeaderText = (this._globalSettingService.istalkRehab) ? "CareCloud Remote":"Fox Rehabilitation";
    //         this.ModalSuccessObj.MessageText = "Invalid file type. Only files of extensions .pdf .png .jpg .JPG .jpeg .tiff .tif .docx can be uploaded.";
    //         //$("#modal-dropzone-error").modal("show");
    //         this.ShowToast("File Upload", "Invalid file type. Only files of extensions .pdf .png .jpg .JPG .jpeg .tiff .tif .docx can be uploaded.", false);
    //     }
    //     else if ($event[1].indexOf("File is too big") > -1) {
    //         this.ModalSuccessObj.HeaderText = (this._globalSettingService.istalkRehab)? "CareCloud Remote":"Fox Rehabilitation";
    //         this.ModalSuccessObj.MessageText = "Maximum file size allowed is 8MB";
    //         //$("#modal-dropzone-error").modal("show");
    //         this.ShowToast("File Upload", "Maximum file size allowed is 20MB", false);
    //     }
    }

    // new code 
    selectFiles(event: any): void {
        this.message = [];
        this.progressInfos = [];
        this.selectedFiles = event.target.files;
    
        this.previews = [];
        if (this.selectedFiles && this.selectedFiles[0]) {
          const numberOfFiles = this.selectedFiles.length;
          for (let i = 0; i < numberOfFiles; i++) {
            const reader = new FileReader();
    
            reader.onload = (e: any) => {
              this.previews.push(e.target.result);
            };
    
            reader.readAsDataURL(this.selectedFiles[i]);
          }
        }

    }

    images = [
            { id: 1, src: 'assets/img/listings/listings4.jpg', alt: 'Image 1' },
            { id: 2, src: 'assets/img/listings/listings4.jpg', alt: 'Image 2' },
            { id: 3, src: 'assets/img/listings/listings4.jpg', alt: 'Image 3' },
        { id: 4, src: 'assets/img/listings/listings4.jpg', alt: 'Image 3' },
        { id: 5, src: 'assets/img/listings/listings4.jpg', alt: 'Image 3' },
            // Add more images as needed
          ];
        
          selectedImages: Set<number> = new Set();
        
          toggleSelection(imageId: number) {
            if (this.selectedImages.has(imageId)) {
              this.selectedImages.delete(imageId);
            } else {
              this.selectedImages.add(imageId);
            }
          }
        
          deleteSelectedImages() {
            this.images = this.images.filter(image => !this.selectedImages.has(image.id));
            this.selectedImages.clear();
          }
        hideImagePopup()
        {
                this.images = this.images.filter(image => !this.selectedImages.has(image.id));
            this.selectedImages.clear();
        }
        
}