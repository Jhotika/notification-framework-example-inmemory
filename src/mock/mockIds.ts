class MockIds {
    public ownerId = "owner__0001"; // receiver / owner of the notification
    public viewerId = "viewer__0001"; // sender of the notification

    private static instance: MockIds;

    private constructor() {}

    public static getInstance(): MockIds {
        if (!MockIds.instance) {
            MockIds.instance = new MockIds();
        }
        return MockIds.instance;
    }
}

export default MockIds;