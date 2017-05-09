import { Component, ViewChild } from '@angular/core';
import { IonicPage, App, NavController, NavParams, ViewController } from 'ionic-angular';

import { Api } from '../../providers/api';

import { SensorModel } from '../../models/sensor'
import { PlantModel } from '../../models/plant'

import { Chart } from 'chart.js';

/**
 * Generated class for the PlantDetailModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-plant-detail-modal-page',
  templateUrl: 'plant-detail-modal-page.html',
})
export class PlantDetailModalPage {
  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;

  measure: string = "";
  careID: number;
  plantname: string = "";
  filteredSensorData: SensorModel[] = [];
  filteredPlantData: PlantModel[] = [];
  chartData: {x: Date, y: number}[] = [];

  tooltiplabel: string;
  yaxislabel: string;
  measureunits: string;
  measureticks: any;
  customcallback: any;


  constructor(public app: App, public api: Api, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.measure = this.navParams.get('measure');
    this.careID = this.navParams.get('careID');
    this.filteredSensorData = this.navParams.get('sensordata');
    this.filteredPlantData = this.navParams.get('plantdata');
    console.dir(navParams);
    //this.refresh();
  }

  createDataObject() {

    switch(this.measure) {
      case "Soil Moisture":
        for (let datapt of this.filteredSensorData) {
          this.chartData.push({
            x: datapt.CreatedDate,
            y: datapt.SoilMoisture
          })
        }
        this.measureunits = "%";
        this.yaxislabel = "Soil Moisture Level";
        this.measureticks = {
          min: 0,
          max: 100
        };
        this.customcallback = {
          label: function(tooltipItem, data) {
            //console.dir(tooltipItem);
            let labelstring = "Soil moisture level: " + tooltipItem.yLabel.toString() + "%";
            //console.log(labelstring);
            return labelstring;
          },
          title: function(tooltipItem, data) {
            //console.dir(tooltipItem[0]);
            //console.dir(data);
            let date = tooltipItem[0].xLabel;
            let datestring = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " on " + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
            return datestring;
          }
        }
        break;
      case "Light":
        for (let datapt of this.filteredSensorData) {
          this.chartData.push({
            x: datapt.CreatedDate,
            y: datapt.Light
          })
        }
        this.measureunits = "%";
        this.yaxislabel = "Light Level";
        this.measureticks = {
          min: 0,
          max: 100
        };
        this.customcallback = {
          label: function(tooltipItem, data) {
            //console.dir(tooltipItem);
            let labelstring = "Light level: " + tooltipItem.yLabel.toString() + "%";
            //console.log(labelstring);
            return labelstring;
          },
          title: function(tooltipItem, data) {
            //console.dir(tooltipItem[0]);
            //console.dir(data);
            let date = tooltipItem[0].xLabel;
            let datestring = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " on " + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
            return datestring;
          }
        }
        break;
      case "Temperature":
        for (let datapt of this.filteredSensorData) {
          this.chartData.push({
            x: datapt.CreatedDate,
            y: datapt.Temperature
          })
        }
        this.measureunits = "deg. C";
        this.yaxislabel = "Temperature";
        this.measureticks = {};
        this.customcallback = {
          label: function(tooltipItem, data) {
            //console.dir(tooltipItem);
            let labelstring = "Temperature: " + tooltipItem.yLabel.toString() + "deg. C";
            //console.log(labelstring);
            return labelstring;
          },
          title: function(tooltipItem, data) {
            //console.dir(tooltipItem[0]);
            //console.dir(data);
            let date = tooltipItem[0].xLabel;
            let datestring = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " on " + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
            return datestring;
          }
        }
        break;
      case "Humidity":
        for (let datapt of this.filteredSensorData) {
          this.chartData.push({
            x: datapt.CreatedDate,
            y: datapt.Humidity
          })
        }
        this.measureunits = "%";
        this.yaxislabel = "Humidity Level";
        this.measureticks = {
          min: 0,
          max: 100
        };
        this.customcallback = {
          label: function(tooltipItem, data) {
            //console.dir(tooltipItem);
            let labelstring = "Humidity level: " + tooltipItem.yLabel.toString() + "%";
            //console.log(labelstring);
            return labelstring;
          },
          title: function(tooltipItem, data) {
            //console.dir(tooltipItem[0]);
            //console.dir(data);
            let date = tooltipItem[0].xLabel;
            let datestring = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " on " + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
            return datestring;
          }
        }
        break;

    }


    console.log("chart data:");
    console.dir(this.chartData);
  }

/*
  refresh() {
    this.careID = this.navParams.get('careID');

    // Get plant and sensor data for just this particular careID (plant)
    this.filteredPlantData = [];
    this.filteredSensorData = [];
    for (let plant of this.api.plantdata) {
      if (plant.CareInfoID == this.careID) {
        this.filteredPlantData.push(plant)
      }
    }
    for (let plant of this.api.sensordata) {
      if (plant.CareInfoID == this.careID) {
        this.filteredSensorData.push(plant)
      }
    }

  }*/

  closeModal() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlantDetailModalPage');

    this.createDataObject();

    Chart.defaults.global.defaultFontColor = '#FFF';
    var config = {
      type: 'line',
      data: {
        datasets: [{
          //label: "Dataset with date object point data",
          //backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
          //borderColor: window.chartColors.blue,
          fill: false,
          data: this.chartData,
          borderWidth: 1,
          borderColor: '#FFF',
          pointBackgroundColor: '#FFF'
        }]
      },
      options: {
        responsive: true,
        title:{
          display:false,
          text:"Soil Moisture Historical"
        },
        legend:{
          display: false
        },
        tooltips: {
          displayColors: false,
          callbacks: this.customcallback
        },
        scales: {
          xAxes: [{
            type: "time",
            display: true,
            gridLines: {
              drawBorder: true,
              drawOnChartArea: false
            },
            scaleLabel: {
              display: true,
              labelString: 'Time'
            },
            time: {
              unit: 'day',
              //tooltipFormat: 'MMM D, hA'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: this.yaxislabel + " (" + this.measureunits + ")"
            },
            ticks: this.measureticks
          }]
        }
      }
    };

    this.lineChart = new Chart(this.lineCanvas.nativeElement, config);

    /*this.lineChart = new Chart(this.lineCanvas.nativeElement, {

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

    });*/
  }

}
