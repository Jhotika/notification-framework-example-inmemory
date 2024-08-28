import { YoNotificationService } from "../notifications/src/services/yoNotification.service";
import { ExampleNotificationFramework } from "../clients/notificationClient";
import { NotificationService } from "../notifications/lib";
import MockIds from "../mock/mockIds";

export interface IWithNotificationService<T extends NotificationService> {
    readonly notificationService: T;
}
  
export interface IWithMaybeNotificationService<T extends NotificationService> {
    readonly notificationService: T | null;
}
  
export class YoService implements IWithMaybeNotificationService<NotificationService>{
    constructor(
        public viewerUid: string,
        public notificationService: NotificationService | null
    ) {}

    static withNotificationService = ( viewerUid: string ): YoService => {
        console.log("YoService.withNotificationService");
        const breaNotifFramework = ExampleNotificationFramework.getInstanceX();
        const notifService = breaNotifFramework.getNotificationServiceX(viewerUid);
        return new YoService(viewerUid, notifService);
    }

    async doSomethingAndSendNotification(): Promise<boolean> {
        console.log("YoService.doSomethingAndSendNotification");
        try {
            if (!this.notificationService) {
              console.error("Notification service not initialized in TripsService");
              return true;
            } else {
              const notifService =
                YoNotificationService.fromNotificationService(
                  this.notificationService
                );
              await notifService.genCreateNotification(MockIds.getInstance().ownerId);
            }
          } catch (e) {
            console.error(
              `Failed to create notification for user ${this.viewerUid}`,
            );
        }
        return true;
    }
};