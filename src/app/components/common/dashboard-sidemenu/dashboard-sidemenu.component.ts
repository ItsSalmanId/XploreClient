import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dashboard-sidemenu',
    templateUrl: './dashboard-sidemenu.component.html',
    styleUrls: ['./dashboard-sidemenu.component.scss']
})
export class DashboardSidemenuComponent implements OnInit {

    classApplied = false;
    constructor() { }

    ngOnInit(): void {

    }
    toggleClass() {
        this.classApplied = !this.classApplied;
    }

}