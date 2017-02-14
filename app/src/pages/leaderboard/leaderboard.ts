import { Team } from '../../interfaces/team';

import { TeamService } from '../../services/team.service';
import { Component } from '@angular/core';
import {NavigationService} from "../../services/navigation.service";


@Component({
  selector: 'page-leaderboard',
  templateUrl: 'leaderboard.html'
})
export class LeaderboardPage {
  teams: Team[] = [];
  myteam: number = 0;
  myname: string = '';

  constructor(private teamService:TeamService,
              public navService: NavigationService) {
    this.myteam = parseInt(localStorage.getItem('team'));
    this.myname = decodeURIComponent(localStorage.getItem('player')).replace( /\+/g, ' ');

    this.updateLeaderboard();
    teamService.teams.subscribe((teams: Array<Team>) => {
        this.teams = this.sort(teams);
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
  }

}
