import {Component} from '@angular/core';

import {ModalController} from 'ionic-angular';

import {StationService} from "../../services/station.service";
import {Station} from "../../interfaces/station";
import {LatLngLocation} from "../../interfaces/LatLngLocation";
import {LocationService} from "../../services/location.service";
import {TeamService} from "../../services/team.service";
import {Team} from "../../interfaces/team";
import {CaptureModal} from "../capture/capture";
import {MrxService} from "../../services/mrx.service";
import {Mrx} from "../../interfaces/mrx";


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
    mrxs: Mrx[];

    userLocation: LatLngLocation;

    constructor(
        private stationService: StationService,
        private teamService: TeamService,
        private locationService: LocationService,
        private mrxService: MrxService,
        public modalCtrl: ModalController
    ) {
        this.updateMap();

        this.myTeam = parseInt(localStorage.getItem('team'));

        this.stationService.stations.subscribe((stations: Array<Station>) => {
            this.stationsUpdated(stations);
        });
        this.teamService.teams.subscribe((teams: Array<Team>) => {
            this.teamsUpdated(teams);
        });
        this.locationService.userLocation.subscribe((pos: LatLngLocation) => {
            this.userLocationUpdated(pos);
        });
        this.mrxService.mrxs.subscribe((mrxs: Mrx[]) => {
            this.mrxsUpdated(mrxs);
        });
    }

    openCaptureModal(station: Station) {
        let modal = this.modalCtrl.create(CaptureModal, { station: station });
        modal.onDidDismiss(data => {
            this.updateMap();
        });
        modal.present();
    }

    updateMap() {
        this.stationService.updateStations();
        this.teamService.updateTeams();
    }

    userLocationUpdated(position) {
        this.userLocation = position;
    }

    teamsUpdated(teams: Array<Team>): void {
        this.teams = {};
        for (let team of teams) {
            this.teams[team.t_ID] = team;
        }
    }

    stationsUpdated(stations: Array<Station>): void {
        this.stations = stations;
    }

    mrxsUpdated(mrxs: Array<Mrx>): void {
        this.mrxs = mrxs;
    }

}
