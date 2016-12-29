import { Notification } from '../../interfaces/notification';
import { NotificationService } from '../../services/notification.service';

import { Component, Input } from '@angular/core';

@Component({
  selector: 'notification-detail',
  templateUrl: 'notification-detail.component.html'
})
export class NotificationDetailComponent {
  @Input() notification:Notification;

  constructor(private notificationService:NotificationService) {

  }

}