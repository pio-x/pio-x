import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {NavigationService} from "../../services/navigation.service";

@Component({
  selector: 'page-rules',
  templateUrl: 'rules.html'
})
export class RulesPage {

  constructor(public navCtrl: NavController,
              public navService: NavigationService) {

  }
  presentActionSheet() {
    this.navService.presentActionSheet()
  }

}
