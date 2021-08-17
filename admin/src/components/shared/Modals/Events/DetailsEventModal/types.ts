import { IEvent } from "../../../../../core/interfaces/IEvents";

export type DetailsEventModalProps = {
    showModal: boolean;
    event: IEvent;
    handleClose: any;
}