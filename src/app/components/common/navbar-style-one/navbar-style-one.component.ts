import { Component, OnInit, HostListener } from '@angular/core';
//import { CommonService } from '../../../services/common-service/common.service';
import { SurveyAutomation, SurveyQuestions, SurveyLink, NavigationAndToggle, UserAccount } from "../../../models/login/login.model";
import { AccountService } from '../../../services/login/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonCallsService } from '../../../services/common-call/common-call.service';


@Component({
    selector: 'app-navbar-style-one',
    templateUrl: './navbar-style-one.component.html',
    styleUrls: ['./navbar-style-one.component.scss']
})
export class NavbarStyleOneComponent implements OnInit {

    surveyLink: SurveyLink;
    userAccount: UserAccount;
    isDisableRegisterBtn: boolean;
    errorRegisterUserName: any = { isError: false, errorMessage: "" };
    errorEmail: any = { isError: false, errorMessage: "" };
    errorPassword: any = { isError: false, errorMessage: "" };
    errorConfirmPassword: any = { isError: false, errorMessage: "" };
    errorUserNameEmail: any = { isError: false, errorMessage: "" };
    errorLoginPassword: any = { isError: false, errorMessage: "" };
    accountType: string;
    userName: string;
    userEmail: string;
    isPublicUser: boolean;
    checkInterval: any;
    profilePicture: string;
    

    constructor(private _commonCallsService: CommonCallsService, private router: Router, private _accountServiceService: AccountService, private toastr: ToastrService) { 
   this.surveyLink = new SurveyLink();
   this.userAccount = new UserAccount();
   this.isDisableRegisterBtn = false;

    }

    ngOnInit(): void {
        this.checkInterval = setInterval(() => {
            this.checkAccountType();
          }, 1000);
        this.surveyLink.ENCRYPTED_PATIENT_ACCOUNT = "123456";
         this.accountType = localStorage.getItem('ACCOUNT_TYPE');
         this.userName = localStorage.getItem('UserName');
        this.userEmail = localStorage.getItem('UserEmail');
        this.profilePicture = localStorage.getItem('ProfilePicture');

    }

    ngOnDestroy(): void {
        // Clear the interval when the component is destroyed
        if (this.checkInterval) {
          clearInterval(this.checkInterval);
        }
      }
    checkAccountType(): void {
        // Get the value from localStorage and update userAccount
        this.userAccount.APPLICATION_USER_ACCOUNTS_ID = Number(localStorage.getItem('Temp'));
    
        // Check accountType and update isPublicUser
        if (this.userAccount.APPLICATION_USER_ACCOUNTS_ID == 0) {
          this.isPublicUser = true;
        } else {
          this.isPublicUser = false;
        }
      }
    Logout()
    {
     //this._commonCall.logout();
     this._commonCallsService.logout();
    }

    isClickDashboard()
    {
        if(this.accountType == "Admin")
            {
                //localStorage.setItem('ACCOUNT_TYPE', this.userAccount.ACCOUNT_TYPE);
                this.router.navigate(['/dashboard-user-details']);
            }
    }

    isClickBlog()
    {
        this.router.navigate(['/blog-details']);
    }
    myPost()
    {
        localStorage.setItem('myPost', "true" );
    }
    wishlist()
    {
        localStorage.setItem('myPost', "false" );
    }
    isCallFromNavBar()
    {
        localStorage.setItem('isCallFromNavBar', "true" );
    }

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
        //this.isSigninSignupOpen = true;
        //this.router.navigate(['/dashboard-user-details']);
        this.router.navigate(['/products-list']);
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

    Login()
    {
console.log("click on login");

if (this.userAccount) {
    //this._spinner.show();
    this._accountServiceService.loginUser(this.userAccount).subscribe(
        response => {
           // this._spinner.hide();
           //this.ShowToast("Alert", response.Message, response.success);
           //this.toastr.success(response.Message, 'Toastr fun!');
           this.ShowToast("Xplore", response.Message, response.Success);
           if(response.Success)
           {
            this.currentTab = 'tab1';
           }
            if (response && response.ENCRYPTED_PATIENT_ACCOUNT) {
                this.surveyLink = response;
                if (this.surveyLink.ENCRYPTED_PATIENT_ACCOUNT && this.surveyLink.SURVEY_METHOD != 'Link Expire' && this.surveyLink.SURVEY_METHOD != 'SMS Unsubscribe' && this.surveyLink.SURVEY_METHOD != 'Email Unsubscribe') {
                   
                }
            }
        });
}


    }
    
    ShowToast(message: string, title: string, success: boolean) {
        let timeOut: number = success ? 2000 : 4000;
        //let toastOptions: ToastOptions = { title: title, msg: message, timeout: timeOut };
        if (success)
          this.toastr.success(title, message);
        else {
          this.toastr.error(title, message);
        }
      }

