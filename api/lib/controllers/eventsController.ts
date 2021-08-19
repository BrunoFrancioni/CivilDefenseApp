import { ICreateEvent, ICreateEventResult, IDeleteEvent, IDeleteEventResult, IEvent, IGetPaginateEvents, IGetPaginateEventsResult, IGetStatsEventsResult, ISetEventInactive, ISetEventInactiveResult } from 'interfaces/IEvents';
import EventsSchema, { IEvents } from '../models/eventsModel';
import { ICredentials } from '../models/credentialsModel';
import { ICredential } from 'interfaces/ICredentials';

export class EventsController {
    private Events = EventsSchema;

    public async createEvent(createEvent: ICreateEvent): Promise<ICreateEventResult> {
        try {
            let result: ICreateEventResult;

            const event = await new this.Events({
                title: createEvent.title,
                description: createEvent.description,
                coordinates: [createEvent.altitude, createEvent.latitude],
                event_type: createEvent.event_type,
                creator: createEvent.creator,
                date_time: createEvent.date_time,
                active: true
            }).save();

            if (event == null) {
                result = {
                    result: false
                }
            } else {
                result = {
                    result: true
                }
            }

            return result;
        } catch (e) {
            throw new Error(e);
        }
    }

    public async getActivePaginateEvents(getEvents: IGetPaginateEvents): Promise<IGetPaginateEventsResult> {
        try {
            const { page, size } = getEvents;

            const totalResult: number = await this.Events.find({ active: { $eq: true } }).countDocuments().exec();

            let result: IGetPaginateEventsResult;

            if (totalResult != 0) {
                let events: IEvents[] = await this.Events
                    .find({ active: { $eq: true } })
                    .limit(size)
                    .skip((page - 1) * size)
                    .populate("creator")
                    .exec();

                const eventsDTO: IEvent[] = [];

                events.forEach(async (event) => {
                    const credential: ICredentials = event.creator;

                    const credentialResult: ICredential = {
                        _id: credential._id,
                        name_lastname: credential.name_lastname,
                        dni: credential.dni,
                        organization: credential.organization,
                        email: credential.email
                    }

                    const newEvent: IEvent = {
                        _id: event._id,
                        title: event.title,
                        description: event.description,
                        coordinates: event.coordinates,
                        event_type: event.event_type,
                        creator: credentialResult,
                        date_time: event.date_time,
                        active: event.active
                    }

                    eventsDTO.push(newEvent);
                });

                result = {
                    result: true,
                    events: eventsDTO,
                    totalResults: totalResult
                }
            } else {
                result = {
                    result: true,
                    events: null,
                    totalResults: totalResult
                }
            }

            return result;
        } catch (e) {
            throw new Error(e);
        }
    }

    public async getInactivePaginateEvents(getEvents: IGetPaginateEvents): Promise<IGetPaginateEventsResult> {
        try {
            const { page, size } = getEvents;

            const totalResult: number = await this.Events.find({ active: { $eq: false } }).countDocuments().exec();

            let result: IGetPaginateEventsResult;

            if (totalResult != 0) {
                let events: IEvents[] = await this.Events
                    .find({ active: { $eq: false } })
                    .limit(size)
                    .skip((page - 1) * size)
                    .populate("creator")
                    .exec();

                const eventsDTO: IEvent[] = [];

                events.forEach(async (event) => {
                    const credential: ICredentials = event.creator;

                    const credentialResult: ICredential = {
                        _id: credential._id,
                        name_lastname: credential.name_lastname,
                        dni: credential.dni,
                        organization: credential.organization,
                        email: credential.email
                    }

                    const newEvent: IEvent = {
                        _id: event._id,
                        title: event.title,
                        description: event.description,
                        coordinates: event.coordinates,
                        event_type: event.event_type,
                        creator: credentialResult,
                        date_time: event.date_time,
                        active: event.active
                    }

                    eventsDTO.push(newEvent);
                });

                result = {
                    result: true,
                    events: eventsDTO,
                    totalResults: totalResult
                }
            } else {
                result = {
                    result: true,
                    events: null,
                    totalResults: totalResult
                }
            }

            return result;
        } catch (e) {
            throw new Error(e);
        }
    }

