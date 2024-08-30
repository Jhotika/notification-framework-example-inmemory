import { Request } from "express";
import { ExampleNotificationFramework } from "../clients/notificationClient";
import { NotificationService } from "../notifications/lib/services/notification.service";
import { UserNotificationMetadataService } from "../notifications/lib/services/userNotificationMetadata.service";
import MockIds from "../mock/mockIds";

export class NotificationServiceFetcher {
    constructor(private readonly userId: string) {}

    static fromUserId(userId: string): NotificationServiceFetcher {
      return new NotificationServiceFetcher(userId);
    }
  
    static fetchNotificationService(): NotificationService {
      const notifFramework = ExampleNotificationFramework.getInstanceX();
      return notifFramework.getNotificationServiceX(MockIds.getInstance().ownerId);
    }
    fetchUserNotificationMetadataService(): UserNotificationMetadataService {
      const notifFramework = ExampleNotificationFramework.getInstanceX();
      return notifFramework.getUserNotificationMetadataServiceX(this.userId);
    }
  }
  