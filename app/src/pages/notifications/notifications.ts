import { Notification } from '../../interfaces/notification';
import { NotificationService } from '../../services/notification.service';

import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {
  notifications:Notification[];
  selectedNotification: Notification;

  constructor(public navCtrl: NavController, private notificationService:NotificationService) {
    this.updateNotifications();
  }

  onSelect(notification: Notification): void {
    this.notificationService.read(notification.id);
    this.updateNotifications();
    this.selectedNotification = notification;
  }

  updateNotifications(): void {
    this.notificationService.get()
      .then(notifications => this.notifications = notifications);
  }
}
