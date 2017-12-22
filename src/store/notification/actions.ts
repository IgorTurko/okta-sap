import {defineAction} from '../../lib/rd-action-creators';


interface AddNotification {
    addedAt: number;
    message: string;
    subtype: string;
}

export const addNotification = defineAction<AddNotification>("Add notification");
export const hideNotification = defineAction<{id: number;}>("Hide notification");