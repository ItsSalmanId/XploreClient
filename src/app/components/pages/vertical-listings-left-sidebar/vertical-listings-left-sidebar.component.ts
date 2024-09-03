import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AddBusinessService } from '../../../services/AddBusiness/AddBusiness.service'
import { BusinessDetail, BusinessBlogDetail, BusinessFilters } from "../../../models/AddBusiness/AddBusiness.model";

@Component({
    selector: 'app-vertical-listings-left-sidebar',
    templateUrl: './vertical-listings-left-sidebar.component.html',
    styleUrls: ['./vertical-listings-left-sidebar.component.scss']
})
export class VerticalListingsLeftSidebarComponent implements OnChanges {

    businessDetail: BusinessDetail;
    businessDetailsList: BusinessDetail[] = [];
    businessBlogDetails: BusinessBlogDetail;
    businessBlogDetailsList: BusinessBlogDetail[] = [];
    listCount: number;
    isChecked: boolean;
    businessFilteredList: BusinessDetail[];
    businessFilters: BusinessFilters; 
    businessFilteredListTemp: any[];
    @Input() value: number;
    

    constructor(private _addBusinessService: AddBusinessService) {
        this.businessDetail = new BusinessDetail();
        this.businessDetailsList = [];
        this.businessBlogDetails = new BusinessBlogDetail();
        this.businessBlogDetailsList = [];
        this.isChecked = false;
        this.businessFilters = new BusinessFilters();
     }

    ngOnInit(): void {
        this.resetOption = [this.options[0]];
        this.getBusiness();
    }
    ngOnChanges(changes: SimpleChanges) {
        if (changes['value']) {
          this.callSpecificFunction();
        }
      }
    
      callSpecificFunction() {
        console.log('Specific function called because the value changed.');
        // Yahan aap apna desired function ya logic likh sakte hain
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
    singleListingsItem = [
        {
            mainImg: 'assets/img/listings/listings9.jpg',
            categoryLink: 'single-listings',
            bookmarkLink: 'single-listings',
            category: 'Restaurant',
            location: 'New York, USA',
            title: 'The Mad Made Grill',
            price: 'Start From: $121',
            detailsLink: 'single-listings',
            authorImg: 'assets/img/user3.jpg',
            authorName: 'James',
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
            ratingCount: '18'
        },
        {
            mainImg: 'assets/img/listings/listings10.jpg',
            categoryLink: 'single-listings',
            bookmarkLink: 'single-listings',
            category: 'Hotel',
            location: 'Los Angeles, USA',
            title: 'The Beverly Hills Hotel',
            price: 'Start From: $200',
            detailsLink: 'single-listings',
            authorImg: 'assets/img/user2.jpg',
            authorName: 'Sarah',
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
            ratingCount: '10'
        },
        {
            mainImg: 'assets/img/listings/listings11.jpg',
            categoryLink: 'single-listings',
            bookmarkLink: 'single-listings',
            category: 'Shopping',
            location: 'Seattle, USA',
            title: 'Blue Water Shopping City',
            price: 'Start From: $500',
            detailsLink: 'single-listings',
            authorImg: 'assets/img/user5.jpg',
            authorName: 'Lina',
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
            ratingCount: '55'
        },
        {
            mainImg: 'assets/img/listings/listings12.jpg',
            categoryLink: 'single-listings',
            bookmarkLink: 'single-listings',
            category: 'Restaurant',
            location: 'New York, USA',
            title: 'Chipotle Mexican Grill',
            price: 'Start From: $150',
            detailsLink: 'single-listings',
            authorImg: 'assets/img/user1.jpg',
            authorName: 'Taylor',
            openORclose: 'Close Now',
            extraClass: 'status-close',
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
            mainImg: 'assets/img/listings/listings17.jpg',
            categoryLink: 'single-listings',
            bookmarkLink: 'single-listings',
            category: 'Restaurant',
            location: 'New York, USA',
            title: 'Thai Me Up Restaurant',
            price: 'Start From: $150',
            detailsLink: 'single-listings',
            authorImg: 'assets/img/user2.jpg',
            authorName: 'Sarah',
            openORclose: 'Close Now',
            extraClass: 'status-close',
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
            mainImg: 'assets/img/listings/listings16.jpg',
            categoryLink: 'single-listings',
            bookmarkLink: 'single-listings',
            category: 'Shopping',
            location: 'Seattle, USA',
            title: 'Skyview Shopping Complex',
            price: 'Start From: $500',
            detailsLink: 'single-listings',
            authorImg: 'assets/img/user5.jpg',
            authorName: 'Lina',
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
            ratingCount: '55'
        }
    ]

    verticalListings: number = 1;

}