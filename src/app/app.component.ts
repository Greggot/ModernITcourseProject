import { MapsAPILoader } from '@agm/core';
import { Component, OnInit } from '@angular/core';
import { HTTPclientServiceService } from './httpclient-service.service';
import {MapPoint} from './map-point/map-point.module';
import { MapComponent } from './map/map.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  /*title = 'unformalMeet';
  stdlat = 51.758808;
  stdlng = 39.17695;

  lat = 51.758808;
  lng = 39.17695;

  tempPoint: MapPoint;
  HTTPservice: HTTPclientServiceService;

  markers: MapPoint[] =[];
  results:any = [];*/

  ngOnInit()
  {
    /*this.tempPoint = ({
      lat: this.lat,
      lng: this.lng,
      name: "TestPoint",
      description: "NaN",
      startTime: new Date("Dec 01 2022 00:00:00"),
      endTime: new Date("Dec 01 2022 00:00:00"),
      contacts: "NaN",
      price: 0.0,
      additionalInfo: "NaN"
    });
    this.markers.push(this.tempPoint);

    var MapElement = document.getElementById('Map')
    if(MapElement)
      MapElement.addEventListener('keydown', (e) => {
        if(e.key == "Backspace" || e.key == "Escape")
          this.HideSubmitElement();
        if(e.key == "Enter")
          this.SubmitEvent(e);
        console.log(e.key);
      });*/
  }

  /*MapClickEvent(event: any)
  {
    var MapElement = document.getElementById('Map')
    if(MapElement)
      MapElement.setAttribute("style", "width: 80vw;");

    var HTMLElement = document.getElementById('SubmitElement')
    if(HTMLElement)
      HTMLElement.setAttribute("style", "display: block;");

    var SearchElement = document.getElementById('timeSearch')
    if(SearchElement)
      SearchElement.setAttribute("style", "display: none;");

    console.log(event.coords.lat);
    console.log(event.coords.lng);

    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
  }

  HideSubmitElement()
  {
    var MapElement = document.getElementById('Map')
    if(MapElement)
      MapElement.setAttribute("style", "width: 97vw;");

    var HTMLElement = document.getElementById('SubmitElement')
    if(HTMLElement)
      HTMLElement.setAttribute("style", "display: none;");

    var SearchElement = document.getElementById('timeSearch')
    if(SearchElement)
      SearchElement.setAttribute("style", "display: block; align: center;");
  }

  onMapReady(event: any) {

  }

  SubmitEvent(event: any)
  {
    this.HideSubmitElement();

    var inputStartTime = (<HTMLInputElement>document.getElementById('StartTime')).value;
    var inputEndTime = (<HTMLInputElement>document.getElementById('EndTime')).value;
    var inputPrice = (<HTMLInputElement>document.getElementById('Price')).value;
    var inputDescription = (<HTMLInputElement>document.getElementById('Description')).value;
    var inputContacts = (<HTMLInputElement>document.getElementById('Contacts')).value;
    var inputAddress = (<HTMLInputElement>document.getElementById('Address')).value;

    console.log(inputStartTime);
    console.log(inputEndTime);
    console.log(inputPrice);
    console.log(inputDescription);
    console.log(inputContacts);
    console.log(inputAddress);

    this.tempPoint = ({
      lat: this.lat,
      lng: this.lng,
      name: "Nan",
      description: inputDescription,
      startTime: new Date(inputStartTime),
      endTime: new Date(inputEndTime),
      contacts: inputContacts,
      price: parseFloat(inputPrice),
      additionalInfo: inputAddress
    });
    this.markers.push(this.tempPoint);
    this.HTTPservice.postMapPoint(this.tempPoint).subscribe(
      (data: any) => { console.log(data); },
      error => { console.log(error); }
    )
  }

  CloseEvent(event: any)
  {
    this.HideSubmitElement();
  }

  MarkerClickEvent(event: any)
  {
    console.log(this.markers[event._id - 1]);
  }*/
}
