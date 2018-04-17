import {Component, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';

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

import {RiddlesSolveModalPage} from "../riddles/riddlesSolveModal";
import {ConfigService} from "../../services/config.service";
import {Config} from "../../interfaces/config";
import {NavigationService} from "../../services/navigation.service";
import {AgmMap} from "@agm/core";

declare var fontawesome: any;
declare var google: any;

@Component({
    selector: 'page-map',
    templateUrl: 'map.html',
    // onPush strategy improves map performance a lot
    // but we need to manually trigger dom updates with this.cd.markForCheck();
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapPage {
    default_lat: number = 47.499163;
    default_lng: number = 8.721871;
    default_zoom: number = 15;

    isRefreshing: boolean = false;

    myTeam: number = 0;

    stations: Station[] = [];
    teams: { [id: number]: Team; } = { };
    mrxs: Mrx[];
    riddles: Riddle[];
    config: Config;

    isMrx: number = 0;

    lastInfowindow: any = null;

    fa: any;

    userLocation: LatLngLocation;

    tutorialCompleted: boolean = false;
    tutorialStationCaptured: boolean = false;
    tutorialStation: Station = {
        s_ID: -1,
        pos_lat: 0,
        pos_long: 0,
        points: 0,
        name: 'Tutorial Station',
        description: 'Tutorial',
        team: 0,
        captured_timestamp: '0'
    };

    @ViewChild('gmap') map: AgmMap;

    constructor(
        private configService: ConfigService,
        private stationService: StationService,
        private teamService: TeamService,
        private locationService: LocationService,
        private mrxService: MrxService,
        private riddleService: RiddleService,
        public modalCtrl: ModalController,
        public navService: NavigationService,
        private cd: ChangeDetectorRef
    ) {
        this.updateMap();

        this.myTeam = parseInt(localStorage.getItem('team'));
        this.isMrx = parseInt(localStorage.getItem('mrx'));
        this.tutorialCompleted = (localStorage.getItem('tutorialCompleted') == 'true');

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
        this.configService.config.subscribe((config: Config) => {
            this.configUpdated(config);
        });
        // bind icons into local scope
        this.fa = fontawesome;
    }

    showTutorial(): boolean {
        return !this.tutorialCompleted && this.config.game_is_running == 0 && !this.isMrx;
    }

    inRange(pos_lat, pos_long) {
        return this.locationService.getDistanceToUser(pos_lat, pos_long) <= this.configService.getConfig().station_radius
    }

    presentActionSheet() {
      this.navService.presentActionSheet()
    }

    openCaptureModal(station: Station) {
        let modal = this.modalCtrl.create(CaptureModal, { station: station });
        modal.onDidDismiss(data => {
            this.updateMap();

            // tutorial station captured
            if (station.s_ID == -1) {
                this.tutorialStationCaptured = true;
            }
        });
        modal.present();
    }

    openSolveModal(riddleId) {
        let riddleModal = this.modalCtrl.create(RiddlesSolveModalPage, { riddleId: riddleId });
        riddleModal.present();
    }

    // fired when the map tab comes into view
    ionViewDidEnter() {
        this.updateMap();
        this.panToMyLocation();
    }

    updateMap() {
        this.isRefreshing = true;
        this.cd.markForCheck();
        if (this.map) {
            // attempt to fix map offset that happen sometimes
            this.map.triggerResize(true);
        }
        Promise.all([
            this.stationService.updateStations(),
            this.teamService.updateTeams(),
            this.mrxService.updateMrxs(),
            this.riddleService.updateRiddles(),
            this.configService.updateConfig()
        ]).then(() => {
            this.isRefreshing = false;
            this.cd.markForCheck();
        });
    }

    zoomToMyLocation() {
        if (this.userLocation && this.userLocation.lat) {
            // hackedyhack
            // call internal map functions (reactivity is gone, but who cares...)
            this.panToMyLocation();
            this.map['_mapsWrapper'].setZoom(17);
        }
    }

    panToMyLocation() {
        if (this.userLocation && this.userLocation.lat) {
            // hackedyhack
            // call internal map functions (reactivity is gone, but who cares...)
            this.map['_mapsWrapper'].setCenter({
                lat: this.userLocation.lat,
                lng: this.userLocation.lng
            });
        }
    }

    userLocationUpdated(position) {
        this.userLocation = position;
        this.cd.markForCheck();
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
            this.tutorialStation.pos_lat = config.home_location_lat;
            this.tutorialStation.pos_long = config.home_location_long;
            this.cd.markForCheck();
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
            return '#000';
        } else if (teamId == this.myTeam) {
            return '#00BD00';
        } else {
            return this.teamService.distinctColor(teamId);
        }
    }

    onInfoWindowOpen(infoWindow) {
        try {
            if (this.lastInfowindow && this.lastInfowindow !== infoWindow){
                this.lastInfowindow.close();
            }
            this.lastInfowindow = infoWindow;
        } catch (err) {}
        this.cd.markForCheck();
    }

    trackByStationId(index,item){
      return item.s_ID;
    }

    finishTutorial() {
        this.tutorialCompleted = true;
        localStorage.setItem('tutorialCompleted', 'true');
        this.cd.markForCheck();
    }

}
