"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationFrameworkBuilder = void 0;
const _1 = __importDefault(require("."));
const database_config_1 = require("./configs/db/database.config");
const logger_1 = require("./logger");
class NotificationFrameworkBuilder {
    constructor() {
        this.buildX = () => {
            if (!this.logger) {
                this.logger = new logger_1.Logger();
            }
            if (!this.dbConfig) {
                throw new Error("dbConfig is required");
            }
            if (!this.concreteNotificationClasses ||
                this.concreteNotificationClasses.length === 0) {
                throw new Error("concreteNotificationClasses is required");
            }
            return _1.default.getInstanceX(this.dbConfig, this.concreteNotificationClasses, this.logger);
        };
    }
    withLogger(logger) {
        this.logger = logger;
        return this;
    }
    withMongoCollectionConfig(config) {
        this.dbConfig = {
            type: database_config_1.DatabaseType.MongoDocuments,
            config,
        };
        return this;
    }
    withInMemoryDbConfig(config) {
        this.dbConfig = {
            type: database_config_1.DatabaseType.InMemory,
            config,
        };
        return this;
    }
    withConcreteNotificationClasses(concreteNotificationClasses) {
        this.concreteNotificationClasses = concreteNotificationClasses;
        return this;
    }
}
exports.NotificationFrameworkBuilder = NotificationFrameworkBuilder;
