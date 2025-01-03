import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AddBusinessService } from '../../../../services/AddBusiness/AddBusiness.service'
import { BusinessDetail, BusinessBlogDetail, BusinessCategoryList } from "../../../../models/AddBusiness/AddBusiness.model";
import { SurveyAutomation, SurveyQuestions, SurveyLink, NavigationAndToggle, UserProfileToken } from "../../../../models/login/login.model";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonCallService } from '../../../../services/commonCall/commonCall.service';


@Component({
    selector: 'app-homeone-banner-wishlist',
    templateUrl: './homeone-banner-wishlist.component.html',
    styleUrls: ['./homeone-banner-wishlist.component.scss']
})
export class HomeoneBannerWishlistComponent implements OnInit {
    businessDetail: BusinessDetail;
    businessDetailsList: BusinessDetail[] = [];
    businessCategoryList: BusinessCategoryList[] = [];
    BusinessCategoryList
    businessBlogDetails: BusinessBlogDetail;
    businessBlogDetailsList: BusinessBlogDetail[] = [];
    isFollowDetails: any;
    checkInterval: any;
    isPublicUser: boolean = false;
    userProfileToken: UserProfileToken;
    averageRating: string = "0.0";
    fullStars: number = 1;
    halfStar: boolean = false;
    emptyStars: number = 4;
    selectedImagePath: string;
    isPopupVisibleterm: boolean;
    isTermsVisible: boolean;
    isfavoriteBusiness: boolean;

    constructor(private _addBusinessService: AddBusinessService,
        private toastr: ToastrService, private _commonCallService: CommonCallService,
        private router: Router
    ) {
        this.businessDetail = new BusinessDetail();
        this.businessDetailsList = [];
        this.businessBlogDetails = new BusinessBlogDetail();
        this.businessBlogDetailsList = [];
        this.businessCategoryList = [];
        this.userProfileToken = new UserProfileToken();
     }

    ngOnInit(): void {
        this.checkInterval = setInterval(() => {
            this.checkAccountType();
          }, 1000);
        this.resetOption = [this.options[0]];
        this.getBusiness();
        // this.getBlogsDetails();
        // this.getBusinessByCategory();

        var temp = localStorage.getItem('AcceptTerms');
        if(temp != 'Yes')
        {
            this.isTermsVisible = true;
            setTimeout(() => {
                const modal = document.querySelector('.custom-modal');
                if (modal) modal.classList.add('show');
              }, 0); 
        }
        
       //this.selectedTitle = selectedAnnouncemnet.ANNOUNCEMENT_TITLE;
       //this.selectedDetails = selectedAnnouncemnet.ANNOUNCEMENT_DETAILS;
       // Trigger the show class after rendering
    }

