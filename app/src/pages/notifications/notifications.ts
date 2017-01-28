
import { Notification } from '../../interfaces/notification';
import { NotificationService } from '../../services/notification.service';

import { Component } from '@angular/core';

import {NavigationService} from "../../services/navigation.service";

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {
  notifications:Notification[] = [];

  constructor(private notificationService:NotificationService,
              public navService: NavigationService) {
    this.updateNotifications();
    notificationService.notifications.subscribe((notifications: Array<Notification>) => {
        this.notifications = notifications;
    });
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
