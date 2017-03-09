
import { Injectable }    from '@angular/core';

import { ActionSheetController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { PasscodePage } from '../pages/passcode/passcode';
import { ProfileImagePage } from '../pages/profile-image/profile-image';


@Injectable()
export class NavigationService {
  constructor(
    public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController
  ) {

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
                    localStorage.removeItem('mrx');
                    localStorage.removeItem('team');
                    localStorage.removeItem('hash');
                    localStorage.removeItem('player');
                    window.location.reload(true);
                }
            },
            {
                text: 'Passcode einlösen',
                handler: () => {
                    this.openPasscodeModal();
                }
            },
            {
                text: 'Teambild ändern',
                handler: () => {
                    this.openProfileImageModal();
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

  openPasscodeModal() {
      let passcodeModal = this.modalCtrl.create(PasscodePage);
      passcodeModal.present();
  }

  openProfileImageModal() {
      let modal = this.modalCtrl.create(ProfileImagePage);
      modal.present();
  }
}
