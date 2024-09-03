// import { Component, OnInit } from '@angular/core';
// import { OwlOptions } from 'ngx-owl-carousel-o';

// @Component({
//   selector: 'app-events-details',
//   templateUrl: './events-details.component.html',
//   styleUrls: ['./events-details.component.scss']
// })
// export class EventsDetailsComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {}

//   storyOptions: OwlOptions = {
//     loop: true,
//     nav: true,
//     dots: false,
//     center: true,
//     items: 3,
//     margin: 70,
//     navText: [
//       "<i class='flaticon-left-chevron'></i>",
//       "<i class='flaticon-right-chevron'></i>"
//     ],
//     responsive: {
//         0: {
//             items: 1, // Display only one item for devices with a width of 0 to 425 pixels
//             center: true,
//             nav:false,
//         },
//         426: {
//             items: 3, // Display three items for devices with a width above 425 pixels
//         }
//     }
// };


//   carouselItems = [
//     {
//       background: "../../../../assets/img/blog/blog1.jpg",
//       profile: '../../../../assets/img/profile1.jpg',
//       name: 'John Doe'
//     },
//     {
//       background: "../../../../assets/img/blog/blog1.jpg",
//       profile: '../../../../assets/img/profile1.jpg',
//       name: 'John Doe'
//     },
//     {
//       background: "../../../../assets/img/blog/blog1.jpg",
//       profile: '../../../../assets/img/profile1.jpg',
//       name: 'John Doe'
//     },
//     {
//       background: "../../../../assets/img/blog/blog1.jpg",
//       profile: '../../../../assets/img/profile1.jpg',
//       name: 'John Doe'
//     },
//     {
//       background: "../../../../assets/img/blog/blog1.jpg",
//       profile: '../../../../assets/img/profile2.jpg',
//       name: 'Jane Smith'
//     },
//     {
//       background: "../../../../assets/img/blog/blog1.jpg",
//       profile: '../../../../assets/img/profile3.jpg',
//       name: 'Alice Johnson'
//     }
//   ];
// }
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-events-details',
  templateUrl: './events-details.component.html',
  styleUrls: ['./events-details.component.scss']
})
export class EventsDetailsComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
        this.resetOption = [this.options[0]];
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
        dots: false,
        autoplayHoverPause: false,
        autoplay: false,
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