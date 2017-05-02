import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PopoverController } from 'ionic-angular';
import { PopOverAlert } from '../popoveralert/popoveralert';

import { Api } from '../../providers/api';

import { SensorModel } from '../../models/sensor'
import { PlantModel } from '../../models/plant'
import { DeviceModel } from '../../models/device'

/**
 * Generated class for the Plants page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-devices',
  templateUrl: 'devices.html',
})
export class DevicesPage {

  devicedata: DeviceModel[];
  plantdata: PlantModel[];

  extendeddevicedata: {device: DeviceModel, plantname: string}[] = [];

  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, public api: Api) {
    //this.monitoringPlants = null;
    //this.notmonitoringPlants = null;

    this.getDeviceData();
    this.getPlantData();

    for (let device of this.devicedata) {
      for (let plant of this.plantdata) {
        if (device.CareInfoID == plant.CareInfoID) {
          this.extendeddevicedata.push({device: device, plantname: plant.PlantName});
        }
      }
    }
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopOverAlert);
    popover.present({
      ev: myEvent
    });
  }

  getDeviceData() {
    this.devicedata = this.api.retrieveDeviceData();
  }

  getPlantData() {
    this.plantdata = this.api.retrievePlantData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Plants');
  }

}
