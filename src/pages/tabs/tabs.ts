import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { PlantsPage } from '../plants/plants';
//import { ContactPage } from '../contact/contact';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = PlantsPage;
  //tab3Root = ContactPage;

  constructor() {

  }
}
