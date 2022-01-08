import { HTTPclientServiceService } from './../httpclient-service.service';
import { MapPoint } from './../map-point/map-point.module';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { AgmMarker } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  title = 'unformalMeet';

  //Standart map position
  stdlat = 51.758808;
  stdlng = 39.17695;

  // Object used for transferring data between input form and map and vise versa
  tempPoint: MapPoint;
  // Position of target marker used to specify party position
  lat = 51.758808;
  lng = 39.17695;

  // Position used for context menu to appear at
  menuTopLeftPosition =  {x: 0, y: 0}

  // Register window size thus we can correctly set input pannel size
  windowWidth = 0;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) { this.windowWidth = window.innerWidth; }

  // Set trigger for a context menu to open on context menu
  @ViewChild('contextTrigger') contextTrigger: MatMenuTrigger;

  // Overall map points
  markers: MapPoint[] = [];
  // Flag making all points invisible during search process
  isMarkerVisible = true;
  // Found points
  results:any = [];

  constructor(private HTTPservice: HTTPclientServiceService) {}

  /**
   * @brief Setup map key events, GET points from server, start cursour position registration
   */
  ngOnInit(): void
  {
    var MapElement = document.getElementById('Map')
    if(MapElement)
      MapElement.addEventListener('keydown', (e) => {
        if(e.key == "Backspace" || e.key == "Escape")
          this.HideSubmitElement();
        if(e.key == "Enter")
          this.SubmitEvent(e);
    });

    this.HTTPservice.getAllPoints().subscribe(
      (data: any) =>
        {
          console.log(data);
          data.forEach((point: { id: number, lat: any; lng: any; name: any; description: any; startTime: string | number | Date; endTime: string | number | Date; contacts: any; price: any; }) => {
            this.tempPoint = ({
              id: point.id,
              lat: point.lat,
              lng: point.lng,
              name: point.name,
              description: point.description,
              startTime: new Date(point.startTime),
              endTime: new Date(point.endTime),
              contacts: point.contacts,
              price: point.price,
              additionalInfo: "NaN"
            });
            this.markers.push(this.tempPoint);
          });
        },
      error => { console.log(error); }
    )

    document.addEventListener("mousemove", (event) => {
      this.menuTopLeftPosition.x = event.clientX;
      this.menuTopLeftPosition.y = event.clientY;
    });
  }

  /**
   * @brief Temporary marker handle: show input fields for a point on the map
   */
  MapClickEvent(event: any)
  {
    this.ShowSubmitElement();
    var ChangePointButton = document.getElementById('ChangePoint')
    if(ChangePointButton)
      ChangePointButton.setAttribute("style", "display: none;");
    var ChangePointButton = document.getElementById('AcceptPoint')
    if(ChangePointButton)
      ChangePointButton.setAttribute("style", "display: inline;");

    console.log(event.coords.lat);
    console.log(event.coords.lng);

    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
  }
  /**
   * @brief Hide input fields, make map occupy full screen width
   */
  HideSubmitElement()
  {
    var MapElement = document.getElementById('Map')
    if(MapElement)
      MapElement.setAttribute("style", "width: 97vw; height: 85vh;");

    var HTMLElement = document.getElementById('SubmitElement')
    if(HTMLElement)
      HTMLElement.setAttribute("style", "display: none;");

    var SearchElement = document.getElementById('timeSearch')
    if(SearchElement)
      SearchElement.setAttribute("style", "display: block; align: center;");

    var MarkerElement = document.getElementById('TargetMarker')
    if(MarkerElement)
      MarkerElement.setAttribute("style", "display: none;");
  }
  ShowSubmitElement()
  {
    var MapElement = document.getElementById('Map')
    if(MapElement)
    {
      if(this.windowWidth >= 750)
        MapElement.setAttribute("style", "width: 80vw; height: 98vh;");
      else
        MapElement.setAttribute("style", "width: 95vw; height: 98vh;");
    }

    var HTMLElement = document.getElementById('SubmitElement')
    if(HTMLElement)
      HTMLElement.setAttribute("style", "display: block; width: 100%;");

    var SearchElement = document.getElementById('timeSearch')
    if(SearchElement)
      SearchElement.setAttribute("style", "display: none;");
  }

  getDataFromInputForm()
  {
    this.tempPoint.name = (<HTMLInputElement>document.getElementById('Name')).value;
    this.tempPoint.startTime = new Date((<HTMLInputElement>document.getElementById('StartTime')).value);
    this.tempPoint.endTime = new Date((<HTMLInputElement>document.getElementById('EndTime')).value);
    this.tempPoint.price = parseFloat((<HTMLInputElement>document.getElementById('Price')).value);
    this.tempPoint.description = (<HTMLInputElement>document.getElementById('Description')).value;
    this.tempPoint.contacts = (<HTMLInputElement>document.getElementById('Contacts')).value;
  }

  /**
   * @brief Get input fileds' values, add to markers[] and make POST request
   */
  SubmitEvent(event: any)
  {
    this.HideSubmitElement();

    this.tempPoint = new MapPoint();
    this.tempPoint.lat = this.lat;
    this.tempPoint.lng = this.lng;
    this.getDataFromInputForm();

    this.HTTPservice.postMapPoint(this.tempPoint).subscribe(
      (data: any) =>
      {
        this.tempPoint.id = data.id;
        console.log(data);
      },
      error => { console.log(error); }
    )
    this.markers.push(this.tempPoint);
  }

  /**
   * @brief Input fields' data isn't saved
   */
  CloseEvent(event: any)
  {
    this.HideSubmitElement();
  }

  /**
   * @brief Show menu and buttons 'Change'-'Delete'
   */
  MarkerClickEvent(event: any)
  {
    console.log(event);
    this.markers.forEach(element => {
      if(element.lat == event.latitude && element.lng == event.longitude)
      {
        this.tempPoint = element;
        console.log("found");
      }
    });
    console.log(this.menuTopLeftPosition);

    var context = document.getElementById('ContextMenu');
    if(context != null)
    {
      context.style.position = "absolute";
      context.style.left = this.menuTopLeftPosition.x + 'px';
      context.style.top = this.menuTopLeftPosition.y + 'px';
    }

    this.contextTrigger.openMenu();
  }
  /**
   * @brief Remove element from markers[] and make DELETE request
   */
  DeleteMapPoint()
  {
    console.log('Delete %s', this.tempPoint.description);
    this.HTTPservice.removePoint(this.tempPoint).subscribe(
      (data: any) => { console.log(data); },
        error => { console.log(error); }
    );
    this.markers.forEach((element, index)=>{
      if(element.id == this.tempPoint.id)
        this.markers.splice(index, 1);
   });
  }

  ChangeMapPoint()
  {
    console.log(`Editing ${this.tempPoint.id} (${this.tempPoint.name})`);
    (document.getElementById('Name') as HTMLInputElement).value = this.tempPoint.name;
    (document.getElementById('StartTime') as HTMLInputElement).value =
      this.tempPoint.startTime.toISOString().slice(0, 16);
    (document.getElementById('EndTime') as HTMLInputElement).value =
      this.tempPoint.endTime.toISOString().slice(0, 16);
    (document.getElementById('Price') as HTMLInputElement).value = this.tempPoint.price.toString();
    (document.getElementById('Description') as HTMLInputElement).value = this.tempPoint.description;
    (document.getElementById('Contacts') as HTMLInputElement).value = this.tempPoint.contacts;

    this.ShowSubmitElement();
    var ChangePointButton = document.getElementById('ChangePoint')
    if(ChangePointButton)
      ChangePointButton.setAttribute("style", "display: inline;");
    var ChangePointButton = document.getElementById('AcceptPoint')
    if(ChangePointButton)
      ChangePointButton.setAttribute("style", "display: none;");
  }

  SaveChengeMapPointResults(event: any)
  {
    this.getDataFromInputForm();
    // PUT-запрос
    console.log("PUT запрос")
  }

  SearchPoints()
  {
    var SearchElement = document.getElementById('SearchButton')
    if(SearchElement)
      SearchElement.setAttribute("style", "display: none;");

    var ClearSearchElement = document.getElementById('ClearSearchButton')
    if(ClearSearchElement)
      ClearSearchElement.setAttribute("style", "display: inline;");

    this.isMarkerVisible = false;
  }

  ClearSeachResults()
  {
    var ClearSearchElement = document.getElementById('ClearSearchButton')
    if(ClearSearchElement)
      ClearSearchElement.setAttribute("style", "display: none;");

    var SearchElement = document.getElementById('SearchButton')
    if(SearchElement)
      SearchElement.setAttribute("style", "display: inline;");

    this.isMarkerVisible = true;
  }
}
