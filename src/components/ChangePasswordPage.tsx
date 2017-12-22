import * as React from 'react';
import {Component} from 'react';
import {connect, Dispatch} from 'react-redux';

import {AppState} from '../store';
import {ChangePasswordFields, changePasswordForm} from '../store/user/state';
import {FormSelectorResult, RdReduxFormEvents} from '../lib/rd-redux-forms/api';
import {UserData} from '../declarations/server-api';
import {addUserToState} from '../store/user/actions';


interface ChangePasswordPageComponentProps extends RdReduxFormEvents<ChangePasswordFields> {
    form: FormSelectorResult<ChangePasswordFields>;
    touched: Set<string>;
    user: UserData;
    addUserToState: (user: UserData) => any;
}

class ChangePasswordPageComponent extends Component<ChangePasswordPageComponentProps> {

    render() {
        const {form, $events, touched, user} = this.props;
        const fields = form.fields;

        return (
            <div>
                <main className="Home__main">
                    {
                        user &&
                        <form {...$events.form} className="Form">
                            <div className="form-group">
                                <label>Old password</label>
                                <input
                                    value={fields.oldPassword.value}
                                    placeholder="Enter old password..."
                                    autoFocus
                                    className="form-control"
                                    {...$events.fields.oldPassword}
                                    onBlur={() => {
                                        if (touched.has("oldPassword")) {
                                            $events.fields.oldPassword.onBlur();
                                        }
                                    }}
                                    type="password"
                                />
                                {
                                    touched.has("oldPassword") && fields.oldPassword.visualState === 'invalid' &&
                                    <p className="invalid-feedback">
                                        {
                                            fields.oldPassword.errors && fields.oldPassword.errors.length
                                                ? fields.oldPassword.errors[0]
                                                : 'Invalid value'
                                        }
                                    </p>
                                }
                            </div>
                            <div className="form-group">
                                <label>New password</label>
                                <input
                                    value={fields.newPassword.value}
                                    placeholder="Enter new password..."
                                    autoFocus
                                    className="form-control"
                                    onBlur={() => {
                                        if (touched.has("newPassword")) {
                                            $events.fields.oldPassword.onBlur();
                                        }
                                    }}
                                    {...$events.fields.newPassword}
                                    type="password"
                                />
                                {
                                    touched.has("newPassword") && fields.newPassword.visualState === 'invalid' &&
                                    <p className="invalid-feedback">
                                        {
                                            fields.newPassword.errors && fields.newPassword.errors.length
                                                ? fields.newPassword.errors[0]
                                                : 'Invalid value'
                                        }
                                    </p>
                                }
                            </div>
                            <button type="submit" className="btn btn-primary">Change</button>
                            {
                                form.formError &&
                                <p className="invalid-feedback">
                                    {
                                        form.formError.length
                                            ? form.formError[0]
                                            : 'Error occured while registration.'
                                    }
                                </p>
                            }
                        </form>
                    }
                </main>
            </div>
        );
    }
}


export const ChangePasswordPage = connect<any, any, any>(
    (state: AppState) => {
        return {
            user: state.user.user,
            touched: state.user.changePasswordForm.touched,
            form: changePasswordForm.selector(state.user.changePasswordForm),
        };
    },
    (dispatch: Dispatch<AppState>) => ({
        ...changePasswordForm.connect.dispatch(dispatch),
        addUserToState: (user: UserData) => dispatch(addUserToState({user})),
    }),
)(ChangePasswordPageComponent);