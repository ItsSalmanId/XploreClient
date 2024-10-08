import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonCall } from '../../../components/common/commonCall/commonCall.component';
import { CommonCallsService } from '../../../services/common-call/common-call.service';

@Component({
    selector: 'app-dashboard-navbar',
    templateUrl: './dashboard-navbar.component.html',
    styleUrls: ['./dashboard-navbar.component.scss']
})
export class DashboardNavbarComponent implements OnInit {

    constructor(
        private _commonCallsService: CommonCallsService
        ) { }

    ngOnInit(): void {}
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