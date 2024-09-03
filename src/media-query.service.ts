import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaQueryService {
  private mobileBreakpoint = 768; // Adjust this breakpoint as needed
  private isMobileSubject = new BehaviorSubject<boolean>(window.innerWidth < this.mobileBreakpoint);

  isMobile$ = this.isMobileSubject.asObservable();

  constructor() {
    window.addEventListener('resize', () => {
      this.isMobileSubject.next(window.innerWidth < this.mobileBreakpoint);
    });
  }
}
