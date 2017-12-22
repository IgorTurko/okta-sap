import {createForm, fields} from '../../lib/rd-redux-forms';
import {defaultFormBinding} from '../../lib/rd-redux-forms/react';
import {RdReduxFormState} from '../../lib/rd-redux-forms/api';
import {UserData} from '../../declarations/server-api';

export interface UsersState {
    fetchStatus?: string;
    registerForm: RdReduxFormState<RegisterFormFields>;
    changePasswordForm: RdReduxFormState<ChangePasswordFields>;
    user?: UserData;
}

export interface RegisterFormFields {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const registerForm = createForm<RegisterFormFields>("register form", {
    fields: {
        email: {
            parser(input: string = ""): string | null | undefined {
                input = input.trim();

                if (!input || !emailRegex.test(input)) {
                    return undefined;
                }

                return input;
            },
            formatter: (input: string | null): string => (input || "").trim(),
        },
        firstName: fields.string(true),
        lastName: fields.string(true),
        password: fields.string(true),
    },
    dispatch: defaultFormBinding(),
});

export interface ChangePasswordFields {
    oldPassword: string;
    newPassword: string;
}

export const changePasswordForm = createForm<ChangePasswordFields>("change password form", {
    fields: {
        oldPassword: fields.string(true),
        newPassword: fields.string(true),
    },
    dispatch: defaultFormBinding(),
});


export const defaultUsersState: UsersState = {
    registerForm: registerForm.state.empty(),
    changePasswordForm: changePasswordForm.state.empty(),
};