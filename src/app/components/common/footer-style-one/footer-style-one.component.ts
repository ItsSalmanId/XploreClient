import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-footer-style-one',
    templateUrl: './footer-style-one.component.html',
    styleUrls: ['./footer-style-one.component.scss']
})
export class FooterStyleOneComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }
    downloadPdf() {
        // File path specify karein
        const pdfPath = 'assets/Terms and Conditions.pdf'; // No need for 'src/' prefix
        const link = document.createElement('a');
        link.href = pdfPath;
        link.download = 'Terms and Conditions.pdf';
        
        // Append link to body to trigger download
        document.body.appendChild(link);
        link.click();
        
        // Remove link after triggering the download
        document.body.removeChild(link);
      }
      XploradoorPdf() {
        // File path specify karein
        const pdfPath = 'assets/About Us (Xploradoor).pdf'; // No need for 'src/' prefix
        const link = document.createElement('a');
        link.href = pdfPath;
        link.download = 'About Us (Xploradoor).pdf';
        
        // Append link to body to trigger download
        document.body.appendChild(link);
        link.click();
        
        // Remove link after triggering the download
        document.body.removeChild(link);
      }
      
      CookiesPdf() {
        // File path specify karein
        const pdfPath = 'assets/Cookie Policy.pdf'; // No need for 'src/' prefix
        const link = document.createElement('a');
        link.href = pdfPath;
        link.download = 'Cookie Policy.pdf';
        
        // Append link to body to trigger download
        document.body.appendChild(link);
        link.click();
        
        // Remove link after triggering the download
        document.body.removeChild(link);
      }

}