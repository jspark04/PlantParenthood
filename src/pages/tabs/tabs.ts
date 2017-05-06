import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Tabs } from 'ionic-angular';

import { HomePage } from '../home/home';
import { PlantsPage } from '../plants/plants';
import { DevicesPage } from '../devices/devices';
//import { ContactPage } from '../contact/contact';

@Component({
  selector: 'main-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = PlantsPage;
  tab3Root = DevicesPage;

  goToTab: number;
  @ViewChild('myTabs') tabRef: Tabs;

  constructor(public navParams: NavParams, public navCtrl: NavController) {
    console.log("main tab ctrl get passed:" + this.navParams.get('select'));
    if (this.navParams.get('select')) {
      this.goToTab = this.navParams.get('select');
    }
  }

  ionViewDidEnter() {
    if (this.goToTab) {
      this.tabRef.select(this.goToTab);
    }

  }
}
