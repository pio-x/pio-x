import {Component, Input} from '@angular/core';

import { ModalController } from 'ionic-angular';
import { RiddlesSolveModalPage } from './riddlesSolveModal';
import { Riddle } from "../../interfaces/riddle";
import { RiddleService } from "../../services/riddle.service";
import {LocationService} from "../../services/location.service";
import {ConfigService} from "../../services/config.service";

@Component({
  selector: 'page-riddle-detail',
  templateUrl: 'riddle-detail.html'
})
export class RiddleDetailPage {

    @Input() riddle: Riddle;

    constructor(
        private configService: ConfigService,
        private riddleService: RiddleService,
        private locationService: LocationService,
        public modalCtrl: ModalController
    ) {}

    openSolveModal(riddleId) {
        let riddleModal = this.modalCtrl.create(RiddlesSolveModalPage, { riddleId: riddleId });
        riddleModal.present();
    }

}
