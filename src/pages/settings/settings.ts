import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AppSettingsModel } from '../../models/appsetting';
import { Api } from '../../providers/api';

/**
 * Generated class for the Settings page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  appSettings: AppSettingsModel[];
  twilioEnabled: AppSettingsModel = {AppSettingsID: 1, Name: "", Value: ""};
  twilioPhoneNum: AppSettingsModel = {AppSettingsID: 1, Name: "", Value: ""};
  phonenuminput: string = "";

  constructor(public api: Api, public navCtrl: NavController, public navParams: NavParams) {
    //this.twilioPhoneNum = {AppSettingsID: 1, Name: "", Value: ""};
    this.api.getAppSettingsAsync().then((res) => {
      this.appSettings = [];
      this.appSettings = res;
      for (let setting of this.appSettings) {
        if (setting.Name == "TwilioNumber") {
          this.twilioPhoneNum = setting;
          this.phonenuminput = this.twilioPhoneNum.Value;
        }
        if (setting.Name == "TwilioEnabled") {
          this.twilioEnabled = setting;
        }
      }
      console.dir("new app settings after update");
      console.dir(this.appSettings);
    });
  }


  updateSetting(id, name, value) {
    if (value == 'true' || value == 'false') {
      if (value == 'true') {
        value = "false";
      } else {
        value = "true";
      }
    }
    this.api.updateAppSettingsAsync(id, name, value).then((res) => {
      this.api.getAppSettingsAsync().then((res) => {
        this.appSettings = [];
        this.appSettings = res;
        for (let setting of this.appSettings) {
          if (setting.Name == "TwilioNumber") {
            this.twilioPhoneNum = setting;
            this.phonenuminput = this.twilioPhoneNum.Value;
          }
          if (setting.Name == "TwilioEnabled") {
            this.twilioEnabled = setting;
          }
        }
        console.dir("new app settings after update");
        console.dir(this.appSettings);
      });
    });
  }


  ionViewDidEnter() {
    /*
    this.api.getAppSettingsAsync().then((res) => {
      console.dir("current app settings on load");
      this.appSettings = [];
      this.appSettings = res;
      console.dir(this.appSettings);

    });*/
  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad Settings');
  }

}
