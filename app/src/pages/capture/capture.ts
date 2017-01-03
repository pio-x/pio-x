import { Component, ElementRef } from '@angular/core';

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
        private element: ElementRef,
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
        this.stationService.captureStation(this.station.s_ID)
            .then(() => {
                this.dismiss();
                loading.dismiss();
            });
    }

    imageChanged(event: any) {
        let reader = new FileReader();
        let image = this.element.nativeElement.querySelector('.uploaded-image');

        reader.onload = function(e: any) {
            let src = e.target.result;
            image.src = src;
        };

        reader.readAsDataURL(event.target.files[0]);
    }
}
