import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-products-details',
    templateUrl: './products-details.component.html',
    styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {}
    
    pageTitleContent = [
        {
            title: 'Products Details',
            backgroundImage: 'assets/img/page-title/page-title4.jpg'
        }
    ]

    // Tabs
    currentTab = 'tab1';
    switchTab(event: MouseEvent, tab: string) {
        event.preventDefault();
        this.currentTab = tab;
    }

}