import { Request, Response } from "express";
import EventsController from "../controllers/eventsController";
import { verify } from "../middleware/auth";
import {
    ICreateEventResult,
    IDeleteEvent,
    IDeleteEventResult,
    IGetPaginateEvents,
    IGetPaginateEventsResult,
    IGetStatsEventsResult,
    ISetEventInactive,
    ISetEventInactiveResult
} from "interfaces/IEvents";

export class EventsRoutes {
    private eventsController: EventsController = new EventsController();

    public routes(app): void {
        app.route('/events')
            .post(verify,
                async (req: Request, res: Response) => {
                    try {
                        const result: ICreateEventResult = await this.eventsController
                            .createEvent(req.body.createEvent);

                        if (result.result) {
                            return res.status(201).json({
                                message: 'Event created succesfully'
                            });
                        } else {
                            return res.status(500).json({
                                message: 'Error'
                            });
                        }
                    } catch (e) {
                        console.log(e);

                        return res.status(500).json({
                            message: 'Error'
                        });
                    }
                });

        app.route('/events')
            .get(async (req: Request, res: Response) => {
                try {
                    const result: IGetPaginateEventsResult = await this.eventsController
                        .getAllActiveEvents();

                    return res.status(200).json({
                        events: result.events,
                        totalResults: result.totalResults
                    });
                } catch (e) {
                    console.log(e);

                    return res.status(500).json({
                        message: 'Error'
                    });
                }
            });

        app.route('/events/stats')
            .get(verify,
                async (req: Request, res: Response) => {
                    try {
                        const result: IGetStatsEventsResult = await this.eventsController
                            .getEventsStats();

                        return res.status(200).json({
                            stats: result.stats
                        });
                    } catch (e) {
                        console.log(e);

                        return res.status(500).json({
                            message: 'Error'
                        });
                    }
                });

        app.route('/events/active')
            .get(verify,
                async (req: Request, res: Response) => {
                    try {
                        const params: IGetPaginateEvents = {
                            page: Number(req.query.page),
                            size: Number(req.query.size)
                        }

                        const result: IGetPaginateEventsResult = await this.eventsController
                            .getActivePaginateEvents(params);

                        return res.status(200).json({
                            events: result.events,
                            totalResults: result.totalResults
                        });
                    } catch (e) {
                        console.log(e);

                        return res.status(500).json({
                            message: 'Error'
                        });
                    }
                });

        app.route('/events/inactive')
            .get(verify,
                async (req: Request, res: Response) => {
                    try {
                        const params: IGetPaginateEvents = {
                            page: Number(req.query.page),
                            size: Number(req.query.size)
                        }

                        const result: IGetPaginateEventsResult = await this.eventsController
                            .getInactivePaginateEvents(params);

                        return res.status(200).json({
                            events: result.events,
                            totalResults: result.totalResults
                        });
                    } catch (e) {
                        console.log(e);

                        return res.status(500).json({
                            message: 'Error'
                        });
                    }
                });

        app.route('/events/:id')
            .put(verify,
                async (req: Request, res: Response) => {
                    try {
                        const params: ISetEventInactive = {
                            idEvent: req.params.id
                        }

                        const result: ISetEventInactiveResult = await this.eventsController
                            .setEventInactive(params);

                        if (result.result) {
                            return res.status(200).json({
                                message: 'Event updated'
                            });;
                        } else {
                            return res.status(400).json({
                                message: 'Event don`t exists'
                            });;
                        }
                    } catch (e) {
                        console.log(e);

                        return res.status(500).json({
                            message: 'Error'
                        });
                    }
                });

        app.route('/events/:id')
            .delete(verify,
                async (req: Request, res: Response) => {
                    try {
                        const params: IDeleteEvent = {
                            idEvent: req.params.id
                        }

                        const result: IDeleteEventResult = await this.eventsController
                            .deleteEvent(params);

                        if (result.result) {
                            return res.status(201).json({
                                message: 'Event deleted successfuly'
                            });
                        }

                        return res.status(400).json({
                            message: 'Bad request'
                        });
                    } catch (e) {
                        console.log(e);

                        return res.status(500).json({
                            message: 'Error'
                        });
                    }
                });
    }
}