import { Component } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';

import { PopoverController } from 'ionic-angular';
import { PopOverAlert } from '../popoveralert/popoveralert';

import { Api } from '../../providers/api';

import { SensorModel } from '../../models/sensor'
import { PlantModel } from '../../models/plant'

import { PlantTabsPage } from '../../pages/planttabs/planttabs';

/**
 * Generated class for the Plants page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-plants',
  templateUrl: 'plants.html',
})
export class PlantsPage {

  sensordata: SensorModel[];
  plantdata: PlantModel[];

  monitoringPlants: PlantModel[] = [];
  notmonitoringPlants: PlantModel[] = [];



  constructor(public app: App, public navCtrl: NavController, public popoverCtrl: PopoverController, public api: Api) {
    //this.monitoringPlants = null;
    //this.notmonitoringPlants = null;

    this.getPlantData();
    this.getSensorData();

    for (let plant of this.plantdata) {
      if (plant.Current && plant.Owned) {
        this.monitoringPlants.push(plant)
      } else if (!plant.Current && plant.Owned) {
        this.notmonitoringPlants.push(plant)
      }
    }
  }

  /*presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopOverAlert);
    popover.present({
      ev: myEvent
    });
  }*/

  getSensorData() {
    this.sensordata = this.api.retrieveSensorData();
  }

  getPlantData() {
    this.plantdata = this.api.retrievePlantData();
  }

  viewPlantDetails(id){
    let nav = this.app.getRootNav();
    nav.setRoot(PlantTabsPage, {careID: id});
    //this.navCtrl.push(PlantTabsPage, {
    //  careID: id
    //});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Plants');
  }

}
