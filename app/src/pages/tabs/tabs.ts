import { Component } from '@angular/core';

import { MapPage } from '../map/map';
import {LeaderboardPage} from "../leaderboard/leaderboard";
import {RulesPage} from "../rules/rules";
import {RiddlesPage} from "../riddles/riddles";
import {NotificationsPage} from "../notifications/notifications";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = MapPage;
  tab2Root: any = LeaderboardPage;
  tab3Root: any = RulesPage;
  tab4Root: any = RiddlesPage;
  tab5Root: any = NotificationsPage;

  constructor() {

  }
}
