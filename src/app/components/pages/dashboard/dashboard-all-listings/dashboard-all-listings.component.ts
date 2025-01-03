import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AddBusinessService } from '../../../../services/AddBusiness/AddBusiness.service'
import { BusinessDetail } from "../../../../models/AddBusiness/AddBusiness.model";
import { ToastrService } from 'ngx-toastr';
import { SurveyAutomation, SurveyQuestions, SurveyLink, NavigationAndToggle, UserAccount } from "../../../../models/login/login.model";
import { AccountService } from '../../../../services/login/login.service';
import { CommonCall } from '../../../../components/common/commonCall/commonCall.component';



@Component({
  selector: 'app-dashboard-all-listings',
  templateUrl: './dashboard-all-listings.component.html',
  styleUrls: ['./dashboard-all-listings.component.scss']
})
export class DashboardAllListingsComponent implements OnInit {
  userAccount: UserAccount;
    businessDetail: BusinessDetail;
    businessDetailsList: BusinessDetail[] = [];
    isShownDelete: boolean;
    modal='modal';
    name = 'Angular';
    selectedId: number;
  isLoading: boolean;
  accountStatus: string;
  selectedIdForAprovel: number;
  isPopupVisible: boolean = false;
  IsLoginAdmin: boolean;
  IsLoginBusinessOwner: boolean;
  @ViewChild(CommonCall, { static: false }) childComponent!: CommonCall;
    constructor(private _accountServiceService: AccountService, private _addBusinessService: AddBusinessService, private toastr: ToastrService) { 
    this.businessDetail = new BusinessDetail();
    this.businessDetailsList = [];
    this.isShownDelete = true;
    this.selectedId = 0;
    this.isLoading = false;
    this.userAccount = new UserAccount();
    
    

    }

  ngOnInit(): void {
    this.resetOption = [this.options[0]];
        this.getBusiness();
          this.userToken();
   
    }
    ngAfterViewInit() {
      if (this.childComponent) {
        this.childComponent.userToken();
      }
    }

    fetchRecord(id: number)
    {
        console.log(id);
        this.selectedId = id;
    }
    editRecord(id: number)
    {
        localStorage.setItem('selectedIdForEdit', id.toString());
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
    deleteRecord()
    {
        var id = this.selectedId;
        console.log(this.businessDetail);
        console.log("click on RegisterNow");
        this.businessDetail.EMAIL_ADDRESS = "itssalmanid@gmail.com";
        if (this.selectedId != 0) {
            //this._spinner.show();
            this._addBusinessService.deleteBusinessDetails(this.selectedId).subscribe(
                response => {
                    console.log(response);
                    this.ShowToast("Xplore", "Your business has been deleted successfully.", true);
                    this.getBusiness();
                    //this.businessDetailsList = response;
                   // this._spinner.hide();
                   //this.ShowToast("Alert", response.Message, response.success);
                   //this.toastr.success(response.Message, 'Toastr fun!');
                   //this.ShowToast("Xplore", response.Message, response.Success);
                 
                });
        }

    }

    bussinessStatus(selectedBussines: BusinessDetail)
    {
      this.isPopupVisible = true;
      setTimeout(() => {
        const modal = document.querySelector('.custom-modal');
        if (modal) modal.classList.add('show');
      }, 0);
      console.log(this.isPopupVisible);
      this.selectedIdForAprovel =selectedBussines.BUSINESS_DETAIL_ID;
      this.accountStatus = selectedBussines.IS_APPROVED == false ? "approve" : "reject";
    }
    aprovelModelClose()
    {
      const modal = document.querySelector('.custom-modal');
       if (modal) {
         modal.classList.remove('show');
         setTimeout(() => {
           this.isPopupVisible = false;
         }, 500); // Delay the removal until after the transition
       }
       if(this.accountStatus == "approve")
       {
        
       }
      this.selectedIdForAprovel;
      let business = this.businessDetailsList.find(business => business.BUSINESS_DETAIL_ID === this.selectedIdForAprovel);
      if (business) {
        business.IS_APPROVED = this.accountStatus == "approve" ? false : true;
    }
    }
    userToken()
    {
console.log("click on login");
this.userAccount.APPLICATION_USER_ACCOUNTS_ID = Number(localStorage.getItem("Temp"));
if (this.userAccount) {
    //this._spinner.show();
    this._accountServiceService.validateUser(this.userAccount).subscribe(
        response => {
            this.userAccount = response
            if(this.userAccount.ACCOUNT_TYPE == "Admin")
            {
              this.IsLoginAdmin = true;
            }
            if(this.userAccount.ACCOUNT_TYPE == "Business Account")
              {
                this.IsLoginBusinessOwner = true;
              }
              if(this.userAccount.ACCOUNT_TYPE == "User")
                {
                  this.IsLoginAdmin = true;
                }
        });
}


    }
    aprovelModelYes()
    {
      const modal = document.querySelector('.custom-modal');
       if (modal) {
         modal.classList.remove('show');
         setTimeout(() => {
           this.isPopupVisible = false;
         }, 500); // Delay the removal until after the transition
       }
      var id = this.selectedIdForAprovel;
        console.log(this.businessDetail);
        console.log("click on RegisterNow");
        if (this.selectedIdForAprovel != 0) {
            //this._spinner.show();
            this._addBusinessService.aprovelRejectBusinessDetails(this.selectedIdForAprovel).subscribe(
                response => {
                    console.log(response);
                    var toastMessage = "Your business has been "+this.accountStatus+" successfully";
                    this.ShowToast("Xplore", toastMessage, true);
                    this.getBusiness();
                    //this.businessDetailsList = response;
                   // this._spinner.hide();
                   //this.ShowToast("Alert", response.Message, response.success);
                   //this.toastr.success(response.Message, 'Toastr fun!');
                   //this.ShowToast("Xplore", response.Message, response.Success);
                 
                });
        }
    }
    openModal(inp: string) {
        console.log(inp);
        this.modal='modal-open';
      }
      closeModal(){
        this.modal='modal';
      }
    getBusiness()
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
                    this.isLoading = false;
                   // this._spinner.hide();
                   //this.ShowToast("Alert", response.Message, response.success);
                   //this.toastr.success(response.Message, 'Toastr fun!');
                   //this.ShowToast("Xplore", response.Message, response.Success);
                 
                });
        }
  }

  breadcrumb = [
    {
      title: 'Review Business',
      subTitle: 'Dashboard'
    }
  ]

  pageTitleContent = [
    {
      title: 'Find Popular Places'
    }
  ]

  singleSelect: any = [];
  multiSelect: any = [];
  stringArray: any = [];
  objectsArray: any = [];
  resetOption: any;
  config: any = {
    displayKey: "name",
    search: true
  };
  options = [
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

  images = [
    { id: 1, src: 'assets/img/listings/listings4.jpg', alt: 'Image 1' },
    { id: 2, src: 'assets/img/listings/listings4.jpg', alt: 'Image 2' },
    { id: 3, src: 'assets/img/listings/listings4.jpg', alt: 'Image 3' },
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
  items = [
    { col1: 'Item 1-1', col2: 'Item 1-2', col3: 'Item 1-3' },
    { col1: 'Item 2-1', col2: 'Item 2-2', col3: 'Item 2-3' },
    { col1: 'Item 3-1', col2: 'Item 3-2', col3: 'Item 3-3' },
  ];
}
