import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-feedback-style-one',
    templateUrl: './feedback-style-one.component.html',
    styleUrls: ['./feedback-style-one.component.scss']
})
export class FeedbackStyleOneComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    sectionTitle = [
        {
            title: 'User’s Feedback About Us',
            paragraph: 'Discover what our users have to say about their experiences with our platform. Whether you are listing properties, services, or products, our users feedback highlights the seamless and efficient process of creating and managing listings.'
        }
    ]
    singleFeedbackBox = [
        {
            paragraph: '"Using this platform was a game-changer for my business. Listing my services has never been easier!"',
            authorImg: 'assets/img/user1.jpg',
            authorName: 'John Smith',
            authorDesignation: 'Restaurant Owner',
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
            ]
        },
        {
            paragraph: '"As a buyer, I found exactly what I was looking for. The interface is user-friendly and intuitive."',
            authorImg: 'assets/img/user2.jpg',
            authorName: 'Sarah Taylor',
            authorDesignation: 'Hotel Owner',
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
            ]
        },
        {
            paragraph: '"The support team is always ready to help, ensuring a smooth experience from start to finish."',
            authorImg: 'assets/img/user3.jpg',
            authorName: 'Alex Hales',
            authorDesignation: 'Developer',
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
            ]
        },
        {
            paragraph: '"Listing my products was a breeze. The process is straightforward and efficient."',
            authorImg: 'assets/img/user4.jpg',
            authorName: 'Andy James',
            authorDesignation: 'Traveler',
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
                    icon: 'bx bxs-star-half'
                },
                {
                    icon: 'bx bx-star'
                }
            ]
        }
    ]

    customOptions: OwlOptions = {
        loop: true,
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
            768: {
                items: 2,
            },
            1200: {
                items: 3,
            }
        },
    }

}