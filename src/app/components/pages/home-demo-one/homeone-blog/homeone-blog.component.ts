import { Component, OnInit, ViewChild, AfterViewInit, Injectable   } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AddBusinessService } from '../../../../services/AddBusiness/AddBusiness.service'
import { BusinessDetail, BusinessBlogDetail, CheckoutSessionRequest } from "../../../../models/AddBusiness/AddBusiness.model";
import { CommonCall } from '../../../../components/common/commonCall/commonCall.component';
import { StripeService } from 'ngx-stripe';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-homeone-blog',
    templateUrl: './homeone-blog.component.html',
    styleUrls: ['./homeone-blog.component.scss']
})
export class HomeoneBlogComponent implements OnInit {
  private apiUrl = 'http://localhost:5000/api/checkout'; // Adjust to your ASP.NET API URL


  businessDetail: BusinessDetail;
  businessDetailsList: BusinessDetail[] = [];
  businessBlogDetails: BusinessBlogDetail;
  businessBlogDetailsList: BusinessBlogDetail[] = [];
  @ViewChild(CommonCall, { static: false }) childComponent!: CommonCall;

  stripeTest: FormGroup;
  card: any;
  buttonColor = 'black'; // or 'white'
  buttonType = 'buy';
  isCustomSize = true; // Change as needed
  buttonWidth = 300; // Set your desired width
  buttonHeight = 50; // Set your desired height
  
