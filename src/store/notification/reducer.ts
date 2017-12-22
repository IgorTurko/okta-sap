import {defaultNotificationState, NotificationState} from './state';
import {Action} from 'redux';
import {addNotification, hideNotification} from './actions';


let id = 0;

export function notificationReducer(state: NotificationState = defaultNotificationState, action: Action) {

    if (addNotification.is(action)) {
        const notification  = {
            message: action.message,
            addedAt: action.addedAt,
            subtype: action.subtype,
            id: id++,
        };

        return {
            ...state,
            notifications: [
                ...state.notifications,
                notification,
            ],
        }
    }

    if (hideNotification.is(action)) {

        return {
            ...state,
            notifications: state.notifications.map(n => {
                if (n.id === action.id) {
                    n.hidden = true;
                }

                return n;
            }),
        }
    }

    return state;
}