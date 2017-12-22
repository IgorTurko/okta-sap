import * as React from 'react';
import {Component} from 'react';
import {connect, Dispatch} from 'react-redux';
import {AppState} from '../store';

import {hideNotification} from '../store/notification/actions';
import {PlatformNotification} from '../store/notification/state';

import "../css/Notification.css";

const {TransitionGroup, CSSTransition} = require('react-transition-group');


interface NotificationComponentProps {
    notifications: PlatformNotification[];
    hideNotification: (id: number) => any;
}

class NotificationComponent extends Component<NotificationComponentProps> {
    render() {
        return (
            <TransitionGroup className="Notification">
                {
                    this.props.notifications
                        .filter(n => !n.hidden)
                        .map((notification: PlatformNotification) =>
                            <CSSTransition
                                key={notification.id}
                                classNames="transition"
                                timeout={900}
                            >
                                <div className="Notification__item">
                                    {notification.message}
                                    <button
                                        onClick={() => this.props.hideNotification(notification.id)}
                                        className="btn btn-light btn-sm"
                                    >hide</button>
                                </div>
                            </CSSTransition>
                        )
                }
            </TransitionGroup>
        );
    }
}

export const Notification = connect<any, any, any>(
    (state: AppState) => {
        return ({
            notifications: state.notification.notifications,
        });
    },
    (dispatch: Dispatch<AppState>) => ({
        hideNotification: (id: number) => dispatch(hideNotification({id})),
    }),
)(NotificationComponent);