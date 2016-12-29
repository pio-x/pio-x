import {Component, ViewChild, ElementRef} from '@angular/core';

import {NavController} from 'ionic-angular';
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

    stations: Station[] = [];

    markers: any = [];

    infoWindow: any;

    constructor(public navCtrl: NavController, private stationService: StationService) {
        this.updateStations();
    }

    ionViewDidLoad() {
        this.loadMap();
    }

    updateStations(): void {
        this.stationService.getStations()
            .then((stations) => {
                this.stations = stations;
                this.clearMarkers();
                this.stations.forEach((station: Station) => {
                    this.addMarker(station)
                })
            });


    }

    addMarker(station: Station) {
        let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(station.lat, station.long),
            station: station
        });

        this.markers.push(marker);

        let _this = this;
        google.maps.event.addListener(marker, 'click', function () {
            _this.infoWindow.setContent(this.station.name);
            _this.infoWindow.open(_this.map, this);
        });


    }

    clearMarkers() {
        for (let i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null);
        }
    }

    addInfoWindow(content) {
        this.infoWindow = new google.maps.InfoWindow({
            content: content
        });
    }


    loadMap() {

        let latLng = new google.maps.LatLng(47.499002, 8.728729);

        let mapOptions = {
            center: latLng,
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

        this.addInfoWindow('Laden ...');

    }
}
