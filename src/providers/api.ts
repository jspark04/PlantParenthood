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
    /*
    this.getSensorDataAsync().then((res) => {
      console.log("Promise returned from getSensorDataAsync")
      console.dir(res);
    });
    this.getPlantDataAsync().then((res) => {
      console.log("Promise returned from getPlantDataAsync")
      console.dir(res);
    });
    this.getDeviceDataAsync().then((res) => {
      console.log("Promise returned from getDeviceDataAsync")
      console.dir(res);
    });*/

  }

  promise = new Promise((resolve, reject) => {
    resolve(123);
  });

  getSensorDataAsync(): Promise<any> {
    this.sensordata = []; // Clear current array of sensor data
    console.log("Calling getSensorDataAsync function from API");
    return new Promise((resolve,reject) => {
      console.log("Get request for sensor data sent to API");
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
                x.Temperature,
                x.LightSumDay,
                x.SoilMoistureCondition,
                x.LightCondition,
                x.TemperatureCondition,
                x.HumidityCondition,
                x.LightSumDayCondition
              );
              // Push placeholder object into the sensordata array
              this.sensordata.push(this.sensor);
            }
            //this.sensordata = result;
            //this.newsData=result.data.children;
            console.log("Success : "+ result);
            resolve(this.sensordata);
          },
          err =>{
            console.error("Error : "+err);
            reject(err);
          } ,
          () => {
            console.log('GetSensorData request to API finished');
          }
        );
    });
  }
  retrieveSensorData() {
    console.log(this.sensordata);
    return this.sensordata;
  }

  getPlantDataAsync(): Promise<any> {
    this.plantdata = []; // Clear current array of sensor data
    console.log("Calling getPlantDataAsync function from API");
    return new Promise((resolve,reject) => {
      console.log("Get request for plant data sent to API");
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
              // Push placeholder object into the plantdata array
              this.plantdata.push(this.plant);
            }
            //this.newsData=result.data.children;
            console.log("Success : "+ result);
            resolve(this.plantdata);
          },
          err =>{
            console.error("Error : "+err);
            reject(err);
          } ,
          () => {
            console.log('GetPlantData request to API finished');
          }
        );
    });
  }
  retrievePlantData() {
    return this.plantdata;
  }

  getDeviceDataAsync(): Promise<any> {
    this.devicedata = []; // Clear current array of device data
    console.log("Calling getDeviceDataAsync function from API");
    return new Promise((resolve,reject) => {
      console.log("Get request for device data sent to API");
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
              resolve(this.devicedata);
            }
            //this.newsData=result.data.children;
            console.log("Success : "+ result);
          },
          err =>{
            console.error("Error : "+err);
            reject(err);
          } ,
          () => {
            console.log('GetDeviceData request to API finished');
          }
        );
    });
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
