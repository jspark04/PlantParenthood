import { Component, ViewChild } from '@angular/core';
import { App, NavController, NavParams, ModalController } from 'ionic-angular';

import { PopoverController } from 'ionic-angular';
import { PopOverAlert } from '../popoveralert/popoveralert';

import { PlantsPage } from '../plants/plants';
import { TabsPage } from '../tabs/tabs';
import { PlantDetailModalPage } from "../plant-detail-modal-page/plant-detail-modal-page";

import { Api } from '../../providers/api';

import { SensorModel } from '../../models/sensor'
import { PlantModel } from '../../models/plant'

import { Chart } from 'chart.js';
import * as moment from 'moment';

/**
 * Generated class for the Plants page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-plantdetail',
  templateUrl: 'plantdetail.html',
})
export class PlantDetailPage {

  sensordata: SensorModel[];
  plantdata: PlantModel[];

  currentCareID: number;
  filteredSensorData: SensorModel[] = [];
  filteredPlantData: PlantModel[] = [];
  mostRecentSensorData: SensorModel;
  lastUpdatedDateTime: string;

  onPage: boolean;

  autocaringEnabled: boolean = false;
  autowaterEnabled: boolean = false;
  autolightEnabled: boolean = false;

  constructor(public modalCtrl: ModalController, public app: App, public navCtrl: NavController, public popoverCtrl: PopoverController, public api: Api, public navParams: NavParams) {
    //this.monitoringPlants = null;
    //this.notmonitoringPlants = null;

    console.log("care id that was passed:");
    console.log(this.navParams.get('careID'));

    this.refresh();

    this.onPage = true;
    this.realTimeDataProcess();

  }

  ionViewDidEnter() {
    this.onPage = true;
    this.refresh();
  }

  ionViewDidLeave() {
    this.onPage = false;
  }

  realTimeDataProcess() {
    setTimeout(() => {
      console.log("RUNNING BACKGROUND ASYNC PROCESS");
      this.api.getSensorDataAsync().then((res) => {
        this.refresh();
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

  refresh() {
    console.log("refreshing data models on this plant detail page");
    this.currentCareID = this.navParams.get('careID');

    // Get plant and sensor data for just this particular careID (plant)
    this.filteredPlantData = [];
    this.filteredSensorData = [];
    for (let plant of this.api.plantdata) {
      if (plant.CareInfoID == this.currentCareID) {
        this.filteredPlantData.push(plant)
      }
    }
    for (let plant of this.api.sensordata) {
      if (plant.CareInfoID == this.currentCareID) {
        this.filteredSensorData.push(plant)
      }
    }

    this.mostRecentSensorData = this.filteredSensorData[this.filteredSensorData.length-1];

    this.lastUpdatedDateTime = moment(this.mostRecentSensorData.CreatedDate).format('MMM DD, YYYY h:mm A');

  }

  openModal(measure, careid, sensordata, plantdata) {
    let obj = {measure: measure, careID: careid, sensordata: sensordata, plantdata: plantdata};
    let myModal = this.modalCtrl.create(PlantDetailModalPage, obj);
    myModal.present();
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

  goBackToPlants() {
    let nav = this.app.getRootNav();
    nav.setRoot(TabsPage, {select: 1});
  }

  ionViewDidLoad() {
    //this.title = this.navParams.get('item').title;
    //this.description = this.navParams.get('item').description;
    console.log('ionViewDidLoad PlantDetail');

  }

}
