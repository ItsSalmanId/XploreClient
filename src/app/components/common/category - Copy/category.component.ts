import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements AfterViewInit {
  @ViewChild('carousel', { static: false }) carousel: ElementRef;

  profiles = [
    { image: 'assets/img/user1.jpg', name: 'Add Story', isAddStory: true },
    { image: 'assets/img/user1.jpg', name: 'Alex', isAddStory: false },
    { image: 'assets/img/user1.jpg', name: 'Sam', isAddStory: false },
    { image: 'assets/img/user1.jpg', name: 'Taylor', isAddStory: false },
    { image: 'assets/img/user1.jpg', name: 'Taylor', isAddStory: false },
    { image: 'assets/img/user1.jpg', name: 'Taylor', isAddStory: false },
    { image: 'assets/img/user1.jpg', name: 'Taylor', isAddStory: false },
    { image: 'assets/img/user1.jpg', name: 'Taylor', isAddStory: false },
    { image: 'assets/img/user1.jpg', name: 'Taylor', isAddStory: false },
    { image: 'assets/img/user1.jpg', name: 'Taylor', isAddStory: false },
    { image: 'assets/img/user1.jpg', name: 'Taylor', isAddStory: false },
    { image: 'assets/img/user1.jpg', name: 'Taylor', isAddStory: false },
    { image: 'assets/img/user1.jpg', name: 'Taylor', isAddStory: false },
    { image: 'assets/img/user1.jpg', name: 'Taylor', isAddStory: false },
    // other profiles
    { image: 'assets/img/user1.jpg', name: 'Jordan', isAddStory: false }
  ];

  customOptions: OwlOptions = {
    nav: false,
    dots: false,
    responsive: {
      0: {
        items: 4
      },
      600: {
        items: 5
      },
      1000: {
        items: 4
      }
    }
  };

  constructor() { }

  ngAfterViewInit() {
    // Ensure the DOM is fully loaded before manipulating it
    setTimeout(() => {
      this.updateWidth('.owl-item', '68.8px');
    }, 1000); // Adjust the delay as needed
  }

  updateWidth(selector: string, newWidth: string) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      if (element instanceof HTMLElement) {
        element.style.removeProperty('width');
        element.style.width = newWidth;
      }
    });
  }
}
