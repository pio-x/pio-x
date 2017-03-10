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

  isTeam: number = 0;
  isMrx: number = 0;

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
  }
}
