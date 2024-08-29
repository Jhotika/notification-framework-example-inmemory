"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoCollectionConfig = exports.dbType = void 0;
const abstractDb_config_1 = require("./abstractDb.config");
exports.dbType = "mongo-collections";
class MongoCollectionConfig extends abstractDb_config_1.AbstractDbConfig {
    constructor(dbType) {
        super();
        this.dbType = dbType;
    }
}
exports.MongoCollectionConfig = MongoCollectionConfig;
MongoCollectionConfig.verifyConfigX = (config) => {
    const missingFields = [];
    if (!config.notificationCollection) {
        missingFields.push("Notification collection");
    }
    if (!config.userNotificationMetadataCollection) {
        missingFields.push("User notification metadata collection");
    }
    if (missingFields.length > 0) {
        throw new Error(`${missingFields.join(", ")} ${missingFields.length > 1 ? "is" : "are"} required`);
    }
};
