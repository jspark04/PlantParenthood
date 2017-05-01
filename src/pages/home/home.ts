import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PopoverController } from 'ionic-angular';
import { PopOverAlert } from '../popoveralert/popoveralert';

import { Api } from '../../providers/api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ Api ]
})
export class HomePage {

  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, public api: Api) {

  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopOverAlert);
    popover.present({
      ev: myEvent
    });
  }

  getData() {
    this.api.getSensorData().subscribe(
      result => {
        //this.newsData=result.data.children;
        console.log("Success : "+ result);
      },
      err =>{
        console.error("Error : "+err);
      } ,
      () => {
        console.log('getData completed');
      }
    );
  }
}
