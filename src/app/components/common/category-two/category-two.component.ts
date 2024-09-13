import { Component, OnInit } from '@angular/core';
import { AddBusinessService } from '../../../services/AddBusiness/AddBusiness.service'
import { BusinessDetail, BusinessBlogDetail, BusinessCategoryList } from "../../../models/AddBusiness/AddBusiness.model";

@Component({
    selector: 'app-category-two',
    templateUrl: './category-two.component.html',
    styleUrls: ['./category-two.component.scss']
})
export class CategorytwoComponent implements OnInit {
    businessDetail: BusinessDetail;
    businessDetailsList: BusinessDetail[] = [];
    businessCategoryList: BusinessCategoryList[] = [];
    

    constructor(private _addBusinessService: AddBusinessService) {
        this.businessDetail = new BusinessDetail();
        this.businessDetailsList = [];
        this.businessCategoryList = [];
     }

    ngOnInit(): void {
        this.getBusinessByCategory();
    }
    selectCatogory(selectedCatogory: string = "")
    {
        localStorage.setItem('selectedCatogory', selectedCatogory);
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
                    for (let singleCategoryBox of this.singleCategoryBox) {
                        // Inner loop: iterate through businessCategoryList
                        for (let businessCategory of this.businessCategoryList) {
                          // Check if the title matches the BUSINESS_CATEGORY
                          if (singleCategoryBox.title === businessCategory.BUSINESS_CATEGORY) {
                            // Update the numberOfPlaces with the count from businessCategoryList
                            singleCategoryBox.count = businessCategory.CategoryCount;
                            break; // Break the inner loop once the match is found to optimize performance
                          }
                        }
                      }
                 
                });
        }

  }

    sectionTitle = [
        {
            title: 'Browse Businesses by Category',
            paragraph: 'Discover the best businesses tailored to your needs by exploring our categories. Whether you are looking for restaurants, shopping, fitness centers, or more, our platform makes it easy to find exactly what youre looking for. '
        }
    ]
    singleCategoryBox = [
        {
            icon: 'flaticon-cooking',
            title: 'Restaurants',
            numberOfPlaces: ' Places',
            link: 'grid-listings-left-sidebar',
            count: 0
        },
        {
            icon: 'flaticon-hotel',
            title: 'Hotel',
            numberOfPlaces: ' Places',
            link: 'grid-listings-left-sidebar',
            count: 0
        },
        {
            icon: 'flaticon-exercise',
            title: 'Fitness',
            numberOfPlaces: ' Places',
            link: 'grid-listings-left-sidebar',
            count: 0
        },
        {
            icon: 'flaticon-commerce',
            title: 'Shopping',
            numberOfPlaces: ' Places',
            link: 'grid-listings-left-sidebar',
            count: 0
        },
        {
            icon: 'flaticon-cleansing',
            title: 'Beauty & Spa',
            numberOfPlaces: ' Places',
            link: 'grid-listings-left-sidebar',
            count: 0
        },
        {
            icon: 'flaticon-calendar',
            title: 'Events',
            numberOfPlaces: ' Places',
            link: 'grid-listings-left-sidebar',
            count: 0
        },
        {
            icon: 'flaticon-heart-1',
            title: 'Health Care',
            numberOfPlaces: ' Places',
            link: 'grid-listings-left-sidebar',
            count: 0
        },
        {
            icon: 'flaticon-airport',
            title: 'Travel & Public',
            numberOfPlaces: ' Places',
            link: 'grid-listings-left-sidebar',
            count: 0
        },
        {
            icon: 'flaticon-car-insurance',
            title: 'Auto Insurance',
            numberOfPlaces: ' Places',
            link: 'grid-listings-left-sidebar'
            ,count: 0
        },
        {
            icon: 'flaticon-attorney',
            title: 'Attorneys',
            numberOfPlaces: ' Places',
            link: 'grid-listings-left-sidebar'
            ,count: 0
        },
        {
            icon: 'flaticon-plumber',
            title: 'Plumbers',
            numberOfPlaces: ' Places',
            link: 'grid-listings-left-sidebar'
            ,count: 0
        },
        {
            icon: 'flaticon-more-1',
            title: 'More Categories',
            link: 'grid-listings-left-sidebar'
            ,count: 0
        }
    ]

}