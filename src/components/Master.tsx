import * as React from 'react';
import {Component} from 'react';
import {withAuth} from '@okta/okta-react';

import '../css/Master.css';
import {Link} from 'react-router-dom';
import {connect, Dispatch} from 'react-redux';
import {AppState} from '../store';
import {addUserToState, login, logout} from '../store/user/actions';
import {UserData} from '../declarations/server-api';
import {Route, RouteComponentProps, Switch, withRouter} from 'react-router';
import {ChangePasswordPage} from './ChangePasswordPage';
import {RegistrationPage} from './RegistrationPage';
import {Home} from './Home';
import {Notification} from './Notification';
import {addNotification} from '../store/notification/actions';


interface MasterProps extends RouteComponentProps<{}> {
    auth: {
        login: () => any;
        redirect: () => any;
        logout: () => any;
        isAuthenticated: () => Promise<boolean>;
        getAccessToken: () => Promise<string>;
        getUser: () => Promise<any>;
    }
}

interface MasterComponentProps extends MasterProps {
    user: UserData;
    isHomePage: boolean;
    path: string;
    addUserToState: (user: UserData) => any;
    addNotification: () => any;
    login: () => any;
    logout: () => any;
}

interface MasterComponentState {
    authenticated: boolean | null;
}

class MasterComponent extends Component<MasterComponentProps, MasterComponentState> {
    constructor(props: MasterComponentProps) {
        super(props);

        this.state = {
            authenticated: null,
        };
    }

    checkAuthentication = async (props: MasterComponentProps) => {
        const authenticated = await props.auth.isAuthenticated();
        const user = await props.auth.getUser();

        if (authenticated !== this.state.authenticated) {
            this.setState({authenticated});
            this.props.addUserToState(user);
        }
    };

    componentDidMount() {
        this.checkAuthentication(this.props);
    }

    componentDidUpdate() {
        this.checkAuthentication(this.props);
    }

    handleLogin = () => {
        this.props.login();
        this.props.auth.login();
    };

    handleLogout = () => {
        this.props.logout();
        this.props.auth.logout();
        this.props.history.push('/');
    };

    render() {
        return (
            <div className="Master">
                <header className="Master__header navbar navbar-light bg-light">
                    <ul className="nav mr-auto">
                        <li className="nav-item">
                            {
                                !this.props.isHomePage &&
                                <button
                                    className="Master__button btn btn-primary"
                                >
                                    <Link to="/">
                                        Back
                                    </Link>
                                </button>
                            }
                        </li>
                        <li className="nav-item">
                            {
                                !this.state.authenticated &&
                                this.props.path !== '/registration' &&
                                <button
                                    className="Master__button btn btn-primary"
                                >
                                    <Link to="/registration">
                                        Register
                                    </Link>
                                </button>
                            }
                        </li>
                        <li className="nav-item">
                            {
                                !this.state.authenticated &&
                                <button
                                    className="Master__button btn btn-primary"
                                    onClick={this.handleLogin}
                                >Login</button>
                            }
                        </li>
                        <li className="nav-item">
                            {
                                this.state.authenticated &&
                                this.props.path !== '/change-password' &&
                                <button
                                    className="Master__button btn btn-primary"
                                >
                                    <Link to="/change-password">
                                        Change password
                                    </Link>
                                </button>
                            }
                        </li>
                        <li className="nav-item">
                            {
                                this.state.authenticated &&
                                <button
                                    className="Master__button btn btn-primary"
                                    onClick={this.handleLogout}
                                >Logout</button>
                            }
                        </li>
                    </ul>
                </header>
                {/*<button onClick={this.props.addNotification}> add not</button>*/}
                <main className="Master__main">
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path='/registration' exact component={RegistrationPage}/>
                        <Route path='/change-password' exact component={ChangePasswordPage}/>
                    </Switch>
                </main>
                <Notification/>
            </div>
        );
    }
}

export const Master = withAuth(
    withRouter(
        connect<any, any, any>(
            (state: AppState, props: MasterProps) => {
                return {
                    ...props,
                    isHomePage: (state.router.location || {} as any).pathname === '/',
                    path: (state.router.location || {} as any).pathname,
                    user: state.user.user,
                };
            },
            (dispatch: Dispatch<AppState>) => ({
                addNotification: () => dispatch(addNotification({message: "Some text", subtype: "success", addedAt: performance.now()})),
                addUserToState: (user: any) => dispatch(addUserToState({user})),
                login: () => dispatch(login({})),
                logout: () => dispatch(logout({})),
            }),
        )(MasterComponent)
    )
);