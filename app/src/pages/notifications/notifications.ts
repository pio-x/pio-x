
import { Notification } from '../../interfaces/notification';
import { NotificationService } from '../../services/notification.service';

import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {
  notifications:Notification[] = [];

  constructor(public navCtrl: NavController, private notificationService:NotificationService) {
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
