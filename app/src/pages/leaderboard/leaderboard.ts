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

  updateLeaderboard(): void {
    this.teamService.getTeams()
      .then(teams => this.teams = teams);
  }

}
