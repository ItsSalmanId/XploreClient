
import { Component, OnInit, AfterViewInit, HostListener,
  ViewChildren, ElementRef, QueryList, ChangeDetectorRef, Renderer2, ViewChild, OnDestroy, ViewEncapsulation, Input  } from '@angular/core';
import { storiesData } from '../../../../assets/imagex/stories'; // Import your stories data
import { BusinessDetail, TimeSlots, WeeklyTimeSlots, ReelsDetails, ReelsCommentsDetails, UserAccount, UserFollowDetails,
  ReelSaved
} from "../../../models/AddBusiness/AddBusiness.model";
import { Observable, timeout } from 'rxjs';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DropzoneConfig, DropzoneComponent, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { GlobalSettingService } from '../../../services/Global/global-setting.service';
import { GenericUtility } from '../../../utilities/generic-utility';
//declare var $: any;
import * as $ from 'jquery'; // Import jQuery
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CommonCall } from '../../../components/common/commonCall/commonCall.component';
import { AddBusinessService } from '../../../services/AddBusiness/AddBusiness.service'





@Component({
  selector: 'app-show-stories',
  templateUrl: './show-stories.component.html',
  styleUrl: './show-stories.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ShowStoriesComponent implements OnInit, OnDestroy,AfterViewInit {
 
  config: DropzoneConfig;
  reelsDetails: ReelsDetails
  businessDetail: BusinessDetail;
  userFollowDetail: UserFollowDetails; 
  reelSaved: ReelSaved;
  selectedFiles?: FileList;
progressInfos: any[] = [];
message: string[] = [];
previews: string[] = [];
imageInfos?: Observable<any>;

//uploadedFilesName: string[];
  uploadedFilesName: string[] = [];
  uploadedFilesNameClient: string[] = [];
  disableTreatmentLocation: boolean;
  list : any[];
   TimeSlots: string[];
   timeSlots: string[] = [];
   weeklyTimeSlots: WeeklyTimeSlots;
   reelsDetailsList: ReelsDetails[] = [];
   reelsCommentsDetails: ReelsCommentsDetails[] = [];
   reelsCommentsModel: ReelsCommentsDetails;
   allReelsCommentsDetails: ReelsCommentsDetails[] = [];
   isReplyVisible: { [key: number]: boolean } = {};
   reelsCommentsLikeModel: ReelsCommentsDetails;
   userAccountList: UserAccount[];
   userAccount: UserAccount;
   isShowStories : boolean;
   isLoading: boolean = false;
   reelsDetailsListSaved: ReelsDetails[] = [];
   reelsSatusDetailsList: ReelsDetails[] = [];

   @ViewChildren('videoElement') videoElements: QueryList<ElementRef<HTMLVideoElement>>;

  constructor(
    private cdr: ChangeDetectorRef, private _addBusinessService: AddBusinessService, 
        public _globalSettingService: GlobalSettingService, 
        private _genericUtilities: GenericUtility, private router: Router, 
        private toastr: ToastrService, private renderer: Renderer2,
        private eRef: ElementRef
  ) {

    this.reelsDetails = new ReelsDetails();
    this.reelsCommentsModel = new ReelsCommentsDetails();
            this.userFollowDetail = new UserFollowDetails();
            this.reelsDetails = new ReelsDetails();
            this.reelsDetailsList = [];
            this.reelsCommentsDetails = [];
            this.allReelsCommentsDetails = [];
            this.userAccount = new UserAccount();
            this.reelSaved = new ReelSaved();
            this.isShowStories = false;
            //this.userReelsAccountModel = new UserAccount();
           // this.userReelsAccount = [];
  }
  ngAfterViewInit() {
    this.fetchStories();
    //this.pauseAllVideos();
    // this.getReels();
    // this.getReelsStatus();
    console.log("userStories view int");
    //if(this.stories[this.indexSelected].images[this.key].type==='video'){
  }
 



  defaultImageDuration = 5000;
  defaultVideoDuration = 15000;
  isMuted = false;
  indexSelected = 0;
  difference = 0;
  stories = [];
  key = 0;

  // percent story
  percent = 0;
  timer: any;
  progress: any;
  duration = 5000;
  interval: any;
  isPaused = false;
  newDur = 0; // duration
  pausePer = 0; // pausePercent

  ngOnInit() {
    console.log("userStories");
    this.getReels();
    this.getReelsStatus();
    this.fetchStories();
  }
  getReels()
  {
      //console.log(this.businessDetail);
      console.log("click on RegisterNow");
      this.reelsDetails.EMAIL_ADDRESS = "itssalmanid@gmail.com";
      this.reelsDetails.USER_ID = Number(localStorage.getItem("Temp"));
      if (this.reelsDetails) {
          //this._spinner.show();
          this._addBusinessService.getReelsDetails(this.reelsDetails).subscribe(
              response => {
                  console.log(response);
                  this.reelsDetailsList = response;
                  console.log(this.reelsDetailsList[0].isPlaying);
                  //this.reelsDetailsList
                  // this.reelsCommentsDetails = this.reelsDetailsList.map(item => item.reelsCommentsModelList).flat();
                  this.reelsCommentsDetails = this.reelsDetailsList
                                              .map(item => item.reelsCommentsModelList)
                                              .reduce((acc, val) => acc.concat(val), []);



                          // this.allReelsCommentsDetails = this.reelsCommentsDetails.filter(comment => !comment.IS_REPLAY_COMMENT);
                          // this.allReelsCommentsDetails.forEach(mainComment => {
                          //   mainComment.replies = this.reelsCommentsDetails.filter(reply => reply.IS_REPLAY_COMMENT && reply.REPLAY_COMMENT_HEADER_ID === mainComment.REELS_COMMENTS_DETAILS_ID);
                          // });

                          this.allReelsCommentsDetails = this.reelsCommentsDetails.filter(comment => !comment.IS_REPLAY_COMMENT);
this.allReelsCommentsDetails.forEach(mainComment => {
mainComment.replies = this.reelsCommentsDetails.filter(reply => reply.IS_REPLAY_COMMENT && reply.REPLAY_COMMENT_HEADER_ID === mainComment.REELS_COMMENTS_DETAILS_ID);
});
                  console.log(this.reelsDetailsList);
                  this.reelsDetailsList.forEach((item: any) => {
                      item.IS_REEL_LIKED = item.IS_REEL_LIKED_OR_NOT;
                      item.isBookmarked = item.IS_REEL_SAVED_OR_NOT;
                      console.log("reels",response);
                      // Check if the REELS_DETAILS_ID matches
                      // if (item.REELS_DETAILS_ID === this.reelsDetails.REELS_DETAILS_ID) {
                        
                      //   // Update the 'liked' status
                      //   item.IS_REEL_LIKED_OR_NOT = this.reelsDetails.IS_REEL_LIKED_OR_NOT;
                      //   item.IS_REEL_LIKED = this.reelsDetails.IS_REEL_LIKED_OR_NOT;
                    
                      //   // Update the 'saved' (bookmarked) status
                      //   item.IS_REEL_SAVED_OR_NOT = this.reelsDetails.IS_REEL_SAVED_OR_NOT;
                      //   item.isBookmarked = this.reelsDetails.IS_REEL_SAVED_OR_NOT;
                      // }
                    });
                    console.log(this.reelsDetailsList);
                  
                 // this._spinner.hide();
                 //this.ShowToast("Alert", response.Message, response.success);
                 //this.toastr.success(response.Message, 'Toastr fun!');
                 //this.ShowToast("Xplore", response.Message, response.Success);
               
              });
      }
}
getReelsStatus()
    {
        //console.log(this.businessDetail);
        console.log("click on RegisterNow");
        this.reelsDetails.EMAIL_ADDRESS = "itssalmanid@gmail.com";
        this.reelsDetails.USER_ID = Number(localStorage.getItem("Temp"));
        if (this.reelsDetails) {
            //this._spinner.show();
            this._addBusinessService.getReelsStatus(this.reelsDetails).subscribe(
                response => {
                    console.log(response);
                    this.reelsSatusDetailsList = response;
                    localStorage.setItem('reelsSatusDetailsList', JSON.stringify(this.reelsSatusDetailsList));

                    // this.reelsCommentsDetails = this.reelsDetailsList.map(item => item.reelsCommentsModelList).flat();
                    this.reelsCommentsDetails = this.reelsDetailsList
                                                .map(item => item.reelsCommentsModelList)
                                                .reduce((acc, val) => acc.concat(val), []);



                            // this.allReelsCommentsDetails = this.reelsCommentsDetails.filter(comment => !comment.IS_REPLAY_COMMENT);
                            // this.allReelsCommentsDetails.forEach(mainComment => {
                            //   mainComment.replies = this.reelsCommentsDetails.filter(reply => reply.IS_REPLAY_COMMENT && reply.REPLAY_COMMENT_HEADER_ID === mainComment.REELS_COMMENTS_DETAILS_ID);
                            // });

                            this.allReelsCommentsDetails = this.reelsCommentsDetails.filter(comment => !comment.IS_REPLAY_COMMENT);
this.allReelsCommentsDetails.forEach(mainComment => {
  mainComment.replies = this.reelsCommentsDetails.filter(reply => reply.IS_REPLAY_COMMENT && reply.REPLAY_COMMENT_HEADER_ID === mainComment.REELS_COMMENTS_DETAILS_ID);
});
                    console.log("reelsstatus",response);


                    this.pauseAllVideos();


                    // if(this.reelsSatusDetailsList[this.indexSelected].images[this.key].type==='video'){
    
                    //   const video = document.getElementById('storyVideo-'+this.indexSelected+'-'+this.key) as HTMLVideoElement;
                     
                    //    const playPromise = video.play();
                    //    video.currentTime = 0;
                    //    if (playPromise !== undefined) {
                    //      playPromise.then(() => {
                    //        // Autoplay started successfully
                    //        console.log('Autoplay started!');
                    //      }).catch((error) => {
                    //        // Autoplay was prevented, show a play button or handle the error
                    //        console.log('Autoplay was prevented:', error);
                    //        // You can display a play button or trigger any UI change for the user to manually play
                    //        video.muted = true; // Ensure video stays muted
                    //      });
                    //    }
                    //  }

                     



                   // this._spinner.hide();
                   //this.ShowToast("Alert", response.Message, response.success);
                   //this.toastr.success(response.Message, 'Toastr fun!');
                   //this.ShowToast("Xplore", response.Message, response.Success);
                 
                });
        }
  }

     // Mute the story
     muteStory = () => {
      this.isMuted = true;
      // Handle audio mute logic (e.g., mute video/audio elements)
    };

    // Unmute the story
     unmuteStory = () => {
      this.isMuted = false;
      // Handle audio unmute logic (e.g., unmute video/audio elements)
    };


  // Fetch stories
  fetchStories() {
    this.stories = storiesData; // Assuming `storiesData` is the data you get using API
    console.log("fetch",this.stories)
    //this.play();
  }

  //pause all videos
  pauseAllVideos(){
    for (let index = 0; index < this.reelsSatusDetailsList.length; index++) {
      for (let index2 = 0; index2 < this.reelsSatusDetailsList[index].images.length; index2++) {
        if(this.reelsSatusDetailsList[index].images[index2].type==='video'){
          const video = document.getElementById('storyVideo-'+index+'-'+index2) as HTMLVideoElement;
          if(video){
            video.currentTime=0;
            video.pause();
          }
        
        }
      }
    }
  }


  // Select slide
  selectSlide(index: number) {
    this.difference += this.indexSelected - index;
    this.indexSelected = index;
    this.key = 0;
    this.isPaused = false;
    this.reset();
  }

  // Next story
  next(index: number) {
    this.isPaused = false;

    if (this.indexSelected >= this.reelsSatusDetailsList.length - 1 && this.key >= this.reelsSatusDetailsList
      [this.indexSelected].images.length - 1) {
      setTimeout(() => {
        this.difference = 0;
        this.indexSelected = 0;
        this.key = 0;
      });
    } else if (this.key >= this.reelsSatusDetailsList[this.indexSelected].images.length - 1) {
      setTimeout(() => {
        this.difference += index - (index + 1);
        this.indexSelected++;
        this.key = 0;
      });
    } else {
      this.key++;
    }
    this.reset();
  }

  // Previous story
  prev(index: number) {
    this.isPaused = false;


    if (this.indexSelected <= 0 && this.key <= 0) {
      this.key = 0;
    } else if (this.key <= 0) {
      setTimeout(() => {
        this.difference += index - (index - 1);
        this.indexSelected--;
        this.key = 0;
      });
    } else {
      this.key--;
    }
    this.reset();
  }

  // Auto play the story
  autoPlay() {
   if (this.indexSelected >= this.reelsSatusDetailsList.length - 1 
    && this.key >= this.reelsSatusDetailsList[this.indexSelected].images.length - 1) {
      this.difference = 0;
      this.indexSelected = 0;
      this.key = 0;
    } else if (this.key >= this.reelsSatusDetailsList[this.indexSelected].images.length - 1) {
      this.difference += this.indexSelected - (this.indexSelected + 1);
      this.indexSelected++;
      this.key = 0;
    } else {
        this.key++;
    }
    this.reset();
  
  }

  // Play the story
  play() {
    //this.duration= this.defaultVideoDuration;
    if(this.reelsSatusDetailsList[this.indexSelected].images[this.key].type==='video'){
      this.duration= this.defaultVideoDuration;
      //const videoElement = this.videoElements.toArray()[this.indexSelected].nativeElement;
      // setTimeout(() => {
      //   if(this.reelsSatusDetailsList[this.indexSelected].images[this.key].type==='video'){
         
      //     const videoElementId = 'storyVideo-' + this.indexSelected + '-' + this.key;
      //     console.log(videoElementId);
      //     const video = document.getElementById(videoElementId) as HTMLVideoElement;
      //     video.load(); 
      //     video.play();
      //   }

      //   const videoElement = this.videoElements.toArray()[this.indexSelected].nativeElement;
        

      //   videoElement.play().catch(error => {
      //       console.log('Autoplay prevented:', error);
      //   });
      //   this.isPaused = false;
      // }, 500);
    
      //this.playStory();
      // const video = document.getElementById('storyVideo-'+this.indexSelected+'-'+this.key) as HTMLVideoElement;
      // video.play();
    } 
    else
      this.duration= this.defaultImageDuration;  
      
      this.timer = new Date().getTime();
      this.progress = setInterval(() => {
      const time = new Date().getTime();
      if (this.newDur > 0) {
        this.percent = this.pausePer + Math.floor((100 * (time - this.timer)) / this.duration);
      } else {
        this.percent = Math.floor((100 * (time - this.timer)) / this.duration);
      }
    }, this.duration / 100);

    if (this.newDur > 0) {
      this.interval = setInterval(() => this.autoPlay(), this.newDur);
    } else {
      this.interval = setInterval(() => this.autoPlay(), this.duration);
    }
  }
  
  // Reset the story playback
  reset() {
    this.pauseAllVideos();
    this.newDur = 0;
    this.percent = 0;
    clearInterval(this.interval);
    clearInterval(this.progress);
    this.play();
  }

  // Pause the story
  pauseStory() {
    if(this.reelsSatusDetailsList[this.indexSelected].images[this.key].type==='video'){
      const video = document.getElementById('storyVideo-'+this.indexSelected+'-'+this.key) as HTMLVideoElement;
      video.pause();
    }
    this.isPaused = true;
    this.pausePer = this.percent;
    clearInterval(this.progress);
    clearInterval(this.interval);
    this.newDur = this.duration - (this.pausePer * this.duration) / 100;
  }

  // Resume the story
  playStory() {
    if(this.reelsSatusDetailsList[this.indexSelected].images[this.key].type==='video'){
      const video = document.getElementById('storyVideo-'+this.indexSelected+'-'+this.key) as HTMLVideoElement;
      video.play();
    }
    this.isPaused = false;
    this.play();
  }

  // Cleanup when component is destroyed
  ngOnDestroy() {
    clearInterval(this.progress);
    clearInterval(this.interval);
  }


 calculateTransform = (index) => {
  const isMobile = window.innerWidth <= 480; // Mobile breakpoint
  const isTablet = window.innerWidth > 480 && window.innerWidth <= 768; // Tablet breakpoint
  const baseValue = 315; // Default value for desktop

  // For mobile and tablet, scale only one slide, no complex calculations
  if (isMobile || isTablet) {
    if (index === this.indexSelected) {
      return 0; // Current slide is fully visible (no transform)
    } else {
      return window.innerWidth; // Hide other slides by shifting them off-screen
    }
  }

  // Desktop behavior (same as your original)
  if (this.indexSelected - index === -1 || this.indexSelected - index === 1) {
    return baseValue * (index + this.difference);
  }
  if (index > this.indexSelected) {
    return (baseValue + baseValue * (index + this.difference)) * 0.5;
  } else {
    return Math.abs((baseValue * (index + this.difference)) * 0.5) * -1;
  }
};
}
