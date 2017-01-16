import { Component, ElementRef } from '@angular/core';

import {ViewController, NavParams, LoadingController} from 'ionic-angular';
import {Station} from "../../interfaces/station";
import {StationService} from "../../services/station.service";
import {LocationService} from "../../services/location.service";
import {ConfigService} from "../../services/config.service";

import { ImageResult, ResizeOptions } from 'ng2-imageupload';

import EXIF from "exif-js"

@Component({
  selector: 'modal-capture',
  templateUrl: 'capture.html'
})
export class CaptureModal {

    station: Station;
    imageData: string = null;
    imageDataResized: string = null;
    imageOrientation: number = 0;
    tags = {};

    resizeOptions: ResizeOptions = {
        resizeMaxHeight: 1024,
        resizeMaxWidth: 1024
    };

    constructor(
        params: NavParams,
        private element: ElementRef,
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
        this.stationService.captureStation(this.station.s_ID, this.imageDataResized, this.tags)
            .then(() => {
                this.dismiss();
                loading.dismiss();
            });
    }

    imageChanged(event: any) {
        // reset image if none was selected
        if (event.target.files.length == 0) {
            let image = this.element.nativeElement.querySelector('.uploaded-image');
            image.src = "";
            this.imageData = null;
            this.imageDataResized = null;
        }
    }

    imageSelected(imageResult: ImageResult) {
        let image = this.element.nativeElement.querySelector('.uploaded-image');

        this.imageDataResized = imageResult.resized
            && imageResult.resized.dataURL
            || imageResult.dataURL;

        image.src = imageResult.dataURL;
        this.imageData = imageResult.dataURL;
        this.readOrientation();
    }

    readOrientation() {
        let img: any = document.getElementById("uploaded-image");
        // clear exif cache
        delete img.exifdata;

        let self = this;
        EXIF.getData(img, function() {
            self.tags = EXIF.getAllTags(this);
            self.imageOrientation = EXIF.getTag(this, "Orientation");
        });
    }
}
