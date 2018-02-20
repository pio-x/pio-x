import { NgModule, ErrorHandler } from '@angular/core';
import { DatePipe } from '@angular/common';
import { IonicApp, IonicModule } from 'ionic-angular';
import {IonicStorageModule} from '@ionic/storage';
import { BrowserModule } from '@angular/platform-browser';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import {MapPage} from "../pages/map/map";
import {LeaderboardPage} from "../pages/leaderboard/leaderboard";
import {NotificationsPage} from "../pages/notifications/notifications";
import {RiddlesPage} from "../pages/riddles/riddles";
import {RulesPage} from "../pages/rules/rules";
import {CaptureModal} from "../pages/capture/capture";
import {RiddlesSolveModalPage} from "../pages/riddles/riddlesSolveModal";
import {RiddleDetailPage} from "../pages/riddles/riddleDetail";
import {GameStreamPage} from "../pages/notifications/game_stream";
import {NotificationTabPage} from "../pages/notifications/notification_tab";
import {PasscodePage} from "../pages/passcode/passcode";
import {ProfileImagePage} from "../pages/profile-image/profile-image";
import {MrxPage} from "../pages/mrx/mrx";
import {NativeLogin} from "../pages/native-login/native-login";

import {PioxApiService} from "../services/pioxApi.service";
import {TeamService} from "../services/team.service";
import {RiddleService} from "../services/riddle.service";
import {StationService} from "../services/station.service";
import {NotificationService} from "../services/notification.service";
import {LocationService} from "../services/location.service";
import {MrxService} from "../services/mrx.service";
import {ConfigService} from "../services/config.service";
import {NavigationService} from "../services/navigation.service";
import {GameStreamService} from "../services/game_stream.service";
import {PasscodeService} from "../services/passcode.service";

import {PioxErrorHandler} from "./PioxErrorHandler"

import {ImageUploader} from "../components/image-uploader/image-uploader";

import { ImageUploadModule } from 'ng2-imageupload';

import 'intl';
import 'intl/locale-data/jsonp/de-CH';
import {AgmCoreModule} from "@agm/core";
import {HttpModule} from "@angular/http";
import {SplashScreen} from "@ionic-native/splash-screen";
import {Camera} from "@ionic-native/camera";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {StatusBar} from "@ionic-native/status-bar";

@NgModule({
  declarations: [
    MyApp,
    MapPage,
    LeaderboardPage,
    NotificationsPage,
    RiddlesPage,
    RulesPage,
    TabsPage,
    CaptureModal,
    RiddlesSolveModalPage,
    RiddleDetailPage,
    GameStreamPage,
    NotificationTabPage,
    PasscodePage,
    MrxPage,
    ProfileImagePage,
    ImageUploader,
    NativeLogin
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot({
      driverOrder: ['indexeddb', 'localstorage', 'websql']
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBYAjZ-QKEPlDFLPsLcxR5fFRM2LckyZ6o'
    }),
    ImageUploadModule,
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
    RiddlesSolveModalPage,
    RiddleDetailPage,
    GameStreamPage,
    NotificationTabPage,
    PasscodePage,
    ProfileImagePage,
    MrxPage,
    NativeLogin
  ],
  providers: [
    {provide: ErrorHandler, useClass: PioxErrorHandler},
    DatePipe,
    TeamService,
    RiddleService,
    StationService,
    LocationService,
    NotificationService,
    PioxApiService,
    MrxService,
    ConfigService,
    NavigationService,
    GameStreamService,
    PasscodeService,
      SplashScreen,
      Camera,
      BarcodeScanner,
      StatusBar
  ]
})
export class AppModule {}