    public async getAllActiveEvents(): Promise<IGetPaginateEventsResult> {
        try {
            const totalResult: number = await this.Events.find({ active: { $eq: true } }).countDocuments().exec();

            let result: IGetPaginateEventsResult;

            const eventsDTO: IEvent[] = [];

            if (totalResult != 0) {
                let events: IEvents[] = await this.Events
                    .find({ active: { $eq: true } })
                    .populate("creator")
                    .exec();

                events.forEach(event => {
                    const credential: ICredentials = event.creator;

                    const credentialResult: ICredential = {
                        _id: credential._id,
                        name_lastname: credential.name_lastname,
                        dni: credential.dni,
                        organization: credential.organization,
                        email: credential.email
                    }

                    const newEvent: IEvent = {
                        _id: event._id,
                        title: event.title,
                        description: event.description,
                        coordinates: event.coordinates,
                        event_type: event.event_type,
                        creator: credentialResult,
                        date_time: event.date_time,
                        active: event.active
                    }

                    eventsDTO.push(newEvent);
                });
            }

            result = {
                result: true,
                events: eventsDTO,
                totalResults: totalResult
            }

            return result;
        } catch (e) {
            throw new Error(e);
        }
    }

    public async setEventInactive(setEventInactive: ISetEventInactive): Promise<ISetEventInactiveResult> {
        try {
            const { idEvent } = setEventInactive;

            let result: ISetEventInactiveResult;

            let event: IEvents = await this.Events.findOne({ _id: idEvent }).exec();

            if (!event) {
                result = {
                    result: false
                }

                return result;
            }

            event.active = false;

            const even = await event.save();

            if (even == null) {
                result = {
                    result: false
                }

                return result;
            }

            result = {
                result: true
            }

            return result;
        } catch (e) {
            throw new Error(e);
        }
    }

    public async deleteEvent(deleteEvent: IDeleteEvent): Promise<IDeleteEventResult> {
        try {
            const { idEvent } = deleteEvent;

            let result: IDeleteEventResult;

            const deleted = await this.Events.deleteOne({ _id: idEvent }).exec();

            if (deleted.deletedCount == 0) {
                result = {
                    result: false
                }

                return result;
            }

            result = {
                result: true
            }

            return result;
        } catch (e) {
            throw new Error(e);
        }
    }

    public async getEventsStats(): Promise<IGetStatsEventsResult> {
        try {
            let result: IGetStatsEventsResult;

            const totalResult = await this.Events.find().countDocuments().exec();

            if (totalResult === 0) {
                result = {
                    result: true,
                    stats: {
                        totalActiveEvents: totalResult,
                        totalInactiveEvents: totalResult,
                        statsActiveEventType: null,
                        statsInactiveEventType: null
                    }
                }

                return result;
            }

            const totalActive = await this.Events.find({ active: { $eq: true } }).countDocuments().exec();

            const totalActiveInundacion = await this.Events
                .find({ event_type: { $eq: 'Inundación' }, active: { $eq: true } })
                .countDocuments().exec();

            const totalActiveIncendio = await this.Events
                .find({ event_type: { $eq: 'Incendio' }, active: { $eq: true } })
                .countDocuments().exec();

            const totalActiveAccidente = await this.Events
                .find({ event_type: { $eq: 'Accidente de tránsito' }, active: { $eq: true } })
                .countDocuments().exec();

            const totalInactive = await this.Events.find({ active: { $eq: false } }).countDocuments().exec();

            const totalInactiveInundacion = await this.Events
                .find({ event_type: { $eq: 'Inundación' }, active: { $eq: false } })
                .countDocuments().exec();

            const totalInactiveIncendio = await this.Events
                .find({ event_type: { $eq: 'Incendio' }, active: { $eq: false } })
                .countDocuments().exec();

            const totalInactiveAccidente = await this.Events
                .find({ event_type: { $eq: 'Accidente de tránsito' }, active: { $eq: false } })
                .countDocuments().exec();

            result = {
                result: true,
                stats: {
                    totalActiveEvents: totalActive,
                    totalInactiveEvents: totalInactive,
                    statsActiveEventType: {
                        totalInundacion: totalActiveInundacion,
                        totalIncendio: totalActiveIncendio,
                        totalAccidenteTransito: totalActiveAccidente
                    },
                    statsInactiveEventType: {
                        totalInundacion: totalInactiveInundacion,
                        totalIncendio: totalInactiveIncendio,
                        totalAccidenteTransito: totalInactiveAccidente
                    }
                }
            }

            return result;
        } catch (e) {
            throw new Error(e);
        }
    }
}

export default EventsController;