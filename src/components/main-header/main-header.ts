import { Component } from '@angular/core';
import { PopOverAlert } from '../../pages/popoveralert/popoveralert';
import { PopoverController } from 'ionic-angular';

/**
 * Generated class for the MainHeader component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'main-header',
  templateUrl: 'main-header.html'
})
export class MainHeader {

  constructor(public popoverCtrl: PopoverController) {

  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopOverAlert);
    popover.present({
      ev: myEvent
    });
  }

}
