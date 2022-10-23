import { LightningElement } from 'lwc';
import sendreq from '@salesforce/apex/TestCallout1.sendreq'
export default class Testapexcallout extends LightningElement {
    observation_time;
    temperature;
    weather_code;
    wind_speed;
    pressure;
    humidity;
    location;
    check = false;
    weather_icons;
    weather_descriptions;
  jsonout;
  area; 
  error;
  localtime;
  areachange(event){ 
    this.area = event.target.value;
  }
  submission(){
    this.check =true;
       sendreq({Place : this.area}).then(res => {
         this.jsonout = JSON.parse(res);
         console.warn(this.jsonout);
         this.observation_time = this.jsonout.current.observation_time;
         this.temperature =this.jsonout.current.temperature;
         this.wind_speed =this.jsonout.current.wind_speed;
        this.pressure = this.jsonout.current.pressure;
        this.location =this.jsonout.location.name;
        this.localtime =this.jsonout.location.localtime;
        this.weather_icons =this.jsonout.current.weather_icons[0];
        this.weather_descriptions=this.jsonout.current.weather_descriptions[0];
       }).catch(err => {
        this.error = err;
       })
    }
}