import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PopoverController } from 'ionic-angular';
import { PopOverAlert } from '../popoveralert/popoveralert';

import { Api } from '../../providers/api';

import { SensorModel } from '../../models/sensor'
import { PlantModel } from '../../models/plant'
import { DeviceModel } from '../../models/device'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  sensordata: SensorModel[];
  plantdata: PlantModel[];
  devicedata: DeviceModel[];

  monitoringPlants: PlantModel[] = [];
  notmonitoringPlants: PlantModel[] = [];
  numPlants: number = 0;
  numDevices: number = 0;

  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, public api: Api) {
    //this.getPlantData();

    //this.getDeviceData();

    Promise.all([this.api.getSensorDataAsync(), this.api.getPlantDataAsync(), this.api.getDeviceDataAsync()])
      .then((res) => {
        [this.sensordata, this.plantdata, this.devicedata] = res;
        for (let plant of this.plantdata) {
          if (plant.Current && plant.Owned) {
            this.monitoringPlants.push(plant)
          } else if (!plant.Current && plant.Owned) {
            this.notmonitoringPlants.push(plant)
          }
        }
        this.numPlants = this.monitoringPlants.length;
        this.numDevices = this.devicedata.length;
      });

    //this.firstdelayer();
  }



  firstdelayer() {
    setTimeout(() => {
      console.log("run first delayer");
      this.api.getSensorDataAsync().then((res) => {
        this.seconddelayer();
      });
    }, 10000);

  };

  seconddelayer() {
    console.log("run second delayer");
    this.firstdelayer();
  }

  ionViewDidLoad() {
    console.log("loaded home");
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopOverAlert);
    popover.present({
      ev: myEvent
    });
  }

  getSensorData() {
    this.sensordata = this.api.retrieveSensorData();
    console.log(this.sensordata.length);
  }

  getPlantData() {
    this.plantdata = this.api.retrievePlantData();
  }

  getDeviceData() {
    this.devicedata = this.api.retrieveDeviceData();
  }

}
