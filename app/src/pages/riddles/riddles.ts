import { Component } from '@angular/core';

import { Riddle } from "../../interfaces/riddle";
import { RiddleService } from "../../services/riddle.service";
import {NavigationService} from "../../services/navigation.service";
import {PasscodePage} from "../passcode/passcode";
import {ModalController} from "ionic-angular";

@Component({
  selector: 'page-riddles',
  templateUrl: 'riddles.html'
})
export class RiddlesPage {

    riddles: Riddle[] = [];

    constructor(
        private riddleService: RiddleService,
        public navService: NavigationService,
        public modalCtrl: ModalController
    ) {

        this.updateRiddles();
        riddleService.riddles.subscribe((riddles: Array<Riddle>) => {
            this.riddles = riddles;
        });
    }

    updateRiddles(): void {
        this.riddleService.updateRiddles();
    }
    presentActionSheet() {
        this.navService.presentActionSheet()
    }

    openPasscodeModal() {
        let passcodeModal = this.modalCtrl.create(PasscodePage);
        passcodeModal.present();
    }

    doRefresh(refresher) {
        this.riddleService.updateRiddles().then(() => {
            refresher.complete();
        }).catch(() => {
            refresher.complete();
        });
    }
}
