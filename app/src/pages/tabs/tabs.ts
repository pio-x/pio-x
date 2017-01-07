import { Component } from '@angular/core';

import { MapPage } from '../map/map';
import {LeaderboardPage} from "../leaderboard/leaderboard";
import {RulesPage} from "../rules/rules";
import {RiddlesPage} from "../riddles/riddles";
import {NotificationsPage} from "../notifications/notifications";

import { NotificationService } from '../../services/notification.service';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = MapPage;
  tab2Root: any = LeaderboardPage;
  tab3Root: any = RiddlesPage;
  tab4Root: any = RulesPage;
  tab5Root: any = NotificationsPage;

  isLoggedIn: boolean = false;

  notificationCount: number = 0;

  constructor(private notificationService:NotificationService) {

    notificationService.notificationsUnread.subscribe((notificationsUnread: number) => { 
        this.notificationCount = notificationsUnread;
    });

    if (localStorage.getItem('team') && localStorage.getItem('hash')) {
        this.isLoggedIn = true;
    }
  }
}
