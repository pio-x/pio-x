import { Component } from '@angular/core';

import { ViewController, NavParams, LoadingController } from 'ionic-angular';

import {Passcode} from "../../interfaces/passcode";
import {PasscodeService} from "../../services/passcode.service";

@Component({
  selector: 'passcode',
  templateUrl: 'passcode.html'
})
export class PasscodePage {

    passcodeId: number;
    passcodes: { [id: number]: Passcode; } = { };
    passcode: string = '';
    response: any;

    constructor(private passcodeService:PasscodeService,
                public params: NavParams,
                public viewCtrl: ViewController,
                public loadingCtrl: LoadingController
    ) {
        this.passcodeId = params.get('passcodeId');
    }

    claimPasscode(): void {
        let loading = this.loadingCtrl.create({
            content: 'wird eingelöst ...'
        });
        loading.present();
        this.passcodeService.claimPasscode(this.passcode)
            .then((response) => {
                this.response = response;
                loading.dismiss();
            })
            .catch((response) => {
                this.response = response;
                loading.dismiss();
            })
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
