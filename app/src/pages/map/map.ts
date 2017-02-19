import {Component, ViewChild} from '@angular/core';

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
import {RiddleService} from "../../services/riddle.service";
import {Riddle} from "../../interfaces/riddle";

import { SebmGoogleMap } from 'angular2-google-maps/core/directives';
import {RiddlesSolveModalPage} from "../riddles/riddlesSolveModal";
import {ConfigService} from "../../services/config.service";
import {Config} from "../../interfaces/config";
import {NavigationService} from "../../services/navigation.service";

declare var fontawesome: any;
declare var google: any;

@Component({
    selector: 'page-map',
    templateUrl: 'map.html'
})
export class MapPage {
    default_lat: number = 47.499002;
    default_lng: number = 8.728729;
    default_zoom: number = 13;

    isRefreshing: boolean = false;

    myTeam: number = 0;

    stations: Station[] = [];
    teams: { [id: number]: Team; } = { };
    mrxs: Mrx[];
    riddles: Riddle[];
    config: Config;

    lastInfowindow: any = null;

    fa: any;

    userLocation: LatLngLocation;

    @ViewChild('gmap') map: SebmGoogleMap;

    constructor(
        private configService: ConfigService,
        private stationService: StationService,
        private teamService: TeamService,
        private locationService: LocationService,
        private mrxService: MrxService,
        private riddleService: RiddleService,
        public modalCtrl: ModalController,
        public navService: NavigationService
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
        this.riddleService.riddles.subscribe((riddles: Riddle[]) => {
            this.riddlesUpdated(riddles);
        });
        this.configService.config.subscribe((config: Riddle[]) => {
            this.configUpdated(config);
        });
        // bind icons into local scope
        this.fa = fontawesome;
    }
    presentActionSheet() {
      this.navService.presentActionSheet()
    }
    
    openCaptureModal(station: Station) {
        let modal = this.modalCtrl.create(CaptureModal, { station: station });
        modal.onDidDismiss(data => {
            this.updateMap();
        });
        modal.present();
    }

    openSolveModal(riddleId) {
        let riddleModal = this.modalCtrl.create(RiddlesSolveModalPage, { riddleId: riddleId });
        riddleModal.present();
    }

    ionViewDidEnter() {
        this.updateMap();
    }

    updateMap() {
        this.isRefreshing = true;
        if (this.map) {
            // attempt to fix map offset that happen sometimes
            this.map.triggerResize();
        }
        Promise.all([
            this.stationService.updateStations(),
            this.teamService.updateTeams(),
            this.mrxService.updateMrxs(),
            this.riddleService.updateRiddles()
        ]).then(() => {
            this.isRefreshing = false;
        });
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
        if (JSON.stringify(this.stations) != JSON.stringify(stations)) {
            this.stations = stations;
        }
    }

    mrxsUpdated(mrxs: Array<Mrx>): void {
        if (JSON.stringify(this.mrxs) != JSON.stringify(mrxs)) {
            this.mrxs = mrxs;
        }
    }

    riddlesUpdated(riddles: Array<Riddle>): void {
        if (JSON.stringify(this.riddles) != JSON.stringify(riddles)) {
            this.riddles = riddles;
        }
    }

    configUpdated(config: Config): void {
        if (JSON.stringify(this.config) != JSON.stringify(config)) {
            this.config = config;
        }
    }

    getRiddleStateColor(state): string {
        switch(state) {
            case 'UNLOCKED':
                return '#009107';
            default:
                return "#F43828";
        }
    }

    getStationColor(teamId): string {
        if (!teamId) {
            return '#444';
        } else if (teamId == this.myTeam) {
            return '#ffc300';
        } else {
            return '#000';
        }
    }

    onInfoWindowOpen(infoWindow) {
      if (this.lastInfowindow && this.lastInfowindow !== infoWindow){
         this.lastInfowindow.close();
      }
      this.lastInfowindow = infoWindow;
    }

}
