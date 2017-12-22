
interface Credentials {
    password: {};
    provider: {
        type: string;
        name: string;
    };
}

interface Activate {
    href: string;
}

interface Links {
    activate: Activate;
}

interface RegisterResponse {
    id: string;
    status: string;
    created: Date;
    activated?: any;
    statusChanged?: any;
    lastLogin?: any;
    lastUpdated: Date;
    passwordChanged: Date;
    profile: {
        firstName: string;
        lastName: string;
        email: string;
        login: string;
        mobilePhone: string;
    };
    credentials: Credentials;
    _links: Links;
}


interface ProfileRequest {
    firstName: string;
    lastName: string;
    email: string;
    login: string;
    mobilePhone: string;
}

export interface CredentialsRequest {
    password: {
        value: string;
    };
}

export interface RegisterRequest {
    profile: ProfileRequest;
    credentials: CredentialsRequest;
}

export interface ChangePasswordRequest {
    oldPassword: { value: string; };
    newPassword: { value: string; };
}

export interface ChangePasswordResponse {
    credentials: {
        password: {},
        recovery_question: {
            question: string;
        },
        provider: {
            type: "OKTA";
            name: "OKTA";
        }
    }
}

export interface UserData {
    sub: string;
    name: string;
    locale: string;
    email: string;
    preferred_username: string;
    given_name: string;
    family_name: string;
    zoneinfo: string;
    updated_at: number;
    email_verified: boolean;
}



