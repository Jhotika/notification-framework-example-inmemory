"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MockIds {
    constructor() {
        this.ownerId = "owner__0001"; // receiver / owner of the notification
        this.viewerId = "viewer__0001"; // sender of the notification
    }
    static getInstance() {
        if (!MockIds.instance) {
            MockIds.instance = new MockIds();
        }
        return MockIds.instance;
    }
}
exports.default = MockIds;
