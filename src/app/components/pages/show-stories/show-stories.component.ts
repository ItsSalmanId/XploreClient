import { Component, OnInit, OnDestroy, ViewEncapsulation, Input, AfterViewInit } from '@angular/core';
import { storiesData } from '../../../../assets/imagex/stories'; // Import your stories data



@Component({
  selector: 'app-show-stories',
  templateUrl: './show-stories.component.html',
  styleUrl: './show-stories.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ShowStoriesComponent implements OnInit, OnDestroy,AfterViewInit {
  ngAfterViewInit() {
    if(this.stories[this.indexSelected].images[this.key].type==='video'){
      const video = document.getElementById('storyVideo-'+this.indexSelected+'-'+this.key) as HTMLVideoElement;
    
      const playPromise = video.play();
      video.currentTime = 0;
      if (playPromise !== undefined) {
        playPromise.then(() => {
          // Autoplay started successfully
          console.log('Autoplay started!');
        }).catch((error) => {
          // Autoplay was prevented, show a play button or handle the error
          console.log('Autoplay was prevented:', error);
          // You can display a play button or trigger any UI change for the user to manually play
          video.muted = true; // Ensure video stays muted
        });
      }
  }
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
    this.fetchStories();
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
    this.play();
  }

  //pause all videos
  pauseAllVideos(){
    for (let index = 0; index < this.stories.length; index++) {
      for (let index2 = 0; index2 < this.stories[index].images.length; index2++) {
        if(this.stories[index].images[index2].type==='video'){
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

    if (this.indexSelected >= this.stories.length - 1 && this.key >= this.stories[this.indexSelected].images.length - 1) {
      setTimeout(() => {
        this.difference = 0;
        this.indexSelected = 0;
        this.key = 0;
      });
    } else if (this.key >= this.stories[this.indexSelected].images.length - 1) {
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
   if (this.indexSelected >= this.stories.length - 1 && this.key >= this.stories[this.indexSelected].images.length - 1) {
      this.difference = 0;
      this.indexSelected = 0;
      this.key = 0;
    } else if (this.key >= this.stories[this.indexSelected].images.length - 1) {
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
    if(this.stories[this.indexSelected].images[this.key].type==='video'){
      this.duration= this.defaultVideoDuration;
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
    if(this.stories[this.indexSelected].images[this.key].type==='video'){
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
    if(this.stories[this.indexSelected].images[this.key].type==='video'){
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
