import { all, put, call, select, takeEvery } from "redux-saga/effects";
import {changePasswordForm, registerForm} from './state';
import {changePassword, register} from '../../common/requests';
import {push} from 'react-router-redux';
import {addNotification} from '../notification/actions';


export function* usersSaga() {
    yield all([
        takeEvery(registerForm.actions.VALIDATE, function* () {
            const state = yield select();
            const form = registerForm.selector(state.user.registerForm);

            if (form.data) {
                yield put(register.actions.running({}));
                yield put(registerForm.actions.resetErrors());

                const body = {
                    "profile": {
                        "firstName": form.data.firstName,
                        "lastName": form.data.lastName,
                        "email": form.data.email,
                        "login": form.data.email,
                    },
                    "credentials": {
                        "password" : { "value": form.data.password }
                    }
                };

                const response: typeof register.types.response = yield call(
                    register as any,
                    {},
                    body
                );

                if (response.ok) {
                    yield put(register.actions.ok({}, response));
                    yield put(addNotification({
                        message: "You have been registered successfully!",
                        addedAt: performance.now(),
                        subtype: "success"
                    }));
                    yield put(push("/"));
                } else {
                    yield put(register.actions.error({}, response));

                    const error = (((response as any).error || {}).errorCauses || []).map((m: any) => m.errorSummary).join(" ")

                    yield put(registerForm.actions.setErrors({message: [error || "An error occured on registration."]}));
                }
            }
        }),

        takeEvery(changePasswordForm.actions.VALIDATE, function* () {
            const state = yield select();
            const form = changePasswordForm.selector(state.user.changePasswordForm);
            const id = state.user.user.sub;
            const params = {id};

            if (form.data && id) {
                yield put(changePassword.actions.running(params));
                yield put(changePasswordForm.actions.resetErrors());

                if (form.data.oldPassword === form.data.newPassword) {
                    yield put(changePasswordForm.actions.setErrors({message: [ "New password should not be equal to old" ]}));
                    return;
                }

                const body = {
                    oldPassword: form.data.oldPassword,
                    newPassword: form.data.newPassword,
                };

                const response: typeof changePassword.types.response = yield call(
                    changePassword as any,
                    params,
                    body
                );

                if (response.ok) {
                    yield put(changePassword.actions.ok(params, response ));
                    yield put(push("/"));
                    yield put(addNotification({
                        message: "You have changed password successfully!",
                        addedAt: performance.now(),
                        subtype: "success"
                    }));
                } else {
                    yield put(changePassword.actions.error(params, response));

                    const error = (((response as any).error || {}).errorCauses || []).map((m: any) => m.errorSummary).join(" ");

                    yield put(changePasswordForm.actions.setErrors({message: [error || "An error occured on registration."]}));
                }
            }
        }),
    ]);

}