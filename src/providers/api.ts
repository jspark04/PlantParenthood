import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { PlantModel } from '../models/plant'
import { SensorModel } from '../models/sensor'
import { DeviceModel } from '../models/device'
/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = 'http://plantparenthood.azurewebsites.net/api';
  plantdata: PlantModel[] = [];
  sensordata: SensorModel[] = [];
  devicedata: DeviceModel[] = [];
  sensor: SensorModel;
  plant: PlantModel;
  device: DeviceModel;
  constructor(public http: Http) {
    this.http = http;
    //this.plantdata = null;
    //this.sensordata = null;
    //this.sensor = null;
    //this.devicedata = null;
    this.getSensorData();
    this.getPlantData();
    this.getDeviceData();
  }
  getSensorData() {
    console.log("getting sensor data from api");
    //this.http.get(this.url + '/SensorDatas/GetSensorData')
    this.http.get('./assets/mocks/sensordata.json')
      .map(res => res.json())
      .subscribe(
        result => {
          for (let x of result) {
            // Put all the data into the placeholder from JSON result
            this.sensor = new SensorModel(
              x.SensorDataID,
              x.CareInfoID,
              new Date(x.CreatedDate),
              x.Humidity,
              x.Light,
              x.SoilMoisture,
              x.Temperature
            );
            // Push placeholder object into the sensordata array
            this.sensordata.push(this.sensor);
          }
          //this.sensordata = result;
          //this.newsData=result.data.children;
          console.log("Success : "+ result);
        },
        err =>{
          console.error("Error : "+err);
        } ,
        () => {
          console.log('getSensorData completed');
          console.dir(this.sensordata)
        }
      );
  }
  retrieveSensorData() {
    console.log(this.sensordata);
    return this.sensordata;
  }
  getPlantData() {
    console.log("getting plant data from api");
    //this.http.get(this.url + '/CareDatas/GetCareData')
    this.http.get('./assets/mocks/plantdata.json')
      .map(res => res.json())
      .subscribe(
        result => {
          for (let x of result) {
            // Put all the data into the placeholder from JSON result
            this.plant = new PlantModel(
              x.CareInfoID,
              x.PlantName,
              x.SoilMoisture,
              x.Light,
              x.Temperature,
              x.Humidity,
              x.Owned,
              x.Current
            );
            // Push placeholder object into the sensordata array
            this.plantdata.push(this.plant);
          }
          //this.newsData=result.data.children;
          console.log("Success : "+ result);
        },
        err =>{
          console.error("Error : "+err);
        } ,
        () => {
          console.log('getPlantData completed');
          console.dir(this.plantdata)
        }
      );
  }
  retrievePlantData() {
    return this.plantdata;
  }
  getDeviceData() {
    console.log("getting device data from api");
    //this.http.get(this.url + '/DeviceDatas/GetDeviceData')
    this.http.get('./assets/mocks/devicedata.json')
      .map(res => res.json())
      .subscribe(
        result => {
          for (let x of result) {
            // Put all the data into the placeholder from JSON result
            this.device = new DeviceModel(
              x.DeviceID,
              x.CareInfoID,
              x.DeviceName,
              x.DeviceType,
              new Date(x.CreatedDate),
              x.BatteryLevel
            );
            // Push placeholder object into the sensordata array
            this.devicedata.push(this.device);
          }
          //this.newsData=result.data.children;
          console.log("Success : "+ result);
        },
        err =>{
          console.error("Error : "+err);
        } ,
        () => {
          console.log('getDeviceData completed');
          console.dir(this.devicedata)
        }
      );
  }
  retrieveDeviceData() {
    return this.devicedata;
  }
  get(endpoint: string, params?: any, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }
    // Support easy query params for GET requests
    if (params) {
      let p = new URLSearchParams();
      for(let k in params) {
        p.set(k, params[k]);
      }
      // Set the search field if we have params and don't already have
      // a search field set in options.
      options.search = !options.search && p || options.search;
    }
    return this.http.get(this.url + '/' + endpoint, options);
  }
  post(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.post(this.url + '/' + endpoint, body, options);
  }
  put(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body, options);
  }
  delete(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.post(this.url + '/' + endpoint, body, options);
  }
  patch(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body, options);
  }
}
