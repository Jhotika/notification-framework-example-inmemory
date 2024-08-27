import {
    AbstractNotification,
    INotification,
    INotificationResponse,
  } from "../../lib/models/abstractNotification";
import { v4 as uuidv4 } from "uuid";
import { NotificationType } from "../notificationTypes";
  
export interface IYoNotification<T> extends INotification<T> {
    message: string;
}

export interface IYoNotificationResponse extends INotificationResponse {
    message: string;
}

export class YoNotification extends AbstractNotification implements IYoNotification<string> {

    public readonly type = NotificationType.Yo;
    public message: string;

    constructor(data: IYoNotification<string>) {
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
    

    public genResponse(): Promise<INotificationResponse | null> {
        throw new Error("Method not implemented.");
    }
    public toINotification(): INotification<string> {
        throw new Error("Method not implemented.");
    }
}
  