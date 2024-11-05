import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/AuthService/AuthService.service'
import { SurveyAutomation, SurveyQuestions, SurveyLink, NavigationAndToggle, UserAccount } from "../../../models/login/login.model";
import { AccountService } from '../../../services/login/login.service';
import { AccountTestService } from '../../../services/loginTest/loginTest.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';



@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
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
    

    constructor(private router: Router, private authService: AuthService, private _accountServiceService: AccountService, private toastr: ToastrService, private _accountTestService: AccountTestService ) { 
        this.userAccount = new UserAccount();
        this.isDisableRegisterBtn = false;    
    }

    ngOnInit(): void {
        //this.Logintest();
    }

    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
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
        this.isLoading = true;
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
                   this.isLoading = false;
                   if(response.Success)
                   {
                    this.currentTab = 'tab1';
                   }
                });
        }
    }

    Login()
    {
        this.isLoading = true;
console.log("click on login");

if (this.userAccount) {
    //this._spinner.show();
    this._accountServiceService.loginUser(this.userAccount).subscribe(
        response => {
            this.isLoading = false;
            if(response != null)
            {
                this.userAccount = response;
                localStorage.setItem('Temp', this.userAccount.APPLICATION_USER_ACCOUNTS_ID.toString());
                this.login();
            }
            else
            {
                this.ShowToast("Xplore", "The username or password is incorrect.", false);
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


    Logintest()
    {
console.log("click on login");

this.userAccount.EMAIL_ADDRESS = "t@t.com";
this.userAccount.PASSWORD = "t@t.com";
if (this.userAccount) {
    //this._spinner.show();
    this._accountTestService.logintest(this.userAccount).subscribe(
        response => {
          //this.login()
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

    closePopup()
    {
        this.router.navigate(['/']);  
    }

    login() {
        this.isLoading = true;
        this.userAccount
        this.authService.logintest(this.userAccount).subscribe(
            response => {
                this.isLoading = false;
                if (response.token) {
                    localStorage.setItem('token', response.token);
                    this.ShowToast("Xplore", "login successfully", true);
                    localStorage.setItem('UserEmail', this.userAccount.EMAIL_ADDRESS);
                    localStorage.setItem('UserName', this.userAccount.User_Name);
                    localStorage.setItem('ProfilePicture', this.userAccount.PROFILE_PICTURE);
                    if(response.Success)
                    {
                     this.currentTab = 'tab1';
                    }
                  }
            console.log(response);
            if(this.userAccount.ACCOUNT_TYPE == "Admin")
            {
                localStorage.setItem('ACCOUNT_TYPE', this.userAccount.ACCOUNT_TYPE);
                this.router.navigate(['/dashboard-user-details']);
            }
            else
            {
                localStorage.setItem('ACCOUNT_TYPE', this.userAccount.ACCOUNT_TYPE);
                this.router.navigate(['/dashboard-my-listings']);
            }

            // Redirect to dashboard or any other page
          },
          error => {
            console.error('Login failed', error);
          }
        );
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


    

    // Signin/Signup Tabs
    currentTab = 'tab1';
    switchTab(event: MouseEvent, tab: string) {
        event.preventDefault();
        this.currentTab = tab;
    }

}