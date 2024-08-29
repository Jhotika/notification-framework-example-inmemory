"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotificationMetadataService = exports.NotificationServiceBuilder = exports.NotificationService = exports.Errors = exports.DatabaseType = exports.NotificationFramework = void 0;
const database_config_1 = require("./configs/db/database.config");
Object.defineProperty(exports, "DatabaseType", { enumerable: true, get: function () { return database_config_1.DatabaseType; } });
const errors_1 = require("./errors");
Object.defineProperty(exports, "Errors", { enumerable: true, get: function () { return errors_1.Errors; } });
const logger_1 = require("./logger");
const repositoryFactory_1 = require("./repositories/repositoryFactory");
const notification_service_1 = require("./services/notification.service");
Object.defineProperty(exports, "NotificationService", { enumerable: true, get: function () { return notification_service_1.NotificationService; } });
const notification_service_builder_1 = require("./services/notification.service.builder");
Object.defineProperty(exports, "NotificationServiceBuilder", { enumerable: true, get: function () { return notification_service_builder_1.NotificationServiceBuilder; } });
const userNotificationMetadata_service_1 = require("./services/userNotificationMetadata.service");
Object.defineProperty(exports, "UserNotificationMetadataService", { enumerable: true, get: function () { return userNotificationMetadata_service_1.UserNotificationMetadataService; } });
/**
 * NotificationFramework is a singleton class that provides access to
 * the NotificationService and UserNotificationMetadataService.
 */
class NotificationFramework {
    constructor(dbConfig, logger = new logger_1.Logger(), notificationClasess) {
        this.dbConfig = dbConfig;
        this.logger = logger;
        this.notificationClasess = notificationClasess;
        /**
         * Gets the NotificationService instance.
         * @returns A NotificationService instance.
         */
        this.getNotificationServiceX = (viewerId) => {
            try {
                return new notification_service_1.NotificationService(viewerId, this.notificationRepository, this.userNotificationMetadataRepository, this.notificationClasess, this.logger);
            }
            catch (error) {
                this.logger.error("Error fetching NotificationService:", error);
                throw error; // Re-throw
            }
        };
        /**
         * Gets the UserNotificationMetadataService instance.
         * @returns A UserNotificationMetadataService instance.
         */
        this.getUserNotificationMetadataServiceX = (viewerId) => {
            try {
                return new userNotificationMetadata_service_1.UserNotificationMetadataService(viewerId, this.userNotificationMetadataRepository, this.logger);
            }
            catch (error) {
                this.logger.error("Error fetching UserNotificationMetadataService:", error);
                throw error; // Re-throw
            }
        };
        try {
            (0, database_config_1.verifyDatabaseConfig)(dbConfig);
        }
        catch (error) {
            this.logger.error("Error initializing NotificationFramework:", error);
            throw error; // Re-throw
        }
    }
}
exports.NotificationFramework = NotificationFramework;
_a = NotificationFramework;
/**
 * Constructs a new instance of NotificationFramework.
 * @param dbConfig - The database configuration.
 * @param logger - The logger instance.
 */
NotificationFramework.instance = null;
NotificationFramework.getInstanceX = (dbConfig, notificationClasses, logger) => {
    if (!_a.instance) {
        _a.instance = new _a(dbConfig, logger, notificationClasses);
        const { notificationRepository, userNotificationMetadataRepository } = repositoryFactory_1.RepositoryFactory.getRepositoryX(dbConfig);
        _a.instance.notificationRepository = notificationRepository;
        _a.instance.userNotificationMetadataRepository =
            userNotificationMetadataRepository;
    }
    else {
        if (_a.instance.dbConfig !== dbConfig) {
            throw new Error("Cannot instantiate multiple instances of NotificationFramework with different configurations., current instance configuration: " +
                _a.instance.dbConfig +
                ", new instance configuration: " +
                dbConfig);
        }
    }
    return _a.instance;
};
exports.default = NotificationFramework;
