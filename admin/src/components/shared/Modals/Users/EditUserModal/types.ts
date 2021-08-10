import { ICredential, IEditCredential } from "../../../../../core/interfaces/IUsers"

export type EditUserModalProps = {
    showModal: boolean;
    credential: ICredential;
    handleClose: any;
    handleUserUpdated: any;
}