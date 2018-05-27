import { Team } from '../../interfaces/team';

import { TeamService } from '../../services/team.service';
import { Component } from '@angular/core';
import {NavigationService} from "../../services/navigation.service";
import {ProfileImagePage} from "../profile-image/profile-image";
import {ModalController} from "ionic-angular";
import {LocationService} from "../../services/location.service";
import {UserLatLngLocation} from "../../interfaces/LatLngLocation";
import {ConfigService} from "../../services/config.service";


@Component({
  selector: 'page-leaderboard',
  templateUrl: 'leaderboard.html'
})
export class LeaderboardPage {
  teams: Team[] = [];
  myteam: number = 0;
  myname: string = '';

  userLocation: UserLatLngLocation;

  constructor(
      private teamService:TeamService,
      public navService: NavigationService,
      public modalCtrl: ModalController,
      private locationService: LocationService,
      private configService: ConfigService
  ) {
    this.myteam = parseInt(localStorage.getItem('team'));
    this.myname = decodeURIComponent(localStorage.getItem('player')).replace( /\+/g, ' ');

    this.updateLeaderboard();
    teamService.teams.subscribe((teams: Array<Team>) => {
        this.teams = this.sort(teams);
    });

    this.locationService.userLocation.subscribe((pos: UserLatLngLocation) => {
        this.userLocation = pos;
    });
  }

  sort(teams): Team[] {
    //sort descending
    return teams.sort((e1,e2) => e2.score - e1.score);
  }

  updateLeaderboard(): void {
    this.teamService.updateTeams();
  }
  presentActionSheet() {
    this.navService.presentActionSheet()
  }

  doRefresh(refresher) {
      this.teamService.updateTeams().then(() => {
          refresher.complete();
      }).catch(() => {
          refresher.complete();
      });
      this.configService.updateConfig();
  }

  openProfileImageModal() {
      let modal = this.modalCtrl.create(ProfileImagePage);
      modal.present();
  }

}
