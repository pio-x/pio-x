
import { Injectable }    from '@angular/core';

import { PioxApiService } from './pioxApi.service';
import { NavController, ActionSheetController } from 'ionic-angular';

@Injectable()
export class NavigationService {
  constructor(public actionSheetCtrl: ActionSheetController) {

  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
        title: 'Optionen',
        buttons: [
            {
                text: 'Cache löschen',
                handler: () => {
                    // according to stackoverflow this should force a reload from the server
                    window.location.reload(true);
                }
            },
            {
                text: 'Abmelden',
                handler: () => {
                    window.location.href = 'login.html?logout=true';
                }
            },
            {
                text: 'Abbrechen',
                role: 'cancel',
                handler: () => {}
            }
        ]
    });

    actionSheet.present();
  }
}
