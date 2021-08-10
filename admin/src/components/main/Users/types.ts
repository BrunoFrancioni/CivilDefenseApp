import { ICredential } from "../../../core/interfaces/IUsers";

export type UsersState = {
    loading: boolean;
    actualPage: number;
    sizePage: number;
    users: ICredential[];
    credential: ICredential;
    totalResults: number;
    searchWithError: boolean;
    showCreateUserModal: boolean;
    showEditUserModal: boolean;
}