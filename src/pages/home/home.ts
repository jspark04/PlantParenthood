import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PopoverController } from 'ionic-angular';
import { PopOverAlert } from '../popoveralert/popoveralert';

import { Api } from '../../providers/api';

import { SensorModel } from '../../models/sensor'
import { PlantModel } from '../../models/plant'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  sensordata: SensorModel[];
  plantdata: PlantModel[];

  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, public api: Api) {

  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopOverAlert);
    popover.present({
      ev: myEvent
    });
  }

  getSensorData() {
    this.sensordata = this.api.retrieveSensorData();
  }

  getPlantData() {
    this.plantdata = this.api.retrievePlantData();
  }
}
