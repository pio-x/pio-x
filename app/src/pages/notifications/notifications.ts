
import { Notification } from '../../interfaces/notification';
import { NotificationService } from '../../services/notification.service';
import { Component } from '@angular/core';
import { NavigationService } from "../../services/navigation.service";

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {
  notifications:Notification[] = [];
  currentSegment: string = 'notifications';

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
