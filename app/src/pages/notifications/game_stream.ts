import { Component } from '@angular/core';

import {GameStreamService} from "../../services/game_stream.service";
import { Log } from '../../interfaces/log';

@Component({
  selector: 'page-game_stream',
  templateUrl: 'game_stream.html'
})
export class GameStreamPage {
  logs:Log[]=[];

  constructor(private gameStreamService:GameStreamService) {
    this.updateStream();
    gameStreamService.logs.subscribe((game_stream: Array<Log>) => {
        this.logs = game_stream;
    });
  }

  updateStream(): void {
    this.gameStreamService.updateStream();
  }

}
