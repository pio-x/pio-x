import { Component } from '@angular/core';
import {LoadingController} from "ionic-angular";

import {LatLngLocation} from "../../interfaces/LatLngLocation";
import {LocationService} from "../../services/location.service";
import {MrxService} from "../../services/mrx.service";

import { SebmGoogleMap } from 'angular2-google-maps/core/directives';


@Component({
  selector: 'page-mrx',
  templateUrl: 'mrx.html'
})
export class MrxPage {

    myname: string = '';

    description: string = '';

    userLocation: LatLngLocation;

    constructor(
        private locationService: LocationService,
        private mrxService: MrxService,
        public loadingCtrl: LoadingController
    ) {
        this.myname = decodeURIComponent(localStorage.getItem('player')).replace( /\+/g, ' ');

        this.locationService.userLocation.subscribe((pos: LatLngLocation) => {
            this.userLocationUpdated(pos);
        });
    }

    userLocationUpdated(position) {
        this.userLocation = position;
    }

    sendLocation() {
        let loading = this.loadingCtrl.create({
            content: 'Standort senden ...'
        });
        loading.present();
        this.mrxService.sendLocation(this.userLocation, this.description).then(() => {
            this.description = '';
            loading.dismiss();
        }).catch(() => {
            loading.dismiss();
        });
    }

}
