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