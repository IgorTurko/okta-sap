import {defineAction} from '../../lib/rd-action-creators';


export const addUserToState = defineAction<{user: any;}>("Add user data");
export const login = defineAction<{}>("User login");
export const logout = defineAction<{}>("user logout");