    getBusiness()
    {
        console.log(this.businessDetail);
        console.log("click on RegisterNow");
        this.businessDetail.EMAIL_ADDRESS = "itssalmanid@gmail.com";
        this.businessDetail.USER_ID = Number(localStorage.getItem("Temp"));
        if (this.businessDetail) {
            //this._spinner.show();
            this._addBusinessService.getBusinessDetails(this.businessDetail).subscribe(
                response => {
                    console.log(response);
                    this.businessDetailsList = response;
                    
                    if(this.businessDetailsList.length > 0)
                    {
                        var myPost = localStorage.getItem("myPost");
                        if(myPost == 'true')
                        {
                            this.businessDetailsList = this.businessDetailsList.filter(item => item.USER_ID === this.businessDetail.USER_ID); 
                            if(this.businessDetailsList.length > 0)
                                {
                                    this.businessDetailsList.forEach(business => {
                                        let averageRating = Number(business.AverageRating); // Store the average rating in a variable
            
              business.fullStars = Math.floor(averageRating); // Full stars based on the integer part
              business.halfStar = averageRating % 1 !== 0; // Check if there's a half star
              business.emptyStars = 5 - business.fullStars - (business.halfStar ? 1 : 0);
                                      });
                                    // Define the URL you want to push
                                    localStorage.setItem('selectedBusinessId', this.businessDetailsList[0].BUSINESS_DETAIL_ID.toString() );
            
                                } 
                                else
                                {
                                    this.ShowToast("Xplore", 'MyPost List is empty.', false);
                            this.router.navigate(['/']);  
                                }    
                        }
                        else
                        {
                        this.businessDetailsList = this.businessDetailsList.filter(item => item.IsfavoriteBusiness === true); 
                        if(this.businessDetailsList.length > 0)
                            {
                                this.businessDetailsList.forEach(business => {
                                    let averageRating = Number(business.AverageRating); // Store the average rating in a variable
        
          business.fullStars = Math.floor(averageRating); // Full stars based on the integer part
          business.halfStar = averageRating % 1 !== 0; // Check if there's a half star
          business.emptyStars = 5 - business.fullStars - (business.halfStar ? 1 : 0);
                                  });
                                // Define the URL you want to push
                                localStorage.setItem('selectedBusinessId', this.businessDetailsList[0].BUSINESS_DETAIL_ID.toString() );
        
                            } 
                            else
                            {
                                this.ShowToast("Xplore", 'Wishlist is empty.', false);
                        this.router.navigate(['/']);  
                            }   
                        }
                    }
                    else
                    {
                        this.ShowToast("Xplore", 'Wishlist is empty.', false);
                        this.router.navigate(['/']);                    
                    }

                   // this._spinner.hide();
                   //this.ShowToast("Alert", response.Message, response.success);
                   //this.toastr.success(response.Message, 'Toastr fun!');
                   //this.ShowToast("Xplore", response.Message, response.Success);
                 
                });
        }

  }

    getBusinessByCategory()
    {
        console.log(this.businessDetail);
        console.log("click on RegisterNow");
        this.businessDetail.EMAIL_ADDRESS = "itssalmanid@gmail.com";
        if (this.businessDetail) {
            //this._spinner.show();
            this._addBusinessService.getBusinessByCategory(this.businessDetail).subscribe(
                response => {
                    console.log(response);
                    this.businessCategoryList = response;
                   // this._spinner.hide();
                   //this.ShowToast("Alert", response.Message, response.success);
                   //this.toastr.success(response.Message, 'Toastr fun!');
                   //this.ShowToast("Xplore", response.Message, response.Success);
                 
                });
        }

  }

  selectBusinessForListing(selectedBusiness: BusinessDetail)
  {
    //this.isLoading = true;
    let selectedBusinessId = localStorage.getItem("selectedBusinessId");
    console.log(this.businessDetail);
    this.businessDetail.BUSINESS_DETAIL_ID = Number(selectedBusiness.BUSINESS_DETAIL_ID);
    this.businessDetail.EMAIL_ADDRESS = "itssalmanid@gmail.com";
    this.businessDetail.USER_ID = Number(localStorage.getItem("Temp"));
    //this.isLoading = true;
    if (this.businessDetail) {
        //this.businessDetail.uploadedFilesName = this.uploadedFilesName;
        //this._spinner.show();
        this._addBusinessService.addToFavoriteBusiness(this.businessDetail).subscribe(
            response => {
              //this.isLoading = false;
              if(response.Message == 'isfavoriteBusiness')
              {
                this.isfavoriteBusiness= true;
              }
              else
              {
                this.isfavoriteBusiness = false;
              }
              const business = this.businessDetailsList.find(b => b.BUSINESS_DETAIL_ID === selectedBusiness.BUSINESS_DETAIL_ID);

if (business) {
  // Set IsFollow to true for the found business
  business.IsfavoriteBusiness = this.isfavoriteBusiness;
 /// console.log(`Business with ID ${businessId} is now followed.`);
} 
this.getBusiness();
                //this.ShowToast("Xplore", "Your business has been successfully added.", true);
                //this.router.navigate(['/dashboard-my-listings']);
               // this._spinner.hide();
               //this.ShowToast("Alert", response.Message, response.success);
               //this.toastr.success(response.Message, 'Toastr fun!');
               //this.ShowToast("Xplore", response.Message, response.Success);
             
            });
    }
  }

