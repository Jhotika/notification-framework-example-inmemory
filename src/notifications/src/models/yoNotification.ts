import {
    AbstractNotification,
    INotification,
    INotificationResponse,
} from "../../lib/models/abstractNotification";
import { v4 as uuidv4 } from "uuid";
import { NotificationType } from "../notificationTypes";
  
export interface IYoNotification extends INotification<string> {
    message: string;
}

export interface IYoNotificationResponse extends INotificationResponse {
    senderUid: string;
    message: string;
}

export class YoNotification extends AbstractNotification implements IYoNotification {

    public readonly type = "YoNotification";
    public message: string;

    constructor(data: IYoNotification) {
        super(data);
    }

    static New = (
        ownerUid: string,
        senderUid: string,
        message: string,
        payload: Object = {}
    ): YoNotification => {
        return new YoNotification({
            uid: uuidv4(),
            type: NotificationType.Yo,
            payload,
            ownerUid,
            senderUid,
            message,
            isRead: false,
            createdAt: Date.now(),
        });
    };
    

    genResponse = async (): Promise<IYoNotificationResponse | null> => {
        return {
            notification: this,
            senderUid: this.senderUid,
            message: this.message,
        }
    }
    public toINotification(): INotification<string> {
        return {
            uid: this.uid,
            type: this.type,
            payload: this.payload,
            ownerUid: this.ownerUid,
            senderUid: this.senderUid,
            isRead: this.isRead,
            createdAt: this.createdAt,
        };
    }
}
  