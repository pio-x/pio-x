import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {StationService} from "../../services/station.service";
import {Station} from "../../interfaces/station";
import {LatLngLocation} from "../../interfaces/LatLngLocation";
import {LocationService} from "../../services/location.service";
import {TeamService} from "../../services/team.service";
import {Team} from "../../interfaces/team";


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

    constructor(public navCtrl: NavController, private stationService: StationService, private teamService: TeamService, private locationService: LocationService) {
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
}
