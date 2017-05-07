import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainHeader } from './main-header';

@NgModule({
  declarations: [
    MainHeader,
  ],
  imports: [
    IonicPageModule.forChild(MainHeader),
  ],
  exports: [
    MainHeader
  ]
})
export class MainHeaderModule {}
