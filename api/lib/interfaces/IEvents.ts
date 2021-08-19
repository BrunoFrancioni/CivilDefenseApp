import { ICredential } from "./ICredentials";

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

export interface ICreateEvent {
    title: string;
    description: string;
    altitude: string;
    latitude: string;
    event_type: string;
    date_time: Date;
    creator: string;
}

export interface ICreateEventResult {
    result: boolean;
}

export interface IGetPaginateEvents {
    page: number;
    size: number;
}

export interface IGetPaginateEventsResult {
    result: boolean;
    events: IEvent[];
    totalResults: number;
}

export interface ISetEventInactive {
    idEvent: string;
}

export interface ISetEventInactiveResult {
    result: boolean;
}

export interface IDeleteEvent {
    idEvent: string;
}

export interface IDeleteEventResult {
    result: boolean;
}

export interface IGetStatsEventsResult {
    result: boolean;
    stats: IStatsEvents;
}

export interface IStatsEvents {
    totalActiveEvents: number;
    totalInactiveEvents: number;
    statsActiveEventType: {
        totalInundacion: number;
        totalIncendio: number;
        totalAccidenteTransito: number;
    },
    statsInactiveEventType: {
        totalInundacion: number;
        totalIncendio: number;
        totalAccidenteTransito: number;
    }
}