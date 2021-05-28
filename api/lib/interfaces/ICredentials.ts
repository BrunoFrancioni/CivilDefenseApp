export interface ICredential {
    _id: string;
    name_lastname: string;
    dni: string;
    organization: string;
    email: string;
}

export interface ICreateCredentials {
    name_lastname: string;
    dni: string;
    organization: string;
    email: string;
}

export interface ICreateCredentialsResult {
    result: boolean;
    pass: string;
}

export interface ILoginCredential {
    email: string;
    password: string;
}

export interface ILoginResult {
    result: boolean;
    token: string;
    user: ICredential;
}

export interface IGetCredentials {
    page: number;
    size: number;
}

export interface IGetCredentialsResult {
    result: boolean;
    credentials: ICredential[];
    totalResults: number;
}

export interface IGetCredentialByIdResult {
    result: boolean;
    credential: ICredential;
}

export interface IEditCredential {
    name_lastname: string;
    dni: string;
    organization: string;
}

export interface IEditCredentialResult {
    result: boolean;
}

export interface IGetNewPassword {
    idAdmin: string;
    idCredential: string;
}

export interface IGetNewPasswordResult {
    result: boolean;
    newPassword: string;
}

export interface IDeleteCredentialResult {
    result: boolean;
}