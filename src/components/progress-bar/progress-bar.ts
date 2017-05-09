import { Component, Input, OnInit } from '@angular/core';

/**
 * Generated class for the ProgressBar component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.html'
})
export class ProgressBar implements OnInit {

  @Input('progress') progress;
  @Input('ideal') ideal;

  widthOfGradient: number = 30;

  constructor() {

  }

  ngOnInit() {
    if (this.ideal == null) {
      console.log('no ideal value passed to progress bar');
      this.ideal = 0;
      this.widthOfGradient = 0;
    }
  }
}
