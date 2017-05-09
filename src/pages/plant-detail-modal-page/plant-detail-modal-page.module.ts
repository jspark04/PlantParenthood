import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlantDetailModalPage } from './plant-detail-modal-page';

@NgModule({
  declarations: [
    PlantDetailModalPage,
  ],
  imports: [
    IonicPageModule.forChild(PlantDetailModalPage),
  ],
  exports: [
    PlantDetailModalPage
  ]
})
export class PlantDetailModalPageModule {}
