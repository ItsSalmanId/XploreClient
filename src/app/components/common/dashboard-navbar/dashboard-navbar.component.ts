import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonCall } from '../../../components/common/commonCall/commonCall.component';
import { CommonCallsService } from '../../../services/common-call/common-call.service';

@Component({
    selector: 'app-dashboard-navbar',
    templateUrl: './dashboard-navbar.component.html',
    styleUrls: ['./dashboard-navbar.component.scss']
})
export class DashboardNavbarComponent implements OnInit {
    userName: string;
    userEmail: string;
    profilePicture: string;

    constructor(
        private _commonCallsService: CommonCallsService
        ) { }

    ngOnInit(): void {
        
        this.userName = localStorage.getItem('UserName');
        this.userEmail = localStorage.getItem('UserEmail');
        this.profilePicture = localStorage.getItem('ProfilePicture');
        
    }
    wishlist()
    {
        localStorage.setItem('myPost', "false" );
    }
    myPost()
    {
        localStorage.setItem('myPost', "true" );
    }
    Logout()
    {
     //this._commonCall.logout();
     this._commonCallsService.logout();
    }
    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
        this.classApplied2 = !this.classApplied2;
    }

    classApplied2 = false;
    toggleClass2() {
        this.classApplied2 = !this.classApplied2;
    }

}