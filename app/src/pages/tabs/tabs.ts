import { Component } from '@angular/core';

import {MapPage} from '../map/map';
import {LeaderboardPage} from "../leaderboard/leaderboard";
import {RulesPage} from "../rules/rules";
import {RiddlesPage} from "../riddles/riddles";
import {NotificationsPage} from "../notifications/notifications";
import {MrxPage} from "../mrx/mrx";

import { NotificationService } from '../../services/notification.service';
import {Platform} from "ionic-angular";
import {LocationService} from "../../services/location.service";
import {LatLngLocation} from "../../interfaces/LatLngLocation";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = MapPage;
  tab2Root: any = LeaderboardPage;
  tab3Root: any = RiddlesPage;
  tab4Root: any = MrxPage;
  tab5Root: any = RulesPage;
  tab6Root: any = NotificationsPage;

  isLoggedIn: boolean = false;

  notificationCount: number = 0;

  androidWarningDismissed: boolean = false;

  isTeam: number = 0;
  isMrx: number = 0;

  hasLocation: boolean = false;

  constructor(
      private notificationService:NotificationService,
      public platform: Platform,
      public locationService: LocationService
  ) {

    this.platform.ready().then((readySource) => {
      // hide app loading
      document.getElementById('app_loading').style.display = 'none';
    });

    this.isTeam = parseInt(localStorage.getItem('team'));
    this.isMrx = parseInt(localStorage.getItem('mrx'));

    notificationService.notificationsUnread.subscribe((notificationsUnread: number) => { 
        this.notificationCount = notificationsUnread;
    });

    if ((this.isTeam || this.isMrx) && localStorage.getItem('hash')) {
        this.isLoggedIn = true;
    }

    // try if location already available
    let location = this.locationService.getLocation();
    if (location && location.lat) {
      this.hasLocation = true;
    }

    // or wait for location get available
    if (!this.hasLocation) {
      this.locationService.userLocation.subscribe((pos: LatLngLocation) => {
        if (pos && pos.lat) {
          this.hasLocation = true;
        }
      });
    }
  }

  openAppLink() {
    window.location.href = 'https://play.google.com/store/apps/details?id=com.ionicframework.app580766';
  }
}
