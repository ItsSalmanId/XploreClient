import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/AuthService/AuthService.service'
import { SurveyAutomation, SurveyQuestions, SurveyLink, NavigationAndToggle, UserAccount } from "../../../../models/login/login.model";
import { AccountService } from '../../../../services/login/login.service';
import { AccountTestService } from '../../../../services/loginTest/loginTest.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard-my-profile',
    templateUrl: './dashboard-my-profile.component.html',
    styleUrls: ['./dashboard-my-profile.component.scss']
})
export class DashboardMyProfileComponent implements OnInit {
    username: string = '';
    password: string = '';
    userAccount: UserAccount;
    isDisableRegisterBtn: boolean;
    errorRegisterUserName: any = { isError: false, errorMessage: "" };
    errorEmail: any = { isError: false, errorMessage: "" };
    errorPassword: any = { isError: false, errorMessage: "" };
    errorConfirmPassword: any = { isError: false, errorMessage: "" };
    errorUserNameEmail: any = { isError: false, errorMessage: "" };
    errorLoginPassword: any = { isError: false, errorMessage: "" };
    isLoading: boolean;
    userAccountDetails: UserAccount;

    showPassword: boolean = false;
  showVerifyPassword: boolean = false;
  passwordMismatch: boolean = false;
    

    constructor(private router: Router, private authService: AuthService, private _accountServiceService: AccountService, private toastr: ToastrService, private _accountTestService: AccountTestService ) { 
        this.userAccount = new UserAccount();
        this.isDisableRegisterBtn = false;    
    }

    ngOnInit(): void {
        this.GetUserDetails();
    }

    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
      }
    
      toggleVerifyPasswordVisibility() {
        this.showVerifyPassword = !this.showVerifyPassword;
      }
// Watch for changes in both password fields
ngDoCheck() {
    this.passwordMismatch = this.userAccountDetails.NEW_PASSWORD !== 
    this.userAccountDetails.CONFIRM_PASSWORD;
  }
    saveUserDetails()
    {

        this.isLoading = true;
console.log("click on login");
        //this.userAccount.APPLICATION_USER_ACCOUNTS_ID = Number(localStorage.getItem('Temp'));
if (this.userAccountDetails) {
    //this._spinner.show();
    this._accountServiceService.saveUserDetails(this.userAccountDetails).subscribe(
        response => {
            this.isLoading = false;
            if(response != null)
            {
                this.userAccountDetails = response;
                console.log(this.userAccountDetails);
                //localStorage.setItem('Temp', this.userAccount.APPLICATION_USER_ACCOUNTS_ID.toString());
                //this.login();
            }
            else
            {
                //this.ShowToast("Xplore", "The username or password is incorrect.", false);
            }

        });
}


    }
    
    GetUserDetails()
    {

        this.isLoading = true;
console.log("click on login");
        this.userAccount.APPLICATION_USER_ACCOUNTS_ID = Number(localStorage.getItem('Temp'));
if (this.userAccount) {
    //this._spinner.show();
    this._accountServiceService.getUserDetails(this.userAccount).subscribe(
        response => {
            this.isLoading = false;
            if(response != null)
            {
                this.userAccountDetails = response;
                console.log(this.userAccountDetails);
                //localStorage.setItem('Temp', this.userAccount.APPLICATION_USER_ACCOUNTS_ID.toString());
                //this.login();
            }
            else
            {
                //this.ShowToast("Xplore", "The username or password is incorrect.", false);
            }

        });
}


    }


    breadcrumb = [
        {
            title: 'My Profile',
            subTitle: 'Dashboard'
        }
    ]

}