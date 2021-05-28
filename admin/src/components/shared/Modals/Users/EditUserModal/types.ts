import { ICredential, IEditCredential } from "../../../../../core/interfaces/IUsers"

export type EditUserModalProps = {
    showModal: boolean;
    idCredential: string;
    handleClose: any;
    handleUserUpdated: any;
}

export type EditUserModalStatus = {
    loading: boolean;
    searchWithError: boolean;
    credential: ICredential;
    editCredentialDTO: IEditCredential;
}