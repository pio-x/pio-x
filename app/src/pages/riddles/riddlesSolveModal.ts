import { Component } from '@angular/core';

import { ViewController, NavParams, LoadingController } from 'ionic-angular';

import {Riddle} from "../../interfaces/riddle";
import {RiddleService} from "../../services/riddle.service";

@Component({
  selector: 'modal-riddles-solve',
  templateUrl: 'riddles-solve.html'
})
export class RiddlesSolveModalPage {

    riddleId: number;
    riddles: { [id: number]: Riddle; } = { };
    answer: string = '';
    answered: boolean = false;
    response: any;

    constructor(private riddleService:RiddleService,
                public params: NavParams,
                public viewCtrl: ViewController,
                public loadingCtrl: LoadingController
    ) {
        this.riddleId = params.get('riddleId');

        riddleService.riddles.subscribe((riddles: Array<Riddle>) => {
            this.riddlesUpdated(riddles);
        });
    }

    riddlesUpdated(riddles: Array<Riddle>): void {
        this.riddles = {};
        for (let riddle of riddles) {
            this.riddles[riddle.r_ID] = riddle;
        }
    }

    solveRiddle(): void {
        let loading = this.loadingCtrl.create({
            content: 'Rätsel lösen ...'
        });
        loading.present();
        this.riddleService.solveRiddle(this.riddleId, this.answer)
            .then((response) => {
                this.answered = true;
                this.response = response;
                loading.dismiss();
            })
            .catch((response) => {
                this.answered = true;
                this.response = response;
                loading.dismiss();
            })
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
