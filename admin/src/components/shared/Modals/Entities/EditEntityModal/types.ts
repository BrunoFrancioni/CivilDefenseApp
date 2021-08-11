import { IEditEntityDTO } from "../../../../../core/interfaces/IEntities";

export type EditEntityModalProps = {
    showModal: boolean;
    entity: IEditEntityDTO;
    handleClose: any;
    handleEntityEdited: any;
}