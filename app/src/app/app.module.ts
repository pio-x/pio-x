import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import {MapPage} from "../pages/map/map";
import {LeaderboardPage} from "../pages/leaderboard/leaderboard";
import {NotificationsPage} from "../pages/notifications/notifications";
import {RiddlesPage} from "../pages/riddles/riddles";
import {RulesPage} from "../pages/rules/rules";

@NgModule({
  declarations: [
    MyApp,
    MapPage,
    LeaderboardPage,
    NotificationsPage,
    RiddlesPage,
    RulesPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapPage,
    LeaderboardPage,
    NotificationsPage,
    RiddlesPage,
    RulesPage,
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