  selectBusiness(selectedBusiness: BusinessDetail)
  {
    if(selectedBusiness.IsFollow == true)
    {
        console.log(selectedBusiness.BUSINESS_DETAIL_ID);
        localStorage.setItem('selectedBusinessId', selectedBusiness.BUSINESS_DETAIL_ID.toString());
        this.router.navigate(['/single-listings']);
    }
    else
    {
        this.ShowToast('Alert','To review the business, please follow it first.', false)
    }
  }

  getBlogsDetails()
    {
        console.log(this.businessDetail);
        console.log("click on RegisterNow");
        this.businessDetail.EMAIL_ADDRESS = "itssalmanid@gmail.com";
        // if (this.businessDetail) {
        //     //this._spinner.show();
            this._addBusinessService.getBlogsDetails(this.businessBlogDetails).subscribe(
                response => {
                    console.log(response);
                    this.businessBlogDetailsList = response;
                   // this._spinner.hide();
                   //this.ShowToast("Alert", response.Message, response.success);
                   //this.toastr.success(response.Message, 'Toastr fun!');
                   //this.ShowToast("Xplore", response.Message, response.Success);
                 
                });
        //}
  }

    mainBannerContent = [
        {
            title: 'Find Nearby',
            paragraph: 'Expolore top-rated attractions, activities and more...',
            popularSearchList: [
                {
                    title: 'Restaurants',
                    link: 'grid-listings-left-sidebar'
                },
                {
                    title: 'Events',
                    link: 'grid-listings-left-sidebar'
                },
                {
                    title: 'Clothing',
                    link: 'grid-listings-left-sidebar'
                },
                {
                    title: 'Bank',
                    link: 'grid-listings-left-sidebar'
                },
                {
                    title: 'Fitness',
                    link: 'grid-listings-left-sidebar'
                },
                {
                    title: 'Bookstore',
                    link: 'grid-listings-left-sidebar'
                }
            ]
        }
    ]

