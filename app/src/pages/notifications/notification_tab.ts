import { Component } from '@angular/core';

import { Notification } from '../../interfaces/notification';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'page-notifications',
  templateUrl: 'notification_tab.html'
})
export class NotificationTabPage {
  notifications:Notification[] = [];

  constructor(private notificationService:NotificationService) {
    this.updateNotifications();
    notificationService.notifications.subscribe((notifications: Array<Notification>) => {
        this.notifications = notifications;
    });
  }

  updateNotifications(): void {
    this.notificationService.updateNotifications();
  }

  ionViewWillLeave() {
    this.notificationService.notificationsRead();
  }

}
