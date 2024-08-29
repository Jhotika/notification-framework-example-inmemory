import { IYoNotification, YoNotification } from "../models/yoNotification";
import { NotificationService } from "../../lib/services/notification.service";

export class YoNotificationService extends NotificationService {
    private constructor(parent: NotificationService) {
        super(
            parent.viewerId,
            parent.notificationRepository,
            parent.userNotificationMetadataRepository,
            parent.notificationClasses,
            parent.logger
        );
    }

    static fromNotificationService = ( notificationService: NotificationService ): YoNotificationService => {
        return new YoNotificationService(notificationService);
    };

    async genCreateNotification(
        ownerId: string // the user that will receive the notification
      ): Promise<void> {
        console.log("YoNotificationService.genCreateNotification: ownerId", ownerId, "viewerId", this.viewerId);
        const notification: IYoNotification = YoNotification.New(
          ownerId,
          this.viewerId,
          "Yo, what's up?"
        );
        console.log("Notification created: ", notification);
        try {
          await this.genSave(notification);
          console.log("Notification saved in memory");
        } catch (error) {
          console.log(error);
        }
      }
}