"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyDatabaseConfig = exports.DatabaseType = void 0;
const mongoCollection_config_1 = require("./mongoCollection.config");
const inMemory_config_1 = require("./inMemory.config");
// Enum representing the supported database types.
var DatabaseType;
(function (DatabaseType) {
    DatabaseType["InMemory"] = "in-memory";
    DatabaseType["MongoDocuments"] = "mongo-collections";
})(DatabaseType || (exports.DatabaseType = DatabaseType = {}));
const verifyDatabaseConfig = (dbConfig) => {
    if (!dbConfig) {
        throw new Error("Missing database configuration");
    }
    if (!dbConfig.type) {
        throw new Error("Missing database type");
    }
    switch (dbConfig.type) {
        case DatabaseType.InMemory:
            inMemory_config_1.InMemoryConfig.verifyConfigX(dbConfig.config);
            break;
        case DatabaseType.MongoDocuments:
            mongoCollection_config_1.MongoCollectionConfig.verifyConfigX(dbConfig.config);
            break;
        default:
            throw new Error(`Database type ${dbConfig.type} is not supported`);
    }
};
exports.verifyDatabaseConfig = verifyDatabaseConfig;
