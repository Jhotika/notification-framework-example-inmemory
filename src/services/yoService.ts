import { ExampleNotificationFramework } from "clients/notificationClient";
import { NotificationService } from "notifications/lib";

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
        const breaNotifFramework = ExampleNotificationFramework.getInstanceX();
        const notifService = breaNotifFramework.getNotificationServiceX(viewerUid);
        return new YoService(viewerUid, notifService);
    }
};