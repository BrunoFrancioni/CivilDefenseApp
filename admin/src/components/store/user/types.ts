import { ICredential } from "../../../core/interfaces/IUsers";

export type UserState = {
    logged: boolean;
    info: ICredential | null;
}