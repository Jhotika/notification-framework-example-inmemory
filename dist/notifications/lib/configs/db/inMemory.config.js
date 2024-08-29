"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryConfig = exports.dbType = void 0;
const abstractDb_config_1 = require("./abstractDb.config");
exports.dbType = "in-memory";
class InMemoryConfig extends abstractDb_config_1.AbstractDbConfig {
    constructor(dbType) {
        super();
        this.dbType = dbType;
    }
}
exports.InMemoryConfig = InMemoryConfig;
InMemoryConfig.verifyConfigX = (_config) => {
    if (process.env.NODE_ENV === "production" &&
        process.env.IN_MEMORY_IN_PROD !== "true") {
        throw new Error("In-memory database is only supported in test environments");
    }
};
