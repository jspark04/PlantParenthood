import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PlantDetailPage } from '../plantdetail/plantdetail';
import { PlantsPage } from '../plants/plants';
import { DevicesPage } from '../devices/devices';
//import { ContactPage } from '../contact/contact';

@Component({
  templateUrl: 'planttabs.html'
})
export class PlantTabsPage {

  careID: number;

  tab1Root = PlantDetailPage;
  tab2Root = PlantDetailPage;
  tab3Root = PlantDetailPage;
  tab4Root = PlantDetailPage;

  constructor(public navParams: NavParams) {
    console.log(this.navParams); // returns NavParams {data: Object}
    this.careID = this.navParams.get('careID');

    console.log("plant tabs and care id")
    console.log(this.careID);
  }
}
