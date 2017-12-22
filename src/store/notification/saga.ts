import { all, put, select, takeEvery } from "redux-saga/effects";
import {addNotification, hideNotification} from '../notification/actions';
import {delay} from 'redux-saga';


export function* notificationSaga() {
    yield all([
        takeEvery(addNotification.type, function* (action: typeof addNotification.typeInterface) {
            const state = yield select();

            const thisNotification = state.notification.notifications.find((n: any) => n.addedAt === action.addedAt);

            yield delay(7000);
            yield put(hideNotification({id: thisNotification.id}));

        }),

    ]);

}