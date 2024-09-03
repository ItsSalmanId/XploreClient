import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SurveyAutomation, SurveyQuestions, SurveyLink, NavigationAndToggle, UserAccount } from "../../../models/login/login.model";
import { AccountService } from '../../../services/login/login.service';
import { AccountTestService } from '../../../services/loginTest/loginTest.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonCall } from '../../../components/common/commonCall/commonCall.component';


@Component({
  selector: 'app-dashboard-sidemenu',
  templateUrl: './dashboard-sidemenu.component.html',
  styleUrls: ['./dashboard-sidemenu.component.scss']
})
export class DashboardSidemenuComponent implements AfterViewInit  {
  userAccount: UserAccount;
  classApplied = false;
  IsLoginAdmin: boolean;
  IsLoginBusinessOwner: boolean;
  // @ViewChild(CommonCall) childComponent!: CommonCall;
  @ViewChild(CommonCall, { static: false }) childComponent!: CommonCall;



  constructor(private router: Router, private _accountServiceService: AccountService, 
    private toastr: ToastrService, private _accountTestService: AccountTestService) { 
    this.userAccount = new UserAccount();
  }

  ngOnInit(): void {
    this.validateUser();
  }

  ngAfterViewInit() {
    if (this.childComponent) {
      this.childComponent.userToken();
    }
  }
  userToken()
    {
console.log("click on login");
this.userAccount.APPLICATION_USER_ACCOUNTS_ID = Number(localStorage.getItem("Temp"));
if (this.userAccount) {
    //this._spinner.show();
    this._accountServiceService.validateUser(this.userAccount).subscribe(
        response => {
            this.userAccount = response
            if(this.userAccount.ACCOUNT_TYPE == "Admin")
            {
              this.IsLoginAdmin = true;
            }
            if(this.userAccount.ACCOUNT_TYPE == "Business Account")
              {
                this.IsLoginBusinessOwner = true;
              }
              if(this.userAccount.ACCOUNT_TYPE == "User")
                {
                  this.IsLoginAdmin = true;
                }

            
          
           // this._spinner.hide();
           //this.ShowToast("Alert", response.Message, response.success);
           //this.toastr.success(response.Message, 'Toastr fun!');
        //    this.ShowToast("Xplore", response.Message, response.Success);
        //    if(response.Success)
        //    {
        //     this.currentTab = 'tab1';
        //    }
        });
}


    }

  validateUser()
    {
console.log("click on login");
this.userAccount.APPLICATION_USER_ACCOUNTS_ID = Number(localStorage.getItem("Temp"));
if (this.userAccount) {
    //this._spinner.show();
    this._accountServiceService.validateUser(this.userAccount).subscribe(
        response => {
            this.userAccount = response
            if(this.userAccount.ACCOUNT_TYPE == "Admin")
            {
              this.IsLoginAdmin = true;
            }
            if(this.userAccount.ACCOUNT_TYPE == "Business Account")
              {
                this.IsLoginBusinessOwner = true;
              }
              if(this.userAccount.ACCOUNT_TYPE == "User")
                {
                  this.IsLoginAdmin = true;
                }

            
          
           // this._spinner.hide();
           //this.ShowToast("Alert", response.Message, response.success);
           //this.toastr.success(response.Message, 'Toastr fun!');
        //    this.ShowToast("Xplore", response.Message, response.Success);
        //    if(response.Success)
        //    {
        //     this.currentTab = 'tab1';
        //    }
        });
}


    }

  toggleClass() {
    this.classApplied = !this.classApplied;
  }
}
