export interface ICredential {
    _id: string;
    name_lastname: string;
    dni: string;
    organization: string;
    email: string;
}

export interface ICredentialLogIn {
    email: string;
    password: string;
}