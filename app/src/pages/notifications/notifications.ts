
import { Notification } from '../../interfaces/notification';
import { NotificationService } from '../../services/notification.service';

import { Component } from '@angular/core';
import { GameStreamPage } from './game_stream';

import {NavigationService} from "../../services/navigation.service";
import {NotificationTabPage} from "./notification_tab";

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {
  notifications:Notification[] = [];

  gameFeedTab: any = GameStreamPage;
  notificationsTab: any = NotificationTabPage;

  constructor(private notificationService:NotificationService,
              public navService: NavigationService) {

  }
  presentActionSheet() {
    this.navService.presentActionSheet()
  }

  updateNotifications(): void {
    this.notificationService.updateNotifications();
  }

  ionViewWillLeave() {
    this.notificationService.notificationsRead();
  }
}
