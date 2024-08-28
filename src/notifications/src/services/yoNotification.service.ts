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
        ownerId: string // the user that is being invited
      ): Promise<void> {
        console.log("YoNotificationService.genCreateNotification");
        const notification: IYoNotification = YoNotification.New(
          ownerId,
          this.viewerId,
          "Yo, what's up?"
        );
        await this.genSave(notification);
      }
}