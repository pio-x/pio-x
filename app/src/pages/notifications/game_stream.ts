import { Component } from '@angular/core';

import {GameStreamService} from "../../services/game_stream.service";
import { Log } from '../../interfaces/log';
import {Team} from "../../interfaces/team";
import {TeamService} from "../../services/team.service";
import {MrxService} from "../../services/mrx.service";
import {Mrx} from "../../interfaces/mrx";

@Component({
  selector: 'page-game_stream',
  templateUrl: 'game_stream.html'
})
export class GameStreamPage {
  logs:Log[]=[];
  teams: { [id: number]: Team; } = { };
  mrxs: { [id: number]: Mrx; } = { };


  constructor(private gameStreamService:GameStreamService, private teamService:TeamService, private mrxService:MrxService) {
    this.updateStream();
    gameStreamService.logs.subscribe((game_stream: Array<Log>) => {
        this.logs = game_stream;
    });
    teamService.teams.subscribe((teams: Array<Team>) => {
        this.teamsUpdated(teams);
    });
    mrxService.mrxs.subscribe((mrxs: Array<Mrx>) => {
        this.mrxsUpdated(mrxs);
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

  mrxsUpdated(mrxs: Array<Mrx>): void {
    this.mrxs = {};
    for (let mrx of mrxs) {
      this.mrxs[mrx.x_ID] = mrx;
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
