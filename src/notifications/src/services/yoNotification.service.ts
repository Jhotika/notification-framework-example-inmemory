import { YoNotification } from "../models/yoNotification";
import { NotificationService } from "../../lib/services/notification.service";

export class SplitInviteNotificationService extends NotificationService {
    private constructor(parent: NotificationService) {
        super(
        parent.viewerId,
        parent.notificationRepository,
        parent.userNotificationMetadataRepository,
        parent.notificationClasses,
        parent.logger
        );
    }

    static fromNotificationService = (
        notificationService: NotificationService
    ): SplitInviteNotificationService => {
        return new SplitInviteNotificationService(notificationService);
    };

    async genCreateSplitInviteNotification(
        invitedUserUuid: string, // owner
        viewerUuid: string, // sender
        message: string
    ): Promise<void> {
        const notif = YoNotification.New(
        invitedUserUuid,
        viewerUuid,
        message,
        {}
        );
        try {
        await this.genSave(notif);
        } catch (error) {
        this.logger.error("Failed to send split invite notification", {
            error: error,
            invitedUserUuid: invitedUserUuid,
            viewerUuid: viewerUuid,
            message: message,
        });
        }
    }
}