  // Example payment request
  paymentRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['MASTERCARD', 'VISA']
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            merchantId: 'exampleMerchantId'
          }
        }
      }
    ],
    merchantInfo: {
      merchantId: 'exampleMerchantId',
      merchantName: 'Example Merchant'
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPrice: '10.00',
      currencyCode: 'USD',
      countryCode: 'US'
    }
  };
  checkoutSessionRequest: CheckoutSessionRequest

  constructor(private _addBusinessService: AddBusinessService,
    private fb: FormBuilder, private stripeService: StripeService
    ,private http: HttpClient
  ) {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });

      this.businessDetail = new BusinessDetail();
      this.businessDetailsList = [];
      this.businessBlogDetails = new BusinessBlogDetail();
      this.businessBlogDetailsList = [];
      this.checkoutSessionRequest = new CheckoutSessionRequest();
   }

    ngOnInit(): void {
      this.getBlogsDetails();
    }
    ngAfterViewInit() {
        if (this.childComponent) {
          this.childComponent.userToken();
        }
      }
      checkout() {
        const amount = 5000; // Amount in cents (e.g., $50.00)
        this.checkoutSessionRequest.Amount = 5000;
    
        this._addBusinessService.createCheckoutSession(this.checkoutSessionRequest).subscribe(
          (session: any) => {
            // Redirect to Stripe Checkout
            window.location.href = `https://checkout.stripe.com/pay/${session.id}`;
          },
          (error) => {
            console.error('Error creating checkout session', error);
          }
        );
      }
      createCheckoutSession(amount: number): Observable<any> {
        return this.http.post(`${this.apiUrl}/create-checkout-session`, { amount });
      }
      onLoadPaymentData(event: any) {
        console.log('Payment data loaded:', event);
        // Handle the loaded payment data
      }
      createToken(): void {
        const name = this.stripeTest.get('name')?.value;
    
        this.stripeService.createToken(this.card, { name }).subscribe((result) => {
          if (result.token) {
            // Handle successful token creation
            console.log(result.token);
          } else if (result.error) {
            // Handle error
            console.error(result.error.message);
          }
        });
      }
      
    selectedBlog(selectedBlogId: number)
    {
      localStorage.setItem('selectedBlogId', selectedBlogId.toString());
    }
    
    SubscribePlan(selectedPlan: string = "")
    {
      this.checkout();
    //   const stripeUrl = 'https://buy.stripe.com/3cs9CCb1y2RW5Z65kr'; // Your Stripe URL
    // window.open(stripeUrl, '_blank'); // Open in a new tab
    // this.loadPayPalScript();
    }
    loadPayPalScript(): void {
      // Load the PayPal SDK
      const script = document.createElement('script');
      script.src = 'https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID';
      script.onload = () => this.initPayPalButton();
      document.body.appendChild(script);
    }
    initPayPalButton(): void {
      // Render the PayPal button
      (window as any).paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: '10.00' // Set the amount here
              }
            }]
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            console.log('Transaction completed by ' + details.payer.name.given_name);
            console.log('Payment ID: ' + data.orderID); // Get the payment ID
            // Here you can send the payment details to your backend
          });
        },
        onError: (err: any) => {
          console.error('Error during payment: ', err);
        }
      }).render('#paypal-button-container'); // This element will render the PayPal button
    }
    getBlogsDetails()
    {
        console.log(this.businessDetail);
        console.log("click on RegisterNow");
        this.businessDetail.EMAIL_ADDRESS = "itssalmanid@gmail.com";
        // if (this.businessDetail) {
        //     //this._spinner.show();
            this._addBusinessService.getBlogsDetails(this.businessBlogDetails).subscribe(
                response => {
                    console.log(response);
                    this.businessBlogDetailsList = response;
                   // this._spinner.hide();
                   //this.ShowToast("Alert", response.Message, response.success);
                   //this.toastr.success(response.Message, 'Toastr fun!');
                   //this.ShowToast("Xplore", response.Message, response.Success);
                 
                });
        //}
     }

     customOptions: OwlOptions = {
      loop: false,
      nav: true,
      dots: true,
      autoplayHoverPause: true,
      autoplay: true,
      margin: 30,
      navText: [
          "<i class='flaticon-left-chevron'></i>",
          "<i class='flaticon-right-chevron'></i>"
      ],
      responsive: {
          0: {
              items: 1,
          },
          425:{
              items: 2,
          },
          768: {
              items: 3,
          },
          1200: {
              items: 3,
          }
      }
  }
  customOptions2: OwlOptions = {
  loop: true,
  nav: true,
  dots: false,
  animateOut: 'fadeOut',
  animateIn: 'fadeIn',
  autoplayHoverPause: true,
  autoplay: true,
  mouseDrag: false,
  items: 1,
      navText: [
          "<i class='flaticon-left-chevron'></i>",
          "<i class='flaticon-right-chevron'></i>"
      ]
  }

    singleBlogPost = [
        {
            mainImg: 'assets/img/blog/blog1.jpg',
            authorImg: 'assets/img/user1.jpg',
            authorName: 'Taylor',
            date: 'Aug 7, 2024',
            title: '10 Types of Social Proof and What Makes Them Effective',
            link: 'blog-details'
        },
        {
            mainImg: 'assets/img/blog/blog2.jpg',
            authorImg: 'assets/img/user2.jpg',
            authorName: 'Sarah',
            date: 'Aug 6, 2024',
            title: 'Tech Products That Make It Easier to Stay Home',
            link: 'blog-details'
        },
        {
            mainImg: 'assets/img/blog/blog1.jpg',
            authorImg: 'assets/img/user1.jpg',
            authorName: 'Taylor',
            date: 'Aug 7, 2024',
            title: '10 Types of Social Proof and What Makes Them Effective',
            link: 'blog-details'
        },
        {
            mainImg: 'assets/img/blog/blog2.jpg',
            authorImg: 'assets/img/user2.jpg',
            authorName: 'Sarah',
            date: 'Aug 6, 2024',
            title: 'Tech Products That Make It Easier to Stay Home',
            link: 'blog-details'
        }
    ]
    

    blogSlides:  OwlOptions = {
        loop: false,
        nav: true,
        dots: true,
        autoplayHoverPause: true,
        autoplay: true,
        margin: 30,
        navText: [
            "<i class='flaticon-left-chevron'></i>",
            "<i class='flaticon-right-chevron'></i>"
        ],
        responsive: {
          0: {
            items: 1
          },
          375: {
            items: 1
          },
          600: {
            items: 2
          },
          1000: {
            items: 3
          }
        }
      };

}