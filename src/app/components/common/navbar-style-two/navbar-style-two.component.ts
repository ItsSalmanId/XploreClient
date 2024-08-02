import { Component, OnInit, HostListener } from '@angular/core';

@Component({
    selector: 'app-navbar-style-two',
    templateUrl: './navbar-style-two.component.html',
    styleUrls: ['./navbar-style-two.component.scss']
})
export class NavbarStyleTwoComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {}

    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }

    // Navbar Sticky
    isSticky: boolean = false;
    @HostListener('window:scroll', ['$event'])
    checkScroll() {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (scrollPosition >= 50) {
            this.isSticky = true;
        } else {
            this.isSticky = false;
        }
    }

    // Signin/Signup Popup
    isSigninSignupOpen = false;
    openSigninSignupPopup(): void {
        this.isSigninSignupOpen = true;
    }
    closeSigninSignupPopup(): void {
        this.isSigninSignupOpen = false;
    }

    // Signin/Signup Tabs
    currentTab = 'tab1';
    switchTab(event: MouseEvent, tab: string) {
        event.preventDefault();
        this.currentTab = tab;
    }

}