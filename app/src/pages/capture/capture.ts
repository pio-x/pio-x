import { Component } from '@angular/core';

import {ViewController, NavParams, LoadingController} from 'ionic-angular';
import {Station} from "../../interfaces/station";
import {StationService} from "../../services/station.service";
import {LocationService} from "../../services/location.service";
import {ConfigService} from "../../services/config.service";

@Component({
  selector: 'modal-capture',
  templateUrl: 'capture.html'
})
export class CaptureModal {

    station: Station;
    imageData: string = null;
    tags = {};

    constructor(
        params: NavParams,
        public viewCtrl: ViewController,
        public loadingCtrl: LoadingController,
        private configService: ConfigService,
        private stationService: StationService,
        private locationService: LocationService
    ) {
        this.station = params.get('station');
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    distance() {
        return this.locationService.getDistanceToUser(
            this.station.pos_lat,
            this.station.pos_long
        )
    }

    captureStation() {
        let loading = this.loadingCtrl.create({
            content: 'Station einnehmen ...'
        });
        loading.present();
        this.stationService.captureStation(this.station.s_ID, this.imageData, this.tags)
            .then(() => {
                this.dismiss();
                loading.dismiss();
            });
    }


}
