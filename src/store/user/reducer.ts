import {changePasswordForm, defaultUsersState, registerForm, UsersState} from './state';
import {Action} from 'redux';
import {addUserToState, logout} from './actions';
import {LOCATION_CHANGE} from 'react-router-redux';


export function usersReducer(state: UsersState = defaultUsersState, action: Action) {

    if (registerForm.actions.isMyAction(action)) {
        return {
            ...state,
            registerForm: registerForm.reducer(state.registerForm, action)
        };
    }

    if (changePasswordForm.actions.isMyAction(action)) {
        return {
            ...state,
            changePasswordForm: changePasswordForm.reducer(state.changePasswordForm, action)
        };
    }

    if (action.type === LOCATION_CHANGE) {
        return {
            ...state,
            changePasswordForm: changePasswordForm.state.empty(),
            registerForm: registerForm.state.empty(),
        };
    }

    if (addUserToState.is(action)) {
        return {
            ...state,
            user: action.user,
        }
    }

    if (logout.is(action)) {
        return {
            ...state,
            user: undefined,
        }
    }

    return state;
}