    // Category Select
    singleSelect: any = [];
    multiSelect: any = [];
    stringArray: any = [];
    objectsArray: any = [];
    resetOption: any;
    config:any = {
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
    sectionTitle = [
        {
            title: 'Trending Listings Right Now',
            paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra.'
        }
    ]
    singleListingsBox = [
        {
            mainImg: [
                {
                    img: 'assets/img/listings/listings1.jpg'
                }
            ],
            categoryLink: 'single-listings',
            category: 'Restaurant',
            bookmarkLink: 'single-listings',
            location: 'New York, USA',
            title: 'Chipotle Mexican Grill',
            price: 'Start From: $150',
            detailsLink: 'single-listings',
            authorImg: 'assets/img/user1.jpg',
            openORclose: 'Open Now',
            extraClass: 'status-open',
            authorName: 'Taylor',
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
            category: 'Hotel',
            bookmarkLink: 'single-listings',
            location: 'Los Angeles, USA',
            title: 'The Beverly Hills Hotel',
            price: 'Start From: $200',
            detailsLink: 'single-listings',
            authorImg: 'assets/img/user2.jpg',
            openORclose: 'Open Now',
            extraClass: 'status-open',
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
            category: 'Shopping',
            bookmarkLink: 'single-listings',
            location: 'Bangkok, Thailand',
            title: 'Central Shopping Center',
            price: 'Start From: $110',
            detailsLink: 'single-listings',
            authorImg: 'assets/img/user3.jpg',
            openORclose: 'Close Now',
            extraClass: 'status-close',
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
            category: 'Beauty',
            bookmarkLink: 'single-listings',
            location: 'Suwanee, USA',
            title: 'Vesax Beauty Center',
            price: 'Start From: $100',
            detailsLink: 'single-listings',
            authorImg: 'assets/img/user4.jpg',
            openORclose: 'Open Now',
            extraClass: 'status-open',
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
    customOptions: OwlOptions = {
        loop: false,
        nav: true,
        dots: true,
        autoplayHoverPause: true,
        autoplay: true,
        margin: 30,
        navText: [
            "<i class='flaticon-left-chevron'></i>",
            "<i class='flaticon-right-chevron'></i>"
        ],
        responsive: {
            0: {
                items: 1,
            },
            425:{
                items: 2,
            },
            768: {
                items: 3,
            },
            1200: {
                items: 3,
            }
        }
    }
    customOptions2: OwlOptions = {
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

    isPopupVisible = false;

  openPopup(selectedImagePath: string) {
  this.selectedImagePath = selectedImagePath;
    this.isPopupVisible = true;

  }
  ngOnDestroy(): void {
    // Clear the interval when the component is destroyed
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
  }
checkAccountType(): void {
    // Get the value from localStorage and update userAccount
    var loginId = Number(localStorage.getItem('Temp'));

    // Check accountType and update isPublicUser
    if (loginId == 0) {
      this.isPublicUser = true;
    } else {
      this.isPublicUser = false;
    }
  }
  userToken()
  {
      console.log("click on RegisterNow");
      if (this.userProfileToken) {
          //this._spinner.show();
          this.userProfileToken.USER_ID = Number(localStorage.getItem("Temp"));
          if(this.userProfileToken.USER_ID == 0)
          {
            this.ShowToast("Xplore", 'To perform this function, login is required.', true);
            this.router.navigate(['/products-list']);
          }else
          {
            this._commonCallService.userToken(this.userProfileToken).subscribe(
              response => {
                  this.userProfileToken = response;
                 // this._spinner.hide();
                 //this.ShowToast("Alert", response.Message, response.success);
                 //this.toastr.success(response.Message, 'Toastr fun!');
                 //this.ShowToast("Xplore", response.Message, response.Success);
                 if(!this.NullCheckFun(this.userProfileToken))
                 {
                  this.ShowToast("Xplore", 'To perform this function, login is required.', true);
                  //this.router.navigate(['/products-list']);
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
  followBusiness(selectedBusinessI: number)
  {
    //this.isLoading = true;
        let selectedBusinessId = localStorage.getItem("selectedBusinessId");
        console.log(this.businessDetail);
        this.businessDetail.BUSINESS_DETAIL_ID = Number(selectedBusinessI);
        this.businessDetail.EMAIL_ADDRESS = "itssalmanid@gmail.com";
        this.businessDetail.USER_ID = Number(localStorage.getItem("Temp"));
        //this.isLoading = true;
        if (this.businessDetail) {
            //this.businessDetail.uploadedFilesName = this.uploadedFilesName;
            //this._spinner.show();
            this._addBusinessService.followBusiness(this.businessDetail).subscribe(
                response => {
                  //this.isLoading = false;
                  if(response.Message == 'isFollow')
                  {
                    this.isFollowDetails = true;
                  }
                  else
                  {
                    this.isFollowDetails = false;
                  }
                  const business = this.businessDetailsList.find(b => b.BUSINESS_DETAIL_ID === selectedBusinessI);

    if (business) {
      // Set IsFollow to true for the found business
      business.IsFollow = this.isFollowDetails;
     /// console.log(`Business with ID ${businessId} is now followed.`);
    } 
                    //this.ShowToast("Xplore", "Your business has been successfully added.", true);
                    //this.router.navigate(['/dashboard-my-listings']);
                   // this._spinner.hide();
                   //this.ShowToast("Alert", response.Message, response.success);
                   //this.toastr.success(response.Message, 'Toastr fun!');
                   //this.ShowToast("Xplore", response.Message, response.Success);
                 
                });
        }
  }

  closePopup() {

    this.isPopupVisible = false;

  }

  showTerms() {
    this.isTermsVisible = true;
  }

  closeTerms() {
    this.isTermsVisible = false;
  }

  acceptTerms() {
    // Logic for accepting terms
    this.closeTerms();
  }
  closePopupAccept()
  {
    localStorage.setItem('AcceptTerms', "Yes");
    this.isTermsVisible = false;
  }
}