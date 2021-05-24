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