import { Component } from '@angular/core';

import { ViewController, NavParams, LoadingController } from 'ionic-angular';

import {Team} from "../../interfaces/team";
import {TeamService} from "../../services/team.service";

@Component({
  selector: 'profile-image',
  templateUrl: 'profile-image.html'
})
export class ProfileImagePage {

    response: any;

    imageData: string = null;
    tags = {};

    constructor(private teamService:TeamService,
                public params: NavParams,
                public viewCtrl: ViewController,
                public loadingCtrl: LoadingController
    ) {

    }

    uploadImage() {
        this.teamService.updateProfileImage(this.imageData);
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
