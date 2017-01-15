import { Component } from '@angular/core';

import { ModalController } from 'ionic-angular';
import { RiddlesSolveModalPage } from './riddlesSolveModal';
import { Riddle } from "../../interfaces/riddle";
import { RiddleService } from "../../services/riddle.service";

@Component({
  selector: 'page-riddles',
  templateUrl: 'riddles.html'
})
export class RiddlesPage {

    riddles: Riddle[] = [];

    constructor(private riddleService:RiddleService, public modalCtrl: ModalController) {

        this.updateRiddles();
        riddleService.riddles.subscribe((riddles: Array<Riddle>) => {
            this.riddles = riddles;
        });
    }

    updateRiddles(): void {
        this.riddleService.updateRiddles();
    }

    openSolveModal(riddleId) {
        let riddleModal = this.modalCtrl.create(RiddlesSolveModalPage, { riddleId: riddleId });
        riddleModal.present();
    }

}
