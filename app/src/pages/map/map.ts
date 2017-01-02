import {Component} from '@angular/core';

import {NavController, ModalController} from 'ionic-angular';

import {StationService} from "../../services/station.service";
import {Station} from "../../interfaces/station";
import {LatLngLocation} from "../../interfaces/LatLngLocation";
import {LocationService} from "../../services/location.service";
import {TeamService} from "../../services/team.service";
import {Team} from "../../interfaces/team";
import {CaptureModal} from "../capture/capture";


@Component({
    selector: 'page-map',
    templateUrl: 'map.html'
})
export class MapPage {
    default_lat: number = 47.499002;
    default_lng: number = 8.728729;
    default_zoom: number = 13;

    myTeam: number = 0;

    stations: Station[] = [];
    teams: { [id: number]: Team; } = { };

    userLocation: LatLngLocation;

    constructor(
        private stationService: StationService,
        private teamService: TeamService,
        private locationService: LocationService,
        public modalCtrl: ModalController
    ) {
        this.updateStations();
        this.updateTeams();

        this.myTeam = parseInt(localStorage.getItem('team'));

        this.locationService.subscribe((pos: LatLngLocation) => {
            this.userLocationUpdated(pos);
        });
    }

    userLocationUpdated(position) {
        this.userLocation = position;
    }

    updateStations(): void {
        this.stationService.getStations()
            .then((stations) => {
                this.stations = stations;
            });
    }

    updateTeams(): void {
        this.teamService.getTeams()
            .then((teams) => {
                for (let team of teams) {
                    this.teams[team.t_ID] = team;
                }
            });
    }

    openCaptureModal(station: Station) {
        let modal = this.modalCtrl.create(CaptureModal, { station: station });
        modal.onDidDismiss(data => {
            this.updateStations();
        });
        modal.present();
    }
}
