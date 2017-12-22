import * as React from 'react';
import {Component} from 'react';

import {connect, Dispatch} from 'react-redux';
import {AppState} from '../store';
// import {Master} from './Master';


interface HomeComponentProps {
    user: any;
}

class HomeComponent extends Component<HomeComponentProps> {
    render() {
        return (
            <div>
                {
                    this.props.user &&
                    `Hello ${this.props.user.name}`
                }
            </div>
        );
    }
}

export const Home = connect<any, any, any>(
    (state: AppState) => {
        return {
            user: state.user.user,
        };
    },
    (dispatch: Dispatch<AppState>) => ({}),
)(HomeComponent);