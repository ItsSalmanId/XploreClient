import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AddBusinessService } from '../../../../services/AddBusiness/AddBusiness.service'
import { BusinessDetail, BusinessBlogDetail } from "../../../../models/AddBusiness/AddBusiness.model";


@Component({
    selector: 'app-homeone-blog',
    templateUrl: './homeone-blog.component.html',
    styleUrls: ['./homeone-blog.component.scss']
})
export class HomeoneBlogComponent implements OnInit {

  businessDetail: BusinessDetail;
  businessDetailsList: BusinessDetail[] = [];
  businessBlogDetails: BusinessBlogDetail;
  businessBlogDetailsList: BusinessBlogDetail[] = [];

  constructor(private _addBusinessService: AddBusinessService) {
      this.businessDetail = new BusinessDetail();
      this.businessDetailsList = [];
      this.businessBlogDetails = new BusinessBlogDetail();
      this.businessBlogDetailsList = [];
   }

    ngOnInit(): void {
      this.getBlogsDetails();
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

    singleBlogPost = [
        {
            mainImg: 'assets/img/blog/blog1.jpg',
            authorImg: 'assets/img/user1.jpg',
            authorName: 'Taylor',
            date: 'Aug 7, 2024',
            title: '10 Types of Social Proof and What Makes Them Effective',
            link: 'blog-details'
        },
        {
            mainImg: 'assets/img/blog/blog2.jpg',
            authorImg: 'assets/img/user2.jpg',
            authorName: 'Sarah',
            date: 'Aug 6, 2024',
            title: 'Tech Products That Make It Easier to Stay Home',
            link: 'blog-details'
        },
        {
            mainImg: 'assets/img/blog/blog1.jpg',
            authorImg: 'assets/img/user1.jpg',
            authorName: 'Taylor',
            date: 'Aug 7, 2024',
            title: '10 Types of Social Proof and What Makes Them Effective',
            link: 'blog-details'
        },
        {
            mainImg: 'assets/img/blog/blog2.jpg',
            authorImg: 'assets/img/user2.jpg',
            authorName: 'Sarah',
            date: 'Aug 6, 2024',
            title: 'Tech Products That Make It Easier to Stay Home',
            link: 'blog-details'
        }
    ]
    

    blogSlides:  OwlOptions = {
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
            items: 1
          },
          375: {
            items: 1
          },
          600: {
            items: 2
          },
          1000: {
            items: 3
          }
        }
      };

}