import { Team } from '../../interfaces/team';

import { TeamService } from '../../services/team.service';
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-leaderboard',
  templateUrl: 'leaderboard.html'
})
export class LeaderboardPage {
  teams:Team[] = [];
  myteam:number = 0;

  constructor(public navCtrl: NavController, private teamService:TeamService) {
    this.updateLeaderboard();
    this.myteam = parseInt(localStorage.getItem('team'));
  }

  sort(teams): Team[] {
    //sort descending
    return teams.sort((e1,e2) => e2.score - e1.score);
  }

  updateLeaderboard(): void {
    this.teamService.getTeams()
      .then(teams => this.teams = this.sort(teams));
  }

}
