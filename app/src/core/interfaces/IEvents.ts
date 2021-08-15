import { ICredential } from "./IUsers";

export interface IEvent {
    _id: string;
    title: string;
    description: string;
    coordinates: string[];
    event_type: string;
    creator: ICredential;
    date_time: Date;
    active: boolean;
}

export interface ICreateEventInitialState {
    title: string;
    description: string;
    event_type: string;
}

export interface ICreateEvent {
    title: string;
    description: string;
    altitude: string;
    latitude: string;
    event_type: string;
    date_time: Date;
    creator: string;
}