import { Component, ViewChild, ElementRef } from '@angular/core';

import { NavController } from 'ionic-angular';
import {StationService} from "../../services/station.service";
import {Station} from "../../interfaces/station";

declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  stations:Station[] = [];

  constructor(public navCtrl: NavController, private stationService:StationService) {
    this.updateStations();
  }

  updateStations(): void {
    this.stationService.getStations()
      .then(stations => this.stations = stations);
  }

  ionViewDidLoad(){
    this.loadMap();
  }

  loadMap(){

    let latLng = new google.maps.LatLng(47.49, 8.73);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  }

}
