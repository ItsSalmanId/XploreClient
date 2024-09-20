import { Component, OnInit, OnDestroy, ViewEncapsulation, Input } from '@angular/core';
import { storiesData } from '../../../../assets/imagex/stories'; // Import your stories data



@Component({
  selector: 'app-show-stories',
  templateUrl: './show-stories.component.html',
  styleUrl: './show-stories.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ShowStoriesComponent implements OnInit, OnDestroy {
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


  unmuteStory(){

  }

  muteStory(){

  }

  // Fetch stories
  fetchStories() {
    this.stories = storiesData; // Assuming `storiesData` is the data file you imported
    this.play();
  }

  // Select slide
  selectSlide(index: number) {
    this.difference += this.indexSelected - index;
    this.indexSelected = index;
    this.key = 0;
    this.reset();
  }

  // Next story
  next(index: number) {
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
    this.percent = 0;
    clearInterval(this.interval);
    clearInterval(this.progress);
    this.play();
  }

  // Pause the story
  pauseStory() {
    this.isPaused = true;
    this.pausePer = this.percent;
    clearInterval(this.progress);
    clearInterval(this.interval);
    this.newDur = this.duration - (this.pausePer * this.duration) / 100;
  }

  // Resume the story
  playStory() {
    this.isPaused = false;
    this.play();
  }

  // Cleanup when component is destroyed
  ngOnDestroy() {
    clearInterval(this.progress);
    clearInterval(this.interval);
  }
}
