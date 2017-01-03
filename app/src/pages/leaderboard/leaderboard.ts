import { Team } from '../../interfaces/team';

import { TeamService } from '../../services/team.service';
import { Component } from '@angular/core';

import { NavController, ActionSheetController } from 'ionic-angular';

@Component({
  selector: 'page-leaderboard',
  templateUrl: 'leaderboard.html'
})
export class LeaderboardPage {
  teams: Team[] = [];
  myteam: number = 0;
  myname: string = '';

  constructor(public navCtrl: NavController, private teamService:TeamService, public actionSheetCtrl: ActionSheetController) {
    this.updateLeaderboard();
    this.myteam = parseInt(localStorage.getItem('team'));
    this.myname = decodeURIComponent(localStorage.getItem('player'));
  }

  sort(teams): Team[] {
    //sort descending
    return teams.sort((e1,e2) => e2.score - e1.score);
  }

  updateLeaderboard(): void {
    this.teamService.getTeams()
      .then(teams => this.teams = this.sort(teams));
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
        title: 'Optionen',
        buttons: [
            {
                text: 'Cache löschen',
                handler: () => {
                    // according to stackoverflow this should force a reload from the server
                    window.location.reload(true);
                }
            },
            {
                text: 'Abmelden',
                handler: () => {
                    window.location.href = 'login.html?logout=true';
                }
            },
            {
                text: 'Abbrechen',
                role: 'cancel',
                handler: () => {}
            }
        ]
    });

    actionSheet.present();
  }

}
