import { Component } from '@angular/core';

import { ViewController, NavParams, LoadingController } from 'ionic-angular';

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
        let loading = this.loadingCtrl.create({
            content: 'Bild hochladen ...'
        });
        loading.present();
        this.teamService.updateProfileImage(this.imageData)
            .then(() => {
                this.dismiss();
                loading.dismiss();
            });
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
