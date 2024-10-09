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

    constructor(
        private _commonCallsService: CommonCallsService
        ) { }

    ngOnInit(): void {
        
        this.userName = localStorage.getItem('UserName');
        this.userEmail = localStorage.getItem('UserEmail');
    }
    Logout()
    {
     //this._commonCall.logout();
     this._commonCallsService.logout();
    }
    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }

    classApplied2 = false;
    toggleClass2() {
        this.classApplied2 = !this.classApplied2;
    }

}