import { Component } from '@angular/core';

import {ViewController, NavParams, LoadingController} from 'ionic-angular';
import {Station} from "../../interfaces/station";
import {StationService} from "../../services/station.service";
import {LocationService} from "../../services/location.service";

@Component({
  selector: 'modal-capture',
  templateUrl: 'capture.html'
})
export class CaptureModal {
    station: Station;

    constructor(
        params: NavParams,
        public viewCtrl: ViewController,
        public loadingCtrl: LoadingController,
        private stationService: StationService,
        private locationService: LocationService
    ) {
        this.station = params.get('station');
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    distance() {
        let currentLocation = this.locationService.getLocation();
        return this.locationService.getDistanceBetween(
            this.station.pos_lat,
            this.station.pos_long,
            currentLocation.lat,
            currentLocation.lng
        )
    }

    captureStation() {
        let loading = this.loadingCtrl.create({
            content: 'Station einnehmen ...'
        });
        loading.present();
        this.stationService.captureStation(this.station.s_ID)
            .then(() => {
                this.dismiss();
                loading.dismiss();
            });
    }
}
