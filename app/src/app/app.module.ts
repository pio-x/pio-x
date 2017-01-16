import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import {MapPage} from "../pages/map/map";
import {LeaderboardPage} from "../pages/leaderboard/leaderboard";
import {NotificationsPage} from "../pages/notifications/notifications";
import {NotificationDetailComponent} from "../pages/notifications/notification-detail.component";
import {RiddlesPage} from "../pages/riddles/riddles";
import {RulesPage} from "../pages/rules/rules";
import {CaptureModal} from "../pages/capture/capture";
import {RiddlesSolveModalPage} from "../pages/riddles/riddlesSolveModal";

import {PioxApiService} from "../services/pioxApi.service";
import {TeamService} from "../services/team.service";
import {RiddleService} from "../services/riddle.service";
import {StationService} from "../services/station.service";
import {NotificationService} from "../services/notification.service";
import {LocationService} from "../services/location.service";
import {MrxService} from "../services/mrx.service";
import {ConfigService} from "../services/config.service";

import { AgmCoreModule } from 'angular2-google-maps/core';

import { ImageUploadModule } from 'ng2-imageupload';

@NgModule({
  declarations: [
    MyApp,
    MapPage,
    LeaderboardPage,
    NotificationsPage,
    RiddlesPage,
    RulesPage,
    TabsPage,
    NotificationDetailComponent,
    CaptureModal,
    RiddlesSolveModalPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBYAjZ-QKEPlDFLPsLcxR5fFRM2LckyZ6o'
    }),
    ImageUploadModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapPage,
    LeaderboardPage,
    NotificationsPage,
    RiddlesPage,
    RulesPage,
    TabsPage,
    CaptureModal,
    RiddlesSolveModalPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler}, 
    Storage,
    TeamService,
    RiddleService,
    StationService,
    LocationService,
    NotificationService,
    PioxApiService,
    MrxService,
    ConfigService
  ]
})
export class AppModule {}
