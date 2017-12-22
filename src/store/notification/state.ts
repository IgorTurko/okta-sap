export interface PlatformNotification {
    id: number;
    subtype: string;
    message: string;
    hidden: boolean;
    addedAt: number;
}

export interface NotificationState {
    notifications: PlatformNotification[];
}

export const defaultNotificationState: NotificationState = {
    notifications: []
};