    registerNow()
    {
        if(!this.NullCheckFun(this.userAccount.User_Name))
        {
            this.errorRegisterUserName = { isError: true, errorMessage: "Please Provide Username." };
        }
        console.log(this.userAccount);
        console.log("click on RegisterNow");
        if (this.userAccount) {
            //this._spinner.show();
            this._accountServiceService.registerUser(this.userAccount).subscribe(
                response => {
                   // this._spinner.hide();
                   //this.ShowToast("Alert", response.Message, response.success);
                   //this.toastr.success(response.Message, 'Toastr fun!');
                   this.ShowToast("Xplore", response.Message, response.Success);
                   if(response.Success)
                   {
                    this.currentTab = 'tab1';
                   }
                    if (response && response.ENCRYPTED_PATIENT_ACCOUNT) {
                        this.surveyLink = response;
                        if (this.surveyLink.ENCRYPTED_PATIENT_ACCOUNT && this.surveyLink.SURVEY_METHOD != 'Link Expire' && this.surveyLink.SURVEY_METHOD != 'SMS Unsubscribe' && this.surveyLink.SURVEY_METHOD != 'Email Unsubscribe') {
                           
                        }
                    }
                 
                });
        }

        // if (this.surveyLink) {
        //     //this._spinner.show();
        //     this._accountServiceService.decryptionUrl(this.surveyLink).subscribe(
        //         (response: SurveyLink) => {
        //            // this._spinner.hide();
        //             if (response && response.ENCRYPTED_PATIENT_ACCOUNT) {
        //                 this.surveyLink = response;
        //                 if (this.surveyLink.ENCRYPTED_PATIENT_ACCOUNT && this.surveyLink.SURVEY_METHOD != 'Link Expire' && this.surveyLink.SURVEY_METHOD != 'SMS Unsubscribe' && this.surveyLink.SURVEY_METHOD != 'Email Unsubscribe') {
                           
        //                 }
        //             }
                 
        //         });
        // }
    }

    validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }

    //This function is trigger to disable the register button
    disableRegisterBtn()
    {
        if(!this.NullCheckFun(this.userAccount.User_Name))
            {
                this.errorRegisterUserName = { isError: true, errorMessage: "Please Provide Username." };
            }
            else
            {
                this.errorRegisterUserName = { isError: false, errorMessage: "" };
            }

            if(!this.NullCheckFun(this.userAccount.EMAIL_ADDRESS))
                {
                    this.errorEmail = { isError: true, errorMessage: "Please Provide Email." };
                }
                else
                {
                    this.errorEmail = { isError: false, errorMessage: "" };
                    if(!this.validateEmail(this.userAccount.EMAIL_ADDRESS))
                    {
                        this.errorEmail = { isError: true, errorMessage: "Please Provide valid Email." };
                    }
                    else
                    {
                        this.errorEmail = { isError: false, errorMessage: "" };
                    }
                    //this.errorEmail = { isError: false, errorMessage: "" };
                }

                if(!this.NullCheckFun(this.userAccount.PASSWORD))
                    {
                        this.errorPassword = { isError: true, errorMessage: "Please Provide Password." };
                    }
                    else
                    {
                        this.errorPassword = { isError: false, errorMessage: "" };
                    }

                    if((this.userAccount.CONFIRM_PASSWORD != this.userAccount.PASSWORD) && this.userAccount.PASSWORD != '')
                        {
                            this.errorConfirmPassword = { isError: true, errorMessage: "Password are not same." };
                        }
                        else
                        {
                            this.errorConfirmPassword = { isError: false, errorMessage: "" };
                        }

        if(!this.NullCheckFun(this.userAccount.User_Name) || 
        !this.NullCheckFun(this.userAccount.EMAIL_ADDRESS) || 
        !this.NullCheckFun(this.userAccount.PASSWORD))
        {
            this.isDisableRegisterBtn = true;
        }
        else
        {
            this.isDisableRegisterBtn = false;
        }
    }

    disableLoginBtn()
    {
        if(!this.NullCheckFun(this.userAccount.UserNameEmail))
            {
                this.errorUserNameEmail = { isError: true, errorMessage: "Please Provide Username or Email." };
            }
            else
            {
                this.errorUserNameEmail = { isError: false, errorMessage: "" };
            }

            if(!this.NullCheckFun(this.userAccount.LoginPassword))
                {
                    this.errorLoginPassword = { isError: true, errorMessage: "Please Provide Password." };
                }
                else
                {
                    this.errorLoginPassword = { isError: false, errorMessage: "" };
                }
    }

    NullCheckFun(obj: any): boolean {
        if (obj != null && obj !== undefined && obj != 'NaN' && obj !== '') {
            return true;
        }
        return false;
    }
    classApplied2 = false;
    toggleClass2() {
        this.classApplied2 = !this.classApplied2;
    }
    isProfileMenuVisible = false;
    toggleProfileMenu() {
     var isLogin = Number(localStorage.getItem('Temp'));
     if(isLogin != 0)
    {
        this.isProfileMenuVisible = !this.isProfileMenuVisible;
        const profileBox = document.getElementById('profile-box');
        if (profileBox) {
          if (this.isProfileMenuVisible) {
            profileBox.classList.remove('hidden');
          } else {
            profileBox.classList.add('hidden');
          }
        }
    }
    }

}

