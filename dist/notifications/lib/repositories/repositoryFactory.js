"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryFactory = void 0;
const database_config_1 = require("../configs/db/database.config");
const mongoNotificationRepository_1 = require("./mongo/mongoNotificationRepository");
const mongoUserNotificationMetadataRepository_1 = require("./mongo/mongoUserNotificationMetadataRepository");
const databaseNotSupportedError_1 = require("../errors/databaseNotSupportedError");
const inMemoryNotificationRepository_1 = require("./inMemory/inMemoryNotificationRepository");
const inMemoryUserNotificationMetadataRepository_1 = require("./inMemory/inMemoryUserNotificationMetadataRepository");
class RepositoryFactory {
}
exports.RepositoryFactory = RepositoryFactory;
/**
 * Factory method to get the notification repositories based on the enabled database type.
 * @param enabledDbType: DatabaseType
 * @returns An object containing the notification repositories.
 * @throws DatabaseNotSupportedError
 */
RepositoryFactory.instance = null;
RepositoryFactory.config = null;
RepositoryFactory.getRepositoryX = (dbConfig) => {
    if (RepositoryFactory.instance != null) {
        if (RepositoryFactory.config === dbConfig) {
            return RepositoryFactory.instance;
        }
        else {
            throw new Error("Repository already initialized with different configuration settings. Existing config:" +
                JSON.stringify(RepositoryFactory.config) +
                "\n New config: \n" +
                JSON.stringify(dbConfig));
        }
    }
    RepositoryFactory.config = dbConfig;
    const dbType = dbConfig.type ?? process.env.ENABLED_DB_TYPE ?? "";
    let repository;
    switch (dbType) {
        case database_config_1.DatabaseType.MongoDocuments:
            const config = dbConfig.config;
            repository = {
                notificationRepository: mongoNotificationRepository_1.MongoNotificationRepository.fromCollectionX(config.notificationCollection),
                userNotificationMetadataRepository: mongoUserNotificationMetadataRepository_1.MongoUserNotificationMetadataRepository.fromCollections(config.notificationCollection, config.userNotificationMetadataCollection),
            };
            break;
        case database_config_1.DatabaseType.InMemory:
            repository = {
                notificationRepository: new inMemoryNotificationRepository_1.InMemoryNotificationRepository(),
                userNotificationMetadataRepository: new inMemoryUserNotificationMetadataRepository_1.InMemoryUserNotificationMetadataRepository(),
            };
            break;
        default:
            throw new databaseNotSupportedError_1.DatabaseNotSupportedError(`Database type ${dbType} is not supported`);
    }
    RepositoryFactory.instance = repository;
    return repository;
};
