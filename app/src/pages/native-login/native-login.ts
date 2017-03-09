import { Component } from '@angular/core';

import { BarcodeScanner } from 'ionic-native';


@Component({
  selector: 'native-login',
  templateUrl: 'native-login.html'
})
export class NativeLogin {

    barcodeError: any;
    data: {} = {};
    loginTeam: string = null;
    loginHash: string = null;
    loginPlayer: string = '';

    constructor() {}

    login() {
        localStorage.setItem('team', this.loginTeam);
        localStorage.setItem('hash', this.loginHash);
        localStorage.setItem('player', this.loginPlayer);
        window.location.reload(true);
    }

    scan() {
        BarcodeScanner.scan().then((barcodeData) => {
            if (barcodeData.text) {
                this.data = this.parseURL(barcodeData.text);
                if (this.data['team']) {
                    // team: save data for later login when username is set
                    this.loginTeam = this.data['team'];
                    this.loginHash = this.data['hash'];
                }
                if (this.data['mrx']) {
                    // mrx: direct login
                    localStorage.setItem('mrx', this.data['mrx']);
                    localStorage.setItem('hash', this.data['hash']);
                    localStorage.setItem('player', 'Mister X ' + this.data['mrx']);
                    window.location.reload(true);
                }
            }
        }, (err) => {
            // An error occurred
            this.barcodeError = err;
        });
    }

    parseURL(url) {
        let splitAt = url.indexOf('?');
        let qstr = url.slice(splitAt+1);
        let query = {};
        let a = (qstr[0] === '?' ? qstr.substr(1) : qstr).split('&');
        for (let i = 0; i < a.length; i++) {
            let b = a[i].split('=');
            query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
        }
        return query;
    }


}
