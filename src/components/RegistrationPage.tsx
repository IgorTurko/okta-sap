import * as React from 'react';
import {Component} from 'react';
import {connect, Dispatch} from 'react-redux';

import {AppState} from '../store';
import {registerForm, RegisterFormFields} from '../store/user/state';
import {FormSelectorResult, RdReduxFormEvents} from '../lib/rd-redux-forms/api';


interface RegistrationPageComponentProps extends RdReduxFormEvents<RegisterFormFields> {
    form: FormSelectorResult<RegisterFormFields>;
    touched: Set<string>;
}

class RegistrationPageComponent extends Component<RegistrationPageComponentProps> {

    render() {
        const {form, $events, touched} = this.props;
        const fields = form.fields;

        return (
            <div>
                <form {...$events.form} className="Form">
                    <div className="form-group">
                        <label>First name</label>
                        <input
                            value={fields.firstName.value}
                            placeholder="Enter first name..."
                            autoFocus
                            className="form-control"
                            {...$events.fields.firstName}
                            onBlur={() => {
                                if (touched.has("firstName")) {
                                    $events.fields.firstName.onBlur();
                                }
                            }}
                            type="text"
                        />
                        {
                            touched.has("firstName") && fields.firstName.visualState === 'invalid' &&
                            <p className="invalid-feedback">
                                {
                                    fields.firstName.errors && fields.firstName.errors.length
                                        ? fields.firstName.errors[0]
                                        : 'Invalid value'
                                }
                            </p>
                        }
                    </div>
                    <div className="form-group">
                        <label>Last name</label>
                        <input
                            value={fields.lastName.value}
                            placeholder="Enter last name..."
                            autoFocus
                            className="form-control"
                            {...$events.fields.lastName}
                            onBlur={() => {
                                if (touched.has("lastName")) {
                                    $events.fields.lastName.onBlur();
                                }
                            }}
                            type="text"
                        />
                        {
                            touched.has("lastName") && fields.lastName.visualState === 'invalid' &&
                            <p className="invalid-feedback">
                                {
                                    fields.lastName.errors && fields.lastName.errors.length
                                        ? fields.lastName.errors[0]
                                        : 'Invalid value'
                                }
                            </p>
                        }
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            value={fields.email.value}
                            placeholder="Enter email address..."
                            autoFocus
                            className="form-control"
                            {...$events.fields.email}
                            onBlur={() => {
                                if (touched.has("email")) {
                                    $events.fields.email.onBlur();
                                }
                            }}
                            type="text"
                        />
                        {
                            touched.has("email") && fields.email.visualState === 'invalid' &&
                            <p className="invalid-feedback">
                                {
                                    fields.email.errors && fields.email.errors.length
                                        ? fields.email.errors[0]
                                        : 'Invalid value'
                                }
                            </p>
                        }
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            value={fields.password.value}
                            placeholder="Enter password..."
                            autoFocus
                            className="form-control"
                            {...$events.fields.password}
                            onBlur={() => {
                                if (touched.has("password")) {
                                    $events.fields.email.onBlur();
                                }
                            }}
                            type="password"
                        />
                        {
                            touched.has("password") && fields.password.visualState === 'invalid' &&
                            <p className="invalid-feedback">
                                {
                                    fields.password.errors && fields.password.errors.length
                                        ? fields.password.errors[0]
                                        : 'Invalid value'
                                }
                            </p>
                        }
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
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
            </div>
        );
    }
}

export const RegistrationPage = connect<any, any, any>(
    (state: AppState) => {
        return {
            touched: state.user.registerForm.touched,
            form: registerForm.selector(state.user.registerForm),
        };
    },
    (dispatch: Dispatch<AppState>) => ({
        ...registerForm.connect.dispatch(dispatch),
    }),
)(RegistrationPageComponent);