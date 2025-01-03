import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-footer-style-one',
    templateUrl: './footer-style-one.component.html',
    styleUrls: ['./footer-style-one.component.scss']
})
export class FooterStyleOneComponent implements OnInit {
  isTermsVisible: boolean;
  isXploreVisible: boolean;
  isCookiesVisible: boolean;

    constructor() { }

    ngOnInit(): void {
    }
    downloadPdf() {
      this.showTerms()
        // File path specify karein
        // const pdfPath = 'assets/Terms and Conditions.pdf'; // No need for 'src/' prefix
        // const link = document.createElement('a');
        // link.href = pdfPath;
        // link.download = 'Terms and Conditions.pdf';
        
        // // Append link to body to trigger download
        // document.body.appendChild(link);
        // link.click();
        
        // // Remove link after triggering the download
        // document.body.removeChild(link);
      }
      XploradoorPdf() {
        // File path specify karein
        // const pdfPath = 'assets/About Us (Xploradoor).pdf'; // No need for 'src/' prefix
        // const link = document.createElement('a');
        // link.href = pdfPath;
        // link.download = 'About Us (Xploradoor).pdf';
        
        // // Append link to body to trigger download
        // document.body.appendChild(link);
        // link.click();
        
        // // Remove link after triggering the download
        // document.body.removeChild(link);
        this.showXplore();
      }
      
      CookiesPdf() {
        // File path specify karein
        this.showCookies();
      }

      showTerms() {
        this.isTermsVisible = true;
        console.log(this.isTermsVisible);
        setTimeout(() => {
          const modal = document.querySelector('.custom-modal');
          if (modal) modal.classList.add('show');
        }, 0); 
      }
    
      closeTerms() {
        this.isTermsVisible = false;
      }
      showXplore() {
        this.isXploreVisible = true;
        console.log(this.isTermsVisible);
        setTimeout(() => {
          const modal = document.querySelector('.custom-modal');
          if (modal) modal.classList.add('show');
        }, 0); 
      }
    
      closeXplore() {
        this.isXploreVisible = false;
      }

      showCookies() {
        this.isCookiesVisible = true;
        console.log(this.isTermsVisible);
        setTimeout(() => {
          const modal = document.querySelector('.custom-modal');
          if (modal) modal.classList.add('show');
        }, 0); 
      }
    
      closeCookies() {
        this.isCookiesVisible = false;
      }
}