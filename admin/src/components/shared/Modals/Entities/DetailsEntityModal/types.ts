import { IEditEntityDTO } from "../../../../../core/interfaces/IEntities";

export type DetailsEntityModalProps = {
    showModal: boolean;
    entity: IEditEntityDTO;
    handleClose: any;
    handleEditEntity: any;
    handleDeleteEntity: any;
}