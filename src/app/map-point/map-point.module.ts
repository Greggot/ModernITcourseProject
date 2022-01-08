import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class MapPoint
{
  id = 0;

  lat = 0.0;
  lng = 0.0;

  name = "NaN";
  description = "NaN";
  startTime = new Date("Dec 01 2022 00:00:00");
  endTime = new Date("Dec 01 2022 00:00:00");
  contacts = "NaN";
  price = 0.0;

  additionalInfo = "NaN";
}
