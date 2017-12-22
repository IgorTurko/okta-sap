import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Route} from 'react-router-dom';
import {Security, ImplicitCallback} from '@okta/okta-react';
import {Provider} from 'react-redux';
import { ConnectedRouter as Router } from "react-router-redux";

import './css/index.css';

import config from './common/config';

import {browserHistory, store} from './store';
import {Master} from './components/Master';



ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Security
                issuer={config.issuer}
                client_id={config.client_id}
                redirect_uri={config.redirect_uri}
            >
                <Route path='/' component={Master}/>
                <Route exact path='/implicit/callback' component={ImplicitCallback}/>
            </Security>
        </Router>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
