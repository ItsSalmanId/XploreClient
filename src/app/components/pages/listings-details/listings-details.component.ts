import { Component, OnInit, ViewChild  } from '@angular/core';
import { AddBusinessService } from '../../../services/AddBusiness/AddBusiness.service'
import { BusinessDetail, BusinessFilesDetailList, TimeSlots, BusinessDetailCountList, BusinessRating } from "../../../models/AddBusiness/AddBusiness.model";
import { Observable } from 'rxjs';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DropzoneConfig } from 'ngx-dropzone-wrapper';
import { GlobalSettingService } from '../../../services/Global/global-setting.service';
import { GenericUtility } from '../../../utilities/generic-utility';
//declare var $: any;
import Dropzone from 'dropzone';
import { OwlOptions } from 'ngx-owl-carousel-o';
import * as $ from 'jquery'; // Import jQuery
import { Router } from '@angular/router';
import { VerticalListingsLeftSidebarComponent } from '../../../components/pages/vertical-listings-left-sidebar/vertical-listings-left-sidebar.component';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';


@Component({
    selector: 'app-listings-details',
    templateUrl: './listings-details.component.html',
    styleUrls: ['./listings-details.component.scss']
})
export class ListingsDetailsComponent implements OnInit {

    center: google.maps.LatLngLiteral = { lat: 36.7783, lng: 119.4179 }; // Example coordinates for Karachi
    zoom = 15; // Zoom level for map
    // label = {
    //   color: 'blue',
    //   text: 'Your Place Name'
    // };
    options: google.maps.MapOptions = {
      disableDefaultUI: true, // Disable default controls
      fullscreenControl: true, // Allow fullscreen mode
    };



    label = '';
  infoWindowVisible = false;

//   hotel = {
//     name: 'Serena Hotel Islamabad',
//     rating: '4.5',
//     address: 'Khayaban-e-Suhrwardy, Islamabad, Pakistan'
//   };
hotel: any = {};
    restaurantPosition: google.maps.LatLngLiteral = { lat: 33.7153, lng: 73.1021 }; // Aapka restaurant ka location
    

    apiKey: string = 'AIzaSyDMbS_znmP26X5P1guVyFxUI_6LXKVhQw4'; // Google API key
  address: string = 'serena hotel islamabad'; // Input address
  latitude: number;
  longitude: number;

  //private apiKey = 'YOUR_API_KEY'; // Replace with your Google Places API key
   placeId = '';
    
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
    selectedBusinessReviews: any;
    LatLng: any;
    


    constructor(private http: HttpClient, private _addBusinessService: AddBusinessService, 
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

        this.LatLng = [
            { latitude: 40.6782, longitude: -73.9442 },
            { latitude: 40.6795, longitude: -73.9415 },
            { latitude: 40.6808, longitude: -73.9463 },
            { latitude: 40.6820, longitude: -73.9427 },
            { latitude: 40.6767, longitude: -73.9489 },
            { latitude: 40.6753, longitude: -73.9450 },
            { latitude: 40.6779, longitude: -73.9430 },
            { latitude: 40.6811, longitude: -73.9475 },
            { latitude: 40.6800, longitude: -73.9444 },
            { latitude: 40.6790, longitude: -73.9490 }
          ];
        
        
        }

