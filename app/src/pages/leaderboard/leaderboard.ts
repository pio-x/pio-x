import * as console from 'console';
import { Team } from '../../interfaces/team';

import { TeamService } from '../../services/team.service';
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-leaderboard',
  templateUrl: 'leaderboard.html'
})
export class LeaderboardPage {
  teams:Team[] = []

  constructor(public navCtrl: NavController, private teamService:TeamService) {
    this.updateLeaderboard();
  }

  sort(teams): Team[] {
    //sort descending
    return teams.sort((e1,e2) => e2.points - e1.points);
  }

  updateLeaderboard(): void {
    this.teamService.getTeams()
      .then(teams => this.teams = this.sort(teams));
  }

}
