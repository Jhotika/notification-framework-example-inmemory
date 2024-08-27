import { INotificationFramework, NotificationFramework } from "notifications/lib";
import { Logger } from "notifications/lib/logger";
import { NotificationFrameworkBuilder } from "notifications/lib/notificationFramework.builder";
import { YoNotification } from "notifications/src/models/yoNotification";

export class ExampleNotificationFramework{
    static instance: NotificationFramework;
    static getInstanceX = () => {
        const nfWithInMemory = (): INotificationFramework => {
            const framework = new NotificationFrameworkBuilder()
            .withLogger(new Logger())
            .withInMemoryDbConfig({})
            .withConcreteNotificationClasses([YoNotification])
            .buildX();
            return framework;
        };
        return ExampleNotificationFramework.instance;
    }
}