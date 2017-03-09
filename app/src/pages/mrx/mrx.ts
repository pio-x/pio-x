import { Component } from '@angular/core';
import {LoadingController} from "ionic-angular";

import {LatLngLocation} from "../../interfaces/LatLngLocation";
import {Mrx} from "../../interfaces/mrx";
import {LocationService} from "../../services/location.service";
import {MrxService} from "../../services/mrx.service";
import {NavigationService} from "../../services/navigation.service";


@Component({
  selector: 'page-mrx',
  templateUrl: 'mrx.html'
})
export class MrxPage {

    myname: string = '';
    mrxid: number = 0;

    description: string = '';

    userLocation: LatLngLocation;

    mrxs: Mrx[];

    constructor(
        private locationService: LocationService,
        private mrxService: MrxService,
        public loadingCtrl: LoadingController,
        public navService: NavigationService
    ) {
        this.myname = decodeURIComponent(localStorage.getItem('player')).replace( /\+/g, ' ');
        this.mrxid = parseInt(localStorage.getItem('mrx'));

        this.locationService.userLocation.subscribe((pos: LatLngLocation) => {
            this.userLocationUpdated(pos);
        });
        this.mrxService.mrxs.subscribe((mrxs: Mrx[]) => {
            this.mrxsUpdated(mrxs);
        });
    }

    presentActionSheet() {
        this.navService.presentActionSheet()
    }

    userLocationUpdated(position) {
        this.userLocation = position;
    }

    mrxsUpdated(mrxs: Array<Mrx>): void {
        if (JSON.stringify(this.mrxs) != JSON.stringify(mrxs)) {
            this.mrxs = mrxs;
        }
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
