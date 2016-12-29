import {Component, ViewChild, ElementRef} from '@angular/core';

import {NavController} from 'ionic-angular';
import {StationService} from "../../services/station.service";
import {Station} from "../../interfaces/station";
import {LatLngLocation} from "../../interfaces/LatLngLocation";
import {LocationService} from "../../services/location.service";


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
    userLocation: LatLngLocation;
    userMarker: any;

    constructor(public navCtrl: NavController, private stationService: StationService, private locationService: LocationService) {
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
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                strokeColor: station.color,
                strokeWeight: 3,
                scale: 10
            },
            optimized: false,
            zIndex: google.maps.Marker.MAX_ZINDEX + 1,
            position: new google.maps.LatLng(station.lat, station.long),
            station: station
        });

        this.markers.push(marker);

        let _this = this;
        google.maps.event.addListener(marker, 'click', function () {
            let content = '<h2>'+this.station.name+'</h2>';
            content += this.station.description;
            _this.infoWindow.setContent(content);
            _this.infoWindow.open(_this.map, this);
        });
    }

    clearMarkers() {
        for (let i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null);
        }
    }

    updateUserMarker() {
        if (this.userMarker != null) {
            this.userMarker.setMap(null);
        }
        this.userMarker = new google.maps.Marker({
            position: this.userLocation,
            map: this.map,
            icon: {
                url: '/assets/bluecircle.png',
                size: new google.maps.Size(14, 14),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(7, 7),
                scaledSize: new google.maps.Size(14, 14)
            },
            optimized: false,
            zIndex: 99999999999
        });
    }

    userLocationUpdated(position) {
        this.userLocation = position;
        this.updateUserMarker();
    }

    loadMap() {

        let latLng = new google.maps.LatLng(47.499002, 8.728729);
        let mapOptions = {
            center: latLng,
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

        this.infoWindow = new google.maps.InfoWindow({
            content: 'Laden ...'
        });

        this.locationService.subscribe((pos: LatLngLocation) => {
            this.userLocationUpdated(pos);
        });
    }
}
