import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { PlantsPage } from '../pages/plants/plants'
import { DevicesPage } from '../pages/devices/devices'
import { ListPage } from '../pages/list/list';

import { TabsPage } from '../pages/tabs/tabs'

import { Api } from '../providers/api'

@Component({
  templateUrl: 'app.html',
  providers: [ Api ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = TabsPage;

  upperPages: Array<{title: string, component: any}>;
  lowerPages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public api: Api) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.upperPages = [
      { title: 'Home', component: TabsPage },
      { title: 'Login/Account', component: TabsPage },
      { title: 'Settings', component: TabsPage }
    ];

    this.lowerPages = [
      { title: 'Shop', component: TabsPage },
      { title: 'Help', component: TabsPage },
      { title: 'About', component: TabsPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      console.log("running api get stuff");

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
