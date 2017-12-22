import {http, reduxHttpMiddlewareFactory} from 'rd-redux-http';
import {ChangePasswordResponse, RegisterRequest, RegisterResponse, ChangePasswordRequest} from '../declarations/server-api';
import config from './config';

export const mw = reduxHttpMiddlewareFactory();

function apiUrl(path: string) {
    return `https://dev-710579.oktapreview.com/api/v1${path}`;
}

function customFetch(request: Request) {
    return fetch(request, {
        mode: 'cors',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `SSWS ${config.token}`,
        })
    });
}

export const register = mw.register(
    http.post(apiUrl('/users'))
        .withFetch(customFetch)
        .jsonBody<RegisterRequest>()
        .resultFromJson<RegisterResponse>()
        .build(),
);


export const changePassword = mw.register(
    http.post<{id: string;}>(apiUrl('/users/:id/credentials/change_password'))
        .withFetch(customFetch)
        .jsonBody<ChangePasswordRequest>()
        .resultFromJson<ChangePasswordResponse>()
        .build(),
);
