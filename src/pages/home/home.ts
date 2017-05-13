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
  onPage: boolean;
  notifications: string[] = [];

  autoCareEnabled: boolean = false;

  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, public api: Api) {

    console.log("home constructor executed");

    this.onPage = true;
    //this.realTimeDataProcess();
  }

  refreshNumbers() {
    this.monitoringPlants = [];
    this.notmonitoringPlants = [];

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
        this.numDevices = this.api.devicedata.length;

        this.notifications = [];
        for (let plant of this.monitoringPlants) {
          for (let notif of this.api.checkNotifications(this.monitoringPlants[0])) {
            this.notifications.push(notif);
          }
        }
      });

  }

  realTimeDataProcess() {
    setTimeout(() => {
      console.log("RUNNING BACKGROUND ASYNC PROCESS");
      this.api.getSensorDataAsync().then((res) => {
        this.checkIfStillOnPage();
      });
    }, 10000);
  };
  checkIfStillOnPage() {
    console.log("run second delayer");
    if (this.onPage) {
      this.realTimeDataProcess();
    }
  }

  ionViewDidEnter() {
    this.onPage = true;
    this.refreshNumbers();
  }

  ionViewDidLeave() {
    this.onPage = false;
  }

  suggestionsGenerator() {

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
    this.api.getSensorDataAsync();
  }

  getPlantData() {
    this.api.getPlantDataAsync();
  }

  getDeviceData() {
    this.api.getDeviceDataAsync();
  }

}