    ngOnInit(): void {
        let isCallFromNavBar = localStorage.getItem("isCallFromNavBar");
        if(isCallFromNavBar == 'true')
        {
            this.currentTab = 'tab6';
            localStorage.removeItem('isCallFromNavBar');
        }
        let isCallFromVerticalleft = localStorage.getItem("isCallFromVertical-left");
        if(isCallFromVerticalleft == 'true')
        {
            this.currentTab = 'tab1';
            localStorage.removeItem('isCallFromVertical-left');
        }
        this.getBusiness();
        this.getBusinessList();
        this.getBusinessRating();
        this.saveBussinessCount();
        this.geocodeAddressTest("Brooklyn, New York");

        //this.onMarkerClick()
    }
    // Geocode the address to get latitude and longitude
  geocodeAddress(address: string) {
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results[0]) {
        // Set the map center to the coordinates returned by the Geocoder
        const location = results[0].geometry.location;
        this.center = {
          lat: location.lat(),
          lng: location.lng()
        };
      } else {
        console.error('Geocode was not successful for the following reason: ' + status);
      }
    });
  }


 calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const toRadians = (degrees: number) => degrees * (Math.PI / 180);
    const earthRadiusKm = 6371; // Radius of Earth in kilometers
  
    const dLat = toRadians(lat2 - lat1);
    const dLng = toRadians(lng2 - lng1);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return earthRadiusKm * c; // Distance in kilometers
  }
  

  geocodeAddressTest(address: string) {
    const geocoder = new google.maps.Geocoder();
  
    geocoder.geocode({ address }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results[0]) {
        const location = results[0].geometry.location;
        const currentLocation = {
          latitude: location.lat(),
          longitude: location.lng()
        };
  
        // Calculate distances to all locations in brooklynNearbyLocations
        const distances = this.LatLng.map((loc) => ({
          ...loc,
          distance: this.calculateDistance(currentLocation.latitude, currentLocation.longitude, loc.latitude, loc.longitude)
        }));
  
        // Sort locations by distance and get the top 3 closest locations
        const top3Closest = distances.sort((a, b) => a.distance - b.distance).slice(0, 3);
  
        console.log("Top 3 closest locations:", top3Closest);
      } else {
        console.error('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
    fetchHotelDetails() {
        this.geocodeAddress('Margalla Town Phase 1 DSF Park')
        const lat = this.center.lat;
        const lng = this.center.lng;
    
        // Fetch place details using Places API
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=restaurant&key=${this.apiKey}`;
    
        this.http.get<any>(url).subscribe(response => {
          if (response.results.length > 0) {
            const place = response.results[0]; // Get the first result
            this.hotel = {
              name: place.name,
              rating: place.rating,
              address: place.vicinity
            };
            this.placeId = place.place_id; // Save place ID if needed
          }
        });
      }
    
      toggleInfoWindow() {
        this.infoWindowVisible = !this.infoWindowVisible; // Toggle info window visibility
      }
    
      closeInfoWindow() {
        this.infoWindowVisible = false; // Close the info window
      }
    onMarkerClick() {
        const destination = `${this.restaurantPosition.lat},${this.restaurantPosition.lng}`;
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}`, '_blank');
      }

      getCoordinates() {
        this.geocodeAddress('writers colony multan')
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(this.address)}&key=${this.apiKey}`;
        
        this.http.get(url).subscribe((response: any) => {
          if (response.status === 'OK' && response.results.length > 0) {
            const location = response.results[0].geometry.location;
            this.latitude = location.lat;
            this.longitude = location.lng;
            console.log('Latitude:', this.latitude, 'Longitude:', this.longitude);
          } else {
            console.error('Geocoding failed:', response.status);
          }
        });
      }
    onTabChange(newTab: string) {
        this.currentTab = newTab;
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
        this.isLoading = true;
        let selectedBusinessId = localStorage.getItem("selectedBusinessId");
        console.log(this.businessDetail);
        this.businessDetail.BUSINESS_DETAIL_ID = Number(selectedBusinessId);


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
                    this.geocodeAddress(this.businessDetail.BUSINESS_ADDRESS);
                    
                   // this._spinner.hide();
                   //this.ShowToast("Alert", response.Message, response.success);
                   //this.toastr.success(response.Message, 'Toastr fun!');
                   //this.ShowToast("Xplore", response.Message, response.Success);
                 
                });
        }
    }
    saveBussinessCount()
    {
        
        this.isLoading = true;
        let selectedBusinessId = localStorage.getItem("selectedBusinessId");
        console.log(this.businessDetail);
        this.businessRating.BUSINESS_ID = this.businessDetail.BUSINESS_DETAIL_ID = Number(selectedBusinessId);
        this.businessDetail.EMAIL_ADDRESS = "itssalmanid@gmail.com";
        this.businessDetail.USER_ID = Number(localStorage.getItem("Temp"));
        this.isLoading = true;
        if (this.businessDetail) {
            //this.businessDetail.uploadedFilesName = this.uploadedFilesName;
            //this._spinner.show();
            this._addBusinessService.addBusinessReviews(this.businessDetail).subscribe(
                response => {
                  this.isLoading = false;
                  this.selectedBusinessReviews =  response.Message
                    //this.ShowToast("Xplore", "Your business has been successfully added.", true);
                    //this.router.navigate(['/dashboard-my-listings']);
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
const hotelSummary = this.getCategorySummary("Hotel");
const fitnessSummary = this.getCategorySummary("Fitness");
const shoppingSummary = this.getCategorySummary("Shopping");
const beautySpaSummary = this.getCategorySummary("Beauty & Spa");
const eventsSummary = this.getCategorySummary("Events");
const healthCareSummary = this.getCategorySummary("Health Care");
const travelPublicSummary = this.getCategorySummary("Travel & Public");
const autoInsuranceSummary = this.getCategorySummary("Attorneys");
const attorneysSummary = this.getCategorySummary("Hotel");
const plumbersSummary = this.getCategorySummary("Plumbers");
const summaries: BusinessDetailCountList[] = [
    restaurantSummary,
    homeServiceSummary,
    agencySummary,
    hotelSummary,
    fitnessSummary,
    shoppingSummary,
    beautySpaSummary,
    eventsSummary,
    healthCareSummary,
    travelPublicSummary,
    autoInsuranceSummary,
    attorneysSummary,
    plumbersSummary
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

    singleCategoryBox = [
        {
            icon: 'flaticon-cooking',
            title: 'Restaurant',
            numberOfPlaces: '16 Places',
            link: 'grid-listings-left-sidebar'
        },
        {
            icon: 'flaticon-hotel',
            title: 'Hotel',
            numberOfPlaces: '42 Places',
            link: 'grid-listings-left-sidebar'
        },
        {
            icon: 'flaticon-exercise',
            title: 'Fitness',
            numberOfPlaces: '11 Places',
            link: 'grid-listings-left-sidebar'
        },
        {
            icon: 'flaticon-commerce',
            title: 'Shopping',
            numberOfPlaces: '24 Places',
            link: 'grid-listings-left-sidebar'
        },
        {
            icon: 'flaticon-cleansing',
            title: 'Beauty & Spa',
            numberOfPlaces: '8 Places',
            link: 'grid-listings-left-sidebar'
        },
        {
            icon: 'flaticon-calendar',
            title: 'Events',
            numberOfPlaces: '12 Places',
            link: 'grid-listings-left-sidebar'
        },
        {
            icon: 'flaticon-heart-1',
            title: 'Health Care',
            numberOfPlaces: '16 Places',
            link: 'grid-listings-left-sidebar'
        },
        {
            icon: 'flaticon-airport',
            title: 'Travel & Public',
            numberOfPlaces: '8 Places',
            link: 'grid-listings-left-sidebar'
        },
        {
            icon: 'flaticon-car-insurance',
            title: 'Auto Insurance',
            numberOfPlaces: '10 Places',
            link: 'grid-listings-left-sidebar'
        },
        {
            icon: 'flaticon-attorney',
            title: 'Attorneys',
            numberOfPlaces: '25 Places',
            link: 'grid-listings-left-sidebar'
        },
        {
            icon: 'flaticon-plumber',
            title: 'Plumbers',
            numberOfPlaces: '5 Places',
            link: 'grid-listings-left-sidebar'
        },
       
    ]

    singleListingsBox = [
        {
            mainImg: [
                {
                    img: 'assets/img/listings/listings7.jpg'
                }
            ],
            categoryLink: 'single-listings',
            category: 'Restaurant',
            bookmarkLink: 'single-listings',
            location: 'Francisco, USA',
            title: 'The Mad Made Grill',
            price: 'Start From: $121',
            detailsLink: 'single-listings',
            authorImg: 'assets/img/user1.jpg',
            openORclose: 'Open Now',
            extraClass: 'status-open',
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
                    icon: 'bx bxs-star'
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
        }
    ]

    galleryOptions: OwlOptions = {
		loop: true,
		nav: true,
		dots: false,
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
			576: {
				items: 2,
			},
			768: {
				items: 4,
			},
			992: {
				items: 4,
			}
		}
    }
    singleImageBox = [
        {
            img: 'assets/img/gallery/gallery1.jpg'
        },
        {
            img: 'assets/img/gallery/gallery2.jpg'
        },
        {
            img: 'assets/img/gallery/gallery3.jpg'
        },
        {
            img: 'assets/img/gallery/gallery4.jpg'
        },
        {
            img: 'assets/img/gallery/gallery5.jpg'
        }
    ]

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

    // Tabs
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

}