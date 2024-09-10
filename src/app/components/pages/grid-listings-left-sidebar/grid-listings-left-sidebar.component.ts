import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AddBusinessService } from '../../../services/AddBusiness/AddBusiness.service'
import { BusinessDetail, BusinessFilesDetailList, TimeSlots, BusinessDetailCountList, BusinessRating, BusinessFilters } from "../../../models/AddBusiness/AddBusiness.model";
import { Observable } from 'rxjs';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DropzoneConfig } from 'ngx-dropzone-wrapper';
import { GlobalSettingService } from '../../../services/Global/global-setting.service';
import { GenericUtility } from '../../../utilities/generic-utility';
//declare var $: any;
import Dropzone from 'dropzone';
import * as $ from 'jquery'; // Import jQuery
import { Router } from '@angular/router';
import { VerticalListingsLeftSidebarComponent } from '../../../components/pages/vertical-listings-left-sidebar/vertical-listings-left-sidebar.component';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-grid-listings-left-sidebar',
    templateUrl: './grid-listings-left-sidebar.component.html',
    styleUrls: ['./grid-listings-left-sidebar.component.scss']
})
export class GridListingsLeftSidebarComponent implements OnInit {
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
    businessDetailsList: BusinessDetail[] = [];
    businessDetailCountList: BusinessDetailCountList[] = [];
    summaries: BusinessDetailCountList[];
    @ViewChild(VerticalListingsLeftSidebarComponent) childComponent!: VerticalListingsLeftSidebarComponent;
    parentValue: number = 0;
    cleanlinessRating: number;
  stars: number[] = [1, 2, 3, 4, 5];
  businessRating: BusinessRating;
  ratings = [];
  vaetical : number = 0
    Name: any;
    businessRatingList: BusinessRating[];
    reviewsCount: any = 0;
    averageRating: string = "0.0";
    fullStars: number = 1;
    halfStar: boolean = false;
    emptyStars: number = 4;
    isLoading: boolean;
    businessFilteredList: BusinessDetail[];

    //businessDetail: BusinessDetail;
    //businessDetailsList: BusinessDetail[] = [];
    //businessBlogDetails: BusinessBlogDetail;
    //businessBlogDetailsList: BusinessBlogDetail[] = [];
    listCount: number;
    isChecked: boolean;
    //businessFilteredList: BusinessDetail[];
    businessFilters: BusinessFilters; 
    businessFilteredListTemp: any[];
    @Input() value: number;

    constructor(private _addBusinessService: AddBusinessService, 
        public _globalSettingService: GlobalSettingService, 
        private _genericUtilities: GenericUtility, private router: Router, private toastr: ToastrService) 
        { 
            // ratings = [  
            //     { label: 'Cleanliness', value: 0, modal: this.businessRating.CLEANLINESS_RATING },  
            //     { label: 'Accuracy', value: 0, modal: this.businessRating.ACCURACY_RATING },  
            //     { label: 'Location', value: 0, modal: this.businessRating.LOCATION_RATING },  
            //     { label: 'Check-in', value: 0, modal: this.businessRating.CHECK_IN },  
            //     { label: 'Communication', value: 0, modal: this.businessRating.COMMUNICATION_RATING },  
            //     { label: 'Value', value: 0, modal: this.businessRating.VALUE_RATING },  
            // ]; 
            this.vaetical = 0
            this.ratings = [
                { label: 'Cleanliness', value: 0, modal: this.vaetical }
                // { label: 'Accuracy', value: 0, modal: this.vaetical },
                // { label: 'Location', value: 0, modal: this.vaetical },
                // { label: 'Check-in', value: 0, modal: this.vaetical },
                // { label: 'Communication', value: 0, modal: this.vaetical },
                // { label: 'Value', value: 0, modal: this.vaetical}
              ];
              
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
        this.businessDetailsList = [];
        this.businessDetailCountList = [];
        this.businessRating = new BusinessRating();
        this.businessRatingList = [];

        
        
        }


    ngOnInit(): void {
        this.resetOption = [this.options[0]];
        this.getBusiness();
        this.getBusinessList();
        this.getBusinessRating();
    }

