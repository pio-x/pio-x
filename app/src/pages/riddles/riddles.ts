import { Component } from '@angular/core';

import { Riddle } from "../../interfaces/riddle";
import { RiddleService } from "../../services/riddle.service";

@Component({
  selector: 'page-riddles',
  templateUrl: 'riddles.html'
})
export class RiddlesPage {

    riddles: Riddle[] = [];

    constructor(
        private riddleService: RiddleService
    ) {

        this.updateRiddles();
        riddleService.riddles.subscribe((riddles: Array<Riddle>) => {
            this.riddles = riddles;
        });
    }

    updateRiddles(): void {
        this.riddleService.updateRiddles();
    }
}
