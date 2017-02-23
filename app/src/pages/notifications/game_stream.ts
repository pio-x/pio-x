import { Component } from '@angular/core';

import {GameStreamService} from "../../services/game_stream.service";
import { Log } from '../../interfaces/log';
import {Team} from "../../interfaces/team";
import {TeamService} from "../../services/team.service";

@Component({
  selector: 'page-game_stream',
  templateUrl: 'game_stream.html'
})
export class GameStreamPage {
  logs:Log[]=[];
  teams: { [id: number]: Team; } = { };


  constructor(private gameStreamService:GameStreamService, private teamService:TeamService) {
    this.updateStream();
    gameStreamService.logs.subscribe((game_stream: Array<Log>) => {
        this.logs = game_stream;
    });
    teamService.teams.subscribe((teams: Array<Team>) => {
        this.teamsUpdated(teams);
    });
  }

  updateStream(): void {
    this.gameStreamService.updateStream();
  }

  teamsUpdated(teams: Array<Team>): void {
    this.teams = {};
    for (let team of teams) {
      this.teams[team.t_ID] = team;
    }
  }

  doRefresh(refresher) {
      this.gameStreamService.updateStream().then(() => {
          refresher.complete();
      }).catch(() => {
          refresher.complete();
      });
  }

}
