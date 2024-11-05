import { Component, OnInit } from '@angular/core';
import { BusinessDetail, BusinessFilesDetailList, TimeSlots,
     BusinessDetailCountList, BusinessRating, LatLngtest } from "../../../models/AddBusiness/AddBusiness.model";
import { Observable } from 'rxjs';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DropzoneConfig } from 'ngx-dropzone-wrapper';
import { GlobalSettingService } from '../../../services/Global/global-setting.service';
import { GenericUtility } from '../../../utilities/generic-utility';
//declare var $: any;
import Dropzone from 'dropzone';
import { OwlOptions } from 'ngx-owl-carousel-o';
import * as $ from 'jquery'; // Import jQuery
import { Router } from '@angular/router';
import { VerticalListingsLeftSidebarComponent } from '../../../components/pages/vertical-listings-left-sidebar/vertical-listings-left-sidebar.component';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';



@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

    center: google.maps.LatLngLiteral = { lat: 40.6782, lng: -73.9442 };
    zoom = 12;
    options: google.maps.MapOptions = {
      scrollwheel: true
    };
  
    infoWindowVisible = false;
    distanceInfoVisible = false;
    selectedLocation!: google.maps.LatLngLiteral & { distanceText: string };
  
    label = 'P'; // Label for provided location marker
    hotel = {
      name: 'Provided Location',
      rating: 4.5,
      address: 'Brooklyn, New York'
    };
    LatLng: LatLngtest
    markerColors = {
        provided: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
        closest: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
        secondClosest: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
        thirdClosest: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
    };
   
  
    top3ClosestLocations: (google.maps.LatLngLiteral & { distanceText: string; label: string })[] = [];
    //LocationInfo: { latitude: number; longitude: number; }[];

    LocationInfo: { latitude: number; longitude: number; }[] = [
        { latitude: 40.6795, longitude: -73.9415 },
        { latitude: 40.6808, longitude: -73.9463 },
        { latitude: 40.6820, longitude: -73.9427 },
        { latitude: 40.6767, longitude: -73.9489 },
        { latitude: 40.6753, longitude: -73.9450 },
        { latitude: 40.6779, longitude: -73.9430 },
        { latitude: 40.6811, longitude: -73.9475 },
        { latitude: 40.6800, longitude: -73.9444 },
        { latitude: 40.6790, longitude: -73.9490 }
    ];
    constructor() { 

        
          this.LatLng = new LatLngtest();
    }

   
      ngOnInit() {
        this.findTop3ClosestLocations();
      }
    
      calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
        const toRadians = (degrees: number) => degrees * (Math.PI / 180);
        const earthRadiusKm = 6371;
    
        const dLat = toRadians(lat2 - lat1);
        const dLng = toRadians(lng2 - lng1);
    
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
          Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
        return earthRadiusKm * c;
      }
    
      findTop3ClosestLocations() {
        const currentLat = this.center.lat;  // Provided location latitude
        const currentLng = this.center.lng;  // Provided location longitude
    
        // Map the locations to the LatLngtest structure
        const distances: LatLngtest[] = this.LocationInfo.map((loc, index) => {
            const distance = this.calculateDistance(currentLat, currentLng, loc.latitude, loc.longitude);
            console.log(`Distance from provided location to Location ${index + 1}: ${distance.toFixed(2)} km`);
            return {
                lat: loc.latitude,                      // Changed to 'lat'
                lng: loc.longitude,                     // Changed to 'lng'
                distance: distance,                     // Calculated distance
                label: `Location ${index + 1}`,  
                distanceText: `Distance: ${distance.toFixed(2)} km` // Formatted distance text
            };
        });
    
        // Sort distances and take top 3 closest locations
        this.top3ClosestLocations = distances
            .sort((a, b) => (a.distance || 0) - (b.distance || 0)) // Sort based on distance
            .slice(0, 3)
            .map((loc) => ({
                lat: loc.lat,                       // Ensure you map 'lat' here
                lng: loc.lng,                       // Ensure you map 'lng' here
                label: loc.label,                   // Assign label
                distanceText: loc.distanceText      // Now this is required and available
            }));
    
        // Optionally, you can log the top 3 closest locations
        console.log('Top 3 Closest Locations:', this.top3ClosestLocations);
    }
    
    
    
    getMarkerColor(index: number): string {
        switch (index) {
            case 0:
                return this.markerColors.closest; // Green for the closest location
            case 1:
                return this.markerColors.secondClosest; // Yellow for the second closest
            case 2:
                return this.markerColors.thirdClosest; // Blue for the third closest
            default:
                return ''; // Default case (not used)
        }
    }
      toggleInfoWindow() {
        this.infoWindowVisible = !this.infoWindowVisible;
      }
    
      closeInfoWindow() {
        this.infoWindowVisible = false;
      }
    
      openDistanceInfo(location: google.maps.LatLngLiteral & { distanceText: string }) {
        this.selectedLocation = location;
        this.distanceInfoVisible = true;
      }
    
      closeDistanceInfo() {
        this.distanceInfoVisible = false;
      }

    pageTitleContent = [
        {
            title: 'Frequently Asked Questions',
            backgroundImage: 'assets/img/page-title/page-title4.jpg'
        }
    ]

    faqItem = [
        {
            title: 'What is Directory Listing?',
            paragraph: 'Sed perspiciatis unde omnis natus error sit voluptatem totam rem aperiam, eaque quae architecto beatae explicabo. Lorem ipsum dolor sit amet, elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar. Donec a consectetur nulla. Nulla posuere sapien vitae lectus suscipit.'
        },
        {
            title: 'Do I have to commit to a yearly subscription?',
            paragraph: 'Sed perspiciatis unde omnis natus error sit voluptatem totam rem aperiam, eaque quae architecto beatae explicabo. Lorem ipsum dolor sit amet, elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar. Donec a consectetur nulla. Nulla posuere sapien vitae lectus suscipit.'
        },
        {
            title: 'How much time does it take to get approval?',
            paragraph: 'Sed perspiciatis unde omnis natus error sit voluptatem totam rem aperiam, eaque quae architecto beatae explicabo. Lorem ipsum dolor sit amet, elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar. Donec a consectetur nulla. Nulla posuere sapien vitae lectus suscipit.'
        },
        {
            title: 'Can I create a free listing?',
            paragraph: 'Sed perspiciatis unde omnis natus error sit voluptatem totam rem aperiam, eaque quae architecto beatae explicabo. Lorem ipsum dolor sit amet, elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar. Donec a consectetur nulla. Nulla posuere sapien vitae lectus suscipit.'
        },
        {
            title: 'How many different listings can I make?',
            paragraph: 'Sed perspiciatis unde omnis natus error sit voluptatem totam rem aperiam, eaque quae architecto beatae explicabo. Lorem ipsum dolor sit amet, elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar. Donec a consectetur nulla. Nulla posuere sapien vitae lectus suscipit.'
        },
        {
            title: 'What if I want to delete the listing?',
            paragraph: 'Sed perspiciatis unde omnis natus error sit voluptatem totam rem aperiam, eaque quae architecto beatae explicabo. Lorem ipsum dolor sit amet, elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar. Donec a consectetur nulla. Nulla posuere sapien vitae lectus suscipit.'
        },
        {
            title: 'How do I sign up to get a directory listing added?',
            paragraph: 'Sed perspiciatis unde omnis natus error sit voluptatem totam rem aperiam, eaque quae architecto beatae explicabo. Lorem ipsum dolor sit amet, elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar. Donec a consectetur nulla. Nulla posuere sapien vitae lectus suscipit.'
        },
        {
            title: 'What are the other features the Directory Listing have?',
            paragraph: 'Sed perspiciatis unde omnis natus error sit voluptatem totam rem aperiam, eaque quae architecto beatae explicabo. Lorem ipsum dolor sit amet, elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar. Donec a consectetur nulla. Nulla posuere sapien vitae lectus suscipit.'
        }
    ]

}