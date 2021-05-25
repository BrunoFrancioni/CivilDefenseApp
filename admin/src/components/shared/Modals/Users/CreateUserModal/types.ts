import { ICreateCredentials } from "../../../../../core/interfaces/IUsers"

export type CreateUserModalProps = {
    showModal: boolean;
    handleClose: any;
    handleUserCreated: any;
}

export type CreateUserModalState = {
    createCredentialsDTO: ICreateCredentials;
}