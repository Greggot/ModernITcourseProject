import { HttpClient, HttpParams } from '@angular/common/http';
import { MapPoint } from './map-point/map-point.module';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HTTPclientServiceService {

  constructor(private http: HttpClient) { }

  postMapPoint(point: MapPoint)
  {
    const body = {name: point.name, description: point.description, contacts: point.contacts,
                  startTime: point.startTime, endTime: point.endTime,
                  lat: point.lat, lng: point.lng,
                  price: point.price}
    return this.http.post('http://localhost:8080/api/base/Party', body);
  }

  getAllPoints()
  {
    return this.http.get('http://localhost:8080/api/base/getParties', {responseType: 'json'});
  }

  removePoint(point: MapPoint)
  {
    const url = `http://localhost:8080/api/base/Party/${point.id}`
    return this.http.delete(url);
  }
}
