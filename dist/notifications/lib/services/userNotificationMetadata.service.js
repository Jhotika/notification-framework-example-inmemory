"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotificationMetadataService = void 0;
class UserNotificationMetadataService {
    constructor(viewerId, repository, logger) {
        this.viewerId = viewerId;
        this.repository = repository;
        this.logger = logger;
        this.genIfUserHasNewNotificationX = async () => {
            try {
                const [userMetadata, latestNotifCreateTime] = await Promise.all([
                    this.repository.genFetchUserMetadataX(this.viewerId),
                    this.repository.genFetchLatestCreationTimeForUserX(this.viewerId),
                ]);
                const lastFetchTime = userMetadata?.lastFetchTime ?? 0;
                return latestNotifCreateTime > lastFetchTime;
            }
            catch (e) {
                this.logger.error(`Error fetching user metadata for ${this.viewerId}`);
                throw e;
            }
        };
        this.genUpdateWatermarkForUserX = async () => {
            try {
                await this.repository.genUpdateWatermarkForUserX(this.viewerId);
            }
            catch (e) {
                this.logger.error(`Error updating watermark for ${this.viewerId}`);
                throw e;
            }
        };
    }
}
exports.UserNotificationMetadataService = UserNotificationMetadataService;
