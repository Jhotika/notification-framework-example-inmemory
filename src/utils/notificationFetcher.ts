import { Request } from "express";
import { ExampleNotificationFramework } from "../clients/notificationClient";
import { NotificationService } from "../notifications/lib/services/notification.service";
import { UserNotificationMetadataService } from "../notifications/lib/services/userNotificationMetadata.service";
import MockIds from "../mock/mockIds";

export class NotificationServiceFetcher {
    constructor(private readonly userId: string) {}
    
    static fromRequest(req: Request): NotificationServiceFetcher {
      // hardcoding the userId for demo purposes
      // in a real application, you would get the userId from the request or middleware
      const userId = MockIds.getInstance().viewerId;
      if (!userId) {
        throw new Error("userId is required");
      }
      return new NotificationServiceFetcher(userId);
    }
  
    static fromUserId(userId: string): NotificationServiceFetcher {
      return new NotificationServiceFetcher(userId);
    }
  
    fetchNotificationService(): NotificationService {
      const notifFramework = ExampleNotificationFramework.getInstanceX();
      return notifFramework.getNotificationServiceX(this.userId);
    }
    fetchUserNotificationMetadataService(): UserNotificationMetadataService {
      const notifFramework = ExampleNotificationFramework.getInstanceX();
      return notifFramework.getUserNotificationMetadataServiceX(this.userId);
    }
  }
  