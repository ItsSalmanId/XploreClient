import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-blog-details',
    templateUrl: './blog-details.component.html',
    styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    pageTitleContent = [
        {
            title: 'Blog Details',
            backgroundImage: 'assets/img/page-title/page-title1.jpg'
        }
    ]
    isPopupVisible: boolean = false;

  // Show popup
  showPopup() {
    this.isPopupVisible = true;
    setTimeout(() => {
      const modal = document.querySelector('.custom-modal');
      if (modal) modal.classList.add('show');
    }, 0); // Trigger the show class after rendering
  }

  // Close popup
  closePopup() {
    const modal = document.querySelector('.custom-modal');
    if (modal) {
      modal.classList.remove('show');
      setTimeout(() => {
        this.isPopupVisible = false;
      }, 500); // Delay the removal until after the transition
    }
  }

}