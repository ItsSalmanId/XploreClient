import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-how-it-works',
    templateUrl: './how-it-works.component.html',
    styleUrls: ['./how-it-works.component.scss']
})
export class HowItWorksComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    sectionTitle = [
        {
            title: 'How It Works',
            paragraph: 'Finding and booking a place on xploradoor is simple and straightforward. Follow these easy steps to get started:'
        }
    ]
    howItWorksBox = [
        {
            icon: 'flaticon-placeholder',
            title: 'Find Interesting Place',
            paragraph: 'Browse our diverse listings using filters to easily and quickly find the perfect spot for you. Lets go!'
        },
        {
            icon: 'flaticon-support-1',
            title: 'Contact a Few Owners',
            paragraph: 'Reach out to property owners through our platform to ask questions and get more details.'
        },
        {
            icon: 'flaticon-tick',
            title: 'Make a Reservation',
            paragraph: 'Book your chosen place securely and manage your reservations through your account.'
        }
    ]

}