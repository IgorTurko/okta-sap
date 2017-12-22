import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import createHistory from "history/createBrowserHistory";
import {routerMiddleware, routerReducer, RouterState} from 'react-router-redux';

import {mw} from '../common/requests';

import {usersReducer} from './user/reducer';
import {UsersState} from './user/state';
import {all} from 'redux-saga/effects';
import createSagaMiddleware from "redux-saga";
import {usersSaga} from './user/saga';
import {notificationReducer} from './notification/reducer';
import {NotificationState} from './notification/state';
import {notificationSaga} from './notification/saga';

export interface AppState {
    user: UsersState;
    router: RouterState;
    notification: NotificationState;
}

const composeEnhancers = window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose;
const sagaMiddleware = createSagaMiddleware();
export const browserHistory = createHistory();

export const store = createStore(
    combineReducers<AppState>({
        user: usersReducer,
        router: routerReducer,
        notification: notificationReducer,
    }),
    composeEnhancers(
        applyMiddleware(
            sagaMiddleware,
            routerMiddleware(browserHistory),
            mw
        )
    )
);

sagaMiddleware.run(function* () {
    yield all([
        usersSaga(),
        notificationSaga(),
    ]);
});