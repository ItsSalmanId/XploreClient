import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AddBusinessService } from '../../../../services/AddBusiness/AddBusiness.service'
import { BusinessDetail, BusinessBlogDetail, BusinessCategoryList } from "../../../../models/AddBusiness/AddBusiness.model";

@Component({
    selector: 'app-homeone-banner',
    templateUrl: './homeone-banner.component.html',
    styleUrls: ['./homeone-banner.component.scss']
})
export class HomeoneBannerComponent implements OnInit {
    businessDetail: BusinessDetail;
    businessDetailsList: BusinessDetail[] = [];
    businessCategoryList: BusinessCategoryList[] = [];
    BusinessCategoryList
    businessBlogDetails: BusinessBlogDetail;
    businessBlogDetailsList: BusinessBlogDetail[] = [];

    constructor(private _addBusinessService: AddBusinessService) {
        this.businessDetail = new BusinessDetail();
        this.businessDetailsList = [];
        this.businessBlogDetails = new BusinessBlogDetail();
        this.businessBlogDetailsList = [];
        this.businessCategoryList = [];
     }

    ngOnInit(): void {
        this.resetOption = [this.options[0]];
        this.getBusiness();
        this.getBlogsDetails();
        this.getBusinessByCategory();
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
                    if(this.businessDetailsList.length > 0)
                    {
                        localStorage.setItem('selectedBusinessId', this.businessDetailsList[0].BUSINESS_DETAIL_ID.toString() );
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
  selectBusiness(selectedBusinessId: number)
  {
    console.log(selectedBusinessId);
    localStorage.setItem('selectedBusinessId', selectedBusinessId.toString());
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
}