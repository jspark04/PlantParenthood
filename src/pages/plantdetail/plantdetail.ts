import { Component, ViewChild } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';

import { PopoverController } from 'ionic-angular';
import { PopOverAlert } from '../popoveralert/popoveralert';

import { PlantsPage } from '../plants/plants';
import { TabsPage } from '../tabs/tabs';

import { Api } from '../../providers/api';

import { SensorModel } from '../../models/sensor'
import { PlantModel } from '../../models/plant'

import { Chart } from 'chart.js';

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
  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;

  barChart: any;
  doughnutChart: any;
  lineChart: any;

  sensordata: SensorModel[];
  plantdata: PlantModel[];

  currentCareID: number;
  filteredSensorData: SensorModel[] = [];
  filteredPlantData: PlantModel[] = [];
  mostRecentSensorData: SensorModel;

  constructor(public app: App, public navCtrl: NavController, public popoverCtrl: PopoverController, public api: Api, public navParams: NavParams) {
    //this.monitoringPlants = null;
    //this.notmonitoringPlants = null;

    this.getPlantData();
    this.getSensorData();
    console.log("care id that was passed:");
    console.log(this.navParams.get('careID'));

    this.currentCareID = this.navParams.get('careID');

    // Get plant and sensor data for just this particular careID (plant)
    for (let plant of this.plantdata) {
      if (plant.CareInfoID == this.currentCareID) {
        this.filteredPlantData.push(plant)
      }
    }
    for (let plant of this.sensordata) {
      if (plant.CareInfoID == this.currentCareID) {
        this.filteredSensorData.push(plant)
      }
    }

    this.mostRecentSensorData = this.filteredSensorData[this.filteredSensorData.length-1];

  }

  refresh() {
    //this.api.getSensorData().then();
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

    this.barChart = new Chart(this.barCanvas.nativeElement, {

      type: 'bar',
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        }
      }

    });

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

      type: 'doughnut',
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
      }

    });

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {

      type: 'line',
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "My First dataset",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40],
            spanGaps: false,
          }
        ]
      }

    });
  }

}
