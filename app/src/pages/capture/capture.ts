import { Component, ElementRef } from '@angular/core';

import {ViewController, NavParams, LoadingController} from 'ionic-angular';
import {Station} from "../../interfaces/station";
import {StationService} from "../../services/station.service";
import {LocationService} from "../../services/location.service";

import EXIF from "exif-js"

@Component({
  selector: 'modal-capture',
  templateUrl: 'capture.html'
})
export class CaptureModal {

    station: Station;
    imageData: Blob = null;
    imageOrientation: number = 1;

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
        this.stationService.captureStation(this.station.s_ID, this.imageData)
            .then(() => {
                this.dismiss();
                loading.dismiss();
            });
    }

    imageChanged(event: any) {
        let reader = new FileReader();
        let image = this.element.nativeElement.querySelector('.uploaded-image');

        reader.onload = (e: any) => {
            this.imageData = e.target.result;
            image.src = e.target.result;
            this.readOrientation(e.target.result);
        };

        if (event.target.files.length > 0) {
            reader.readAsDataURL(event.target.files[0]);
        } else {
            image.src = "";
            this.imageData = null;
        }
    }

    readOrientation(data) {
        let img: any = document.getElementById("uploaded-image");
        delete img.exifdata;
        let self = this;
        EXIF.getData(img, function() {
            let orientation = EXIF.getTag(this, "Orientation");
            let model = EXIF.getTag(this, "Model");
            self.imageOrientation = orientation;
            console.log(`orientation: ${orientation} ${model}`);
        });
    }
}