    onRatingChange(rating: any): void {
        console.log(`${rating.label} Rating:`, rating.value, rating.modal);
        if(rating.label == 'Cleanliness')
        {
            this.businessRating.CLEANLINESS_RATING = rating.value;
        }
        else if(rating.label == 'Accuracy')
        {
            this.businessRating.ACCURACY_RATING = rating.value;
        }
        else if(rating.label == 'Location')
            {
                this.businessRating.LOCATION_RATING = rating.value;
            }
            else if(rating.label == 'Check-in')
                {
                    this.businessRating.CHECKIN_RATING = rating.value;
                }
                else if(rating.label == 'Communication')
                    {
                        this.businessRating.COMMUNICATION_RATING = rating.value;
                    }
                    else if(rating.label == 'Value')
                        {
                            this.businessRating.VALUE_RATING = rating.value;
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
      submitRating(isCallFromAddReview: boolean = false)
      {
        this.isLoading = true;
        if (!this.NullCheckFun(this.businessRating.NAME) ||
        !this.NullCheckFun(this.businessRating.EMAIL_ADDRESS) ||
        !this.NullCheckFun(this.businessRating.FEEDBACK) 
        ) 
        {
            this.ShowToast("Xplore", "One or more required fields are empty.", false);
        }
        else
        {
            let selectedBusinessId = localStorage.getItem("selectedBusinessId");
            console.log(this.businessDetail);
            this.businessRating.BUSINESS_ID = Number(selectedBusinessId);
            console.log(this.businessDetail);
            console.log("click on RegisterNow");
            this.businessDetail.EMAIL_ADDRESS = "itssalmanid@gmail.com";
            if (this.businessRating) {
                //this._spinner.show();
                this._addBusinessService.submitRating(this.businessRating).subscribe(
                    response => {
                        console.log(response);
                        this.businessDetail = response;
                        this.getBusinessRating();
                        if(isCallFromAddReview == true)
                        {
                            this.currentTab = "tab4";
                        }
                        this.isLoading = false;
                        
                        
                       // this._spinner.hide();
                       //this.ShowToast("Alert", response.Message, response.success);
                       //this.toastr.success(response.Message, 'Toastr fun!');
                       //this.ShowToast("Xplore", response.Message, response.Success);
                     
                    });
            }
        }
      }

    // onRatingChange(event: any): void {
    //    // this.cleanlinessRating = event.target.value;
    //     console.log('Selected Rating:', this.cleanlinessRating);
    //     console.log('Selected Rating:', this.businessRating);
    //   }
    changeValue() {
        this.parentValue += 1; // Is value ko change karne se child component mein method call hoga
      }

    getCategorySummary(category: string): BusinessDetailCountList {
        const filteredItems = this.businessDetailsList.filter(
          (item) => item.BUSINESS_CATEGORY === category
        );
        return {
          category,
          count: filteredItems.length,
          ids: filteredItems.map((item) => item.BUSINESS_DETAIL_ID),
        };
      }
      selectBusinessCategory(selectBusinessCategoryList: BusinessDetailCountList)
      {
       console.log(selectBusinessCategoryList);
       localStorage.setItem('selectBusinessCategoryList', selectBusinessCategoryList.ids.toString());

       let selectedIdForEdit = localStorage.getItem("selectBusinessCategoryList");
       console.log(selectedIdForEdit);
       this.childComponent.ngOnInit();
       //this.router.navigate(['/vertical-listings-left-sidebar']);

      }
      getBusiness()
      {
          console.log(this.businessDetail);
          console.log("click on RegisterNow");
          this.businessDetail.EMAIL_ADDRESS = "itssalmanid@gmail.com";
          if (this.businessDetail) {
              //this._spinner.show();
              this._addBusinessService.getBusinessDetails(this.businessDetail).subscribe(
                  response => {
                      console.log(response);
                      this.businessDetailsList = response;
                      this.listCount = this.businessDetailsList.length;
                      this.businessFilteredList = this.businessDetailsList;
                      this.listCount = this.businessFilteredList.length;
                      let selectedIdForEdit = localStorage.getItem("selectBusinessCategoryList");
                      if(selectedIdForEdit != null)
                      {
                          const idsArray = selectedIdForEdit.split(",").map(Number);
  
                       // Filter the list based on the IDs
                       const filteredList = this.businessFilteredList.filter((item) =>
                         idsArray.includes(item.BUSINESS_DETAIL_ID)
                       );
                         this.businessFilteredList = filteredList;
                         localStorage.removeItem("selectBusinessCategoryList");
                      }
                      console.log(selectedIdForEdit);
                     // this._spinner.hide();
                     //this.ShowToast("Alert", response.Message, response.success);
                     //this.toastr.success(response.Message, 'Toastr fun!');
                     //this.ShowToast("Xplore", response.Message, response.Success);
                   
                  });
          }
  
    }
    getBusinessRating()
    {
        
        this.isLoading = true;
        let selectedBusinessId = localStorage.getItem("selectedBusinessId");
        console.log(this.businessDetail);
        this.businessRating.BUSINESS_ID = this.businessDetail.BUSINESS_DETAIL_ID = Number(selectedBusinessId);


        console.log(this.businessDetail);
        console.log("click on RegisterNow");
        this.businessDetail.EMAIL_ADDRESS = "itssalmanid@gmail.com";
        if (this.businessRating) {
            //this._spinner.show();
            this._addBusinessService.getBusinessRating(this.businessRating).subscribe(
                response => {
                    console.log(response);
                    if(response.length > 0)
                    {
                        this.businessRating.EMAIL_ADDRESS = "";
                        this.businessRating.FEEDBACK = "";
                        this.businessRating.NAME = "";    
                        this.businessRating.SAVE_INFORMATION_OR_NOT = false;
                        this.businessRatingList = response;
                        this.reviewsCount = this.businessRatingList.length;
                        this.averageRating = this.businessRatingList[0].AVG_RATING
    
                         // Replace with your actual averageRating value
      this.fullStars = Math.floor(Number(this.averageRating)); // Full stars based on the integer part
      this.halfStar = Number(this.averageRating) % 1 !== 0; // Check if there's a half star
      this.emptyStars = 5 - this.fullStars - (this.halfStar ? 1 : 0);
                    }
                    this.isLoading = false;
                     // Calculate remaining empty stars
                 
                    
                   // this._spinner.hide();
                   //this.ShowToast("Alert", response.Message, response.success);
                   //this.toastr.success(response.Message, 'Toastr fun!');
                   //this.ShowToast("Xplore", response.Message, response.Success);
                 
                });
        }
    }
    
    getBusinessList()
    {
        this.isLoading = true;
        console.log(this.businessDetail);
        console.log("click on RegisterNow");
        this.businessDetail.EMAIL_ADDRESS = "itssalmanid@gmail.com";
        if (this.businessDetail) {
            //this._spinner.show();
            this._addBusinessService.getBusinessDetails(this.businessDetail).subscribe(
                response => {
                    console.log(response);
                    this.businessDetailsList = response;
                    const restaurantSummary = this.getCategorySummary("Restaurants");
const homeServiceSummary = this.getCategorySummary("Home Services");
const agencySummary = this.getCategorySummary("Agency");
const summaries: BusinessDetailCountList[] = [
    restaurantSummary,
    homeServiceSummary,
    agencySummary,
  ];

  console.log(summaries);

  this.summaries = summaries;
  this.isLoading = false;
                    //this.listCount = this.businessDetailsList.length;
                    //this.businessFilteredList = this.businessDetailsList;
                   // this._spinner.hide();
                   //this.ShowToast("Alert", response.Message, response.success);
                   //this.toastr.success(response.Message, 'Toastr fun!');
                   //this.ShowToast("Xplore", response.Message, response.Success);
                 
                });
        }

  }

  clearCategoryFilters()
    {
        this.businessFilteredList = this.businessDetailsList;
        this.listCount = this.businessFilteredList.length;
        this.businessFilters = new BusinessFilters();
    }
    applyCategoryFIlter()
    {
        // if(this.businessFilters.isCheckResturnat == true)
        // {
        //     this.businessFilteredList = this.businessDetailsList.filter(item => item.BUSINESS_CATEGORY === 'Restaurants');
        // }

        this.businessFilteredListTemp = [];
        this.businessFilteredListTemp = this.businessDetailsList.filter(item => {
            // Use the `some` method to check if any filter matches
            return (
              (this.businessFilters.isCheckRestaurant && item.BUSINESS_CATEGORY === 'Restaurants') ||
              (this.businessFilters.isCheckHomeServices && item.BUSINESS_CATEGORY === 'Home Services') ||
              (this.businessFilters.isCheckAgency && item.BUSINESS_CATEGORY === 'Agency')
            );
          });
    console.log(this.businessFilteredList);
    this.businessFilteredList = this.businessFilteredListTemp;
    this.listCount = this.businessFilteredList.length;

    }

  currentTab = 'tab1';
  switchTab(event: MouseEvent, tab: string) {
      event.preventDefault();
      this.currentTab = tab;
      if(tab == 'tab6')
      {
          this.parentValue += 1;
          this.childComponent.ngOnInit();
      }   
  }

    pageTitleContent = [
        {
            title: 'Find Popular Places'
        }
    ]

    // Category Select
    singleSelect: any = [];
    multiSelect: any = [];
    stringArray: any = [];
    objectsArray: any = [];
    resetOption: any;
    configg:any = {
        displayKey: "name",
        search: true
    };
    options = [
        // Type here your category name
        {
            name: "Restaurants",
        },
        {
            name: "Events",
        },
        {
            name: "Clothing",
        },
        {
            name: "Bank",
        },
        {
            name: "Fitness",
        },
        {
            name: "Bookstore",
        }
    ];
    searchChange($event) {
        console.log($event);
    }
    reset() {
        this.resetOption = [];
    }
    // Ordering Select
    options2 = [
        {
            name: "Recommended",
        },
        {
            name: "Default",
        },
        {
            name: "Popularity",
        },
        {
            name: "Latest",
        },
        {
            name: "Price: low to high",
        },
        {
            name: "Price: high to low",
        }
    ];

    // All Listings
    singleListingsBox = [
        {
            mainImg: [
                {
                    img: 'assets/img/listings/listings1.jpg'
                }
            ],
            categoryLink: 'single-listings',
            bookmarkLink: 'single-listings',
            detailsLink: 'single-listings',
            category: 'Restaurant',
            location: 'New York, USA',
            title: 'Chipotle Mexican Grill',
            price: 'Start From: $150',
            authorImg: 'assets/img/user1.jpg',
            authorName: 'Taylor',
            openORclose: 'Open Now',
            extraClass: 'status-open',
            rating: [
                {
                    icon: 'bx bxs-star'
                },
                {
                    icon: 'bx bxs-star'
                },
                {
                    icon: 'bx bxs-star'
                },
                {
                    icon: 'bx bxs-star'
                },
                {
                    icon: 'bx bxs-star'
                }
            ],
            ratingCount: '45'
        },
        {
            mainImg: [
                {
                    img: 'assets/img/listings/listings2.jpg'
                },
                {
                    img: 'assets/img/listings/listings4.jpg'
                }
            ],
            categoryLink: 'single-listings',
            bookmarkLink: 'single-listings',
            detailsLink: 'single-listings',
            category: 'Hotel',
            location: 'Los Angeles, USA',
            title: 'The Beverly Hills Hotel',
            price: 'Start From: $200',
            openORclose: 'Open Now',
            extraClass: 'status-open',
            authorImg: 'assets/img/user2.jpg',
            authorName: 'Sarah',
            rating: [
                {
                    icon: 'bx bxs-star'
                },
                {
                    icon: 'bx bxs-star'
                },
                {
                    icon: 'bx bxs-star'
                },
                {
                    icon: 'bx bxs-star'
                },
                {
                    icon: 'bx bx-star'
                }
            ],
            ratingCount: '10'
        },
        {
            mainImg: [
                {
                    img: 'assets/img/listings/listings3.jpg'
                }
            ],
            categoryLink: 'single-listings',
            bookmarkLink: 'single-listings',
            detailsLink: 'single-listings',
            category: 'Shopping',
            location: 'Bangkok, Thailand',
            title: 'Central Shopping Center',
            price: 'Start From: $110',
            openORclose: 'Close Now',
            extraClass: 'status-close',
            authorImg: 'assets/img/user3.jpg',
            authorName: 'James',
            rating: [
                {
                    icon: 'bx bxs-star'
                },
                {
                    icon: 'bx bxs-star'
                },
                {
                    icon: 'bx bxs-star'
                },
                {
                    icon: 'bx bxs-star'
                },
                {
                    icon: 'bx bxs-star-half'
                }
            ],
            ratingCount: '35'
        },
        {
            mainImg: [
                {
                    img: 'assets/img/listings/listings5.jpg'
                },
                {
                    img: 'assets/img/listings/listings6.jpg'
                }
            ],
            categoryLink: 'single-listings',
            bookmarkLink: 'single-listings',
            detailsLink: 'single-listings',
            category: 'Beauty',
            location: 'Suwanee, USA',
            title: 'Vesax Beauty Center',
            price: 'Start From: $100',
            openORclose: 'Open Now',
            extraClass: 'status-open',
            authorImg: 'assets/img/user4.jpg',
            authorName: 'Andy',
            rating: [
                {
                    icon: 'bx bxs-star'
                },
                {
                    icon: 'bx bxs-star'
                },
                {
                    icon: 'bx bxs-star'
                },
                {
                    icon: 'bx bx-star'
                },
                {
                    icon: 'bx bx-star'
                }
            ],
            ratingCount: '15'
        },
        {
            mainImg: [
                {
                    img: 'assets/img/listings/listings7.jpg'
                }
            ],
            categoryLink: 'single-listings',
            bookmarkLink: 'single-listings',
            detailsLink: 'single-listings',
            category: 'Restaurant',
            location: 'Francisco, USA',
            title: 'The Mad Made Grill',
            price: 'Start From: $121',
            openORclose: 'Open Now',
            extraClass: 'status-open',
            authorName: 'James',
            authorImg: 'assets/img/user3.jpg',
            rating: [
                {
                    icon: 'bx bxs-star'
                },
                {
                    icon: 'bx bxs-star'
                },
                {
                    icon: 'bx bxs-star'
                },
                {
                    icon: 'bx bx-star'
                },
                {
                    icon: 'bx bx-star'
                }
            ],
            ratingCount: '18'
        },
        {
            mainImg: [
                {
                    img: 'assets/img/listings/listings4.jpg'
                },
                {
                    img: 'assets/img/listings/listings2.jpg'
                }
            ],
            categoryLink: 'single-listings',
            bookmarkLink: 'single-listings',
            detailsLink: 'single-listings',
            category: 'Hotel',
            location: 'Los Angeles, USA',
            title: 'The Beverly Hills Hotel',
            price: 'Start From: $200',
            openORclose: 'Open Now',
            extraClass: 'status-open',
            authorImg: 'assets/img/user2.jpg',
            authorName: 'Sarah',
            rating: [
                {
                    icon: 'bx bxs-star'
                },
                {
                    icon: 'bx bxs-star'
                },
                {
                    icon: 'bx bxs-star'
                },
                {
                    icon: 'bx bx-star'
                },
                {
                    icon: 'bx bx-star'
                }
            ],
            ratingCount: '10'
        },
        {
            mainImg: [
                {
                    img: 'assets/img/listings/listings13.jpg'
                }
            ],
            categoryLink: 'single-listings',
            bookmarkLink: 'single-listings',
            detailsLink: 'single-listings',
            category: 'Fitness',
            location: 'Bangkok, Thailand',
            title: 'Power House Gym',
            price: 'Start From: $110',
            openORclose: 'Open Now',
            extraClass: 'status-open',
            authorImg: 'assets/img/user3.jpg',
            authorName: 'James',
            rating: [
                {
                    icon: 'bx bxs-star'
                },
                {
                    icon: 'bx bxs-star'
                },
                {
                    icon: 'bx bxs-star'
                },
                {
                    icon: 'bx bx-star'
                },
                {
                    icon: 'bx bx-star'
                }
            ],
            ratingCount: '35'
        },
        {
            mainImg: [
                {
                    img: 'assets/img/listings/listings14.jpg'
                },
                {
                    img: 'assets/img/listings/listings15.jpg'
                }
            ],
            categoryLink: 'single-listings',
            bookmarkLink: 'single-listings',
            detailsLink: 'single-listings',
            category: 'Beauty',
            location: 'Suwanee, USA',
            title: 'Divine Beauty Parlour & Spa',
            price: 'Start From: $100',
            openORclose: 'Open Now',
            extraClass: 'status-open',
            authorImg: 'assets/img/user4.jpg',
            authorName: 'Andy',
            rating: [
                {
                    icon: 'bx bxs-star'
                },
                {
                    icon: 'bx bxs-star'
                },
                {
                    icon: 'bx bxs-star'
                },
                {
                    icon: 'bx bx-star'
                },
                {
                    icon: 'bx bx-star'
                }
            ],
            ratingCount: '15'
        }
    ]

    gridListings: number = 1;

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

}