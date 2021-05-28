import { ICredential } from "../../../core/interfaces/IUsers";

export type UsersProps = {

}

export type UsersState = {
    loading: boolean;
    actualPage: number;
    sizePage: number;
    users: ICredential[];
    idCredential: string;
    totalResults: number;
    searchWithError: boolean;
    showCreateUserModal: boolean;
    showEditUserModal: boolean;
}