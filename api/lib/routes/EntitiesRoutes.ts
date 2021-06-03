import { Request, Response } from "express";
import { ICreateEntityResult, IDeleteEntityResult, IEditEntityResult, IGetEntities, IGetEntitiesStatsResult, IGetEntityResult } from "interfaces/IEntities";

import { EntitiesController } from '../controllers/entitiesController';

import { verify } from '../middleware/auth';

export class EntitiesRoutes {
    private entitiesController: EntitiesController = new EntitiesController();

    public routes(app): void {
        app.route('/entities')
            .get(
                async (req: Request, res: Response) => {
                    try {
                        const params: IGetEntities = {
                            page: Number(req.query.page),
                            size: Number(req.query.size)
                        }

                        const result = await this.entitiesController.getPaginateEntities(params);

                        if (!result.result) {
                            return res.status(500).json({
                                message: 'Server error'
                            });
                        } else {
                            return res.status(200).json({
                                entities: result.entities,
                                totalResults: result.totalResults
                            });
                        }
                    } catch (e) {
                        console.log(e);

                        return res.status(500).json({
                            message: 'Error'
                        });
                    }
                });

        app.route('/entities/stats')
            .get(
                async (req: Request, res: Response) => {
                    try {
                        const result: IGetEntitiesStatsResult = await this.entitiesController
                            .getEntitiesStats();

                        if (result.result) {
                            return res.status(200).json({
                                stats: result.stats
                            });
                        } else {
                            return res.json({
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

        app.route('/entities/:id')
            .get(
                async (req: Request, res: Response) => {
                    try {
                        const result: IGetEntityResult = await this.entitiesController
                            .getEntity(req.params.id);

                        if (result.result) {
                            return res.status(200).json({
                                entity: result.entity
                            });
                        } else {
                            return res.json({
                                message: 'Entity don`t exists'
                            });
                        }
                    } catch (e) {
                        console.log(e);

                        return res.status(500).json({
                            message: 'Error'
                        });
                    }
                });

        app.route('/entities')
            .post(
                async (req: Request, res: Response) => {
                    try {
                        const result: ICreateEntityResult = await this.entitiesController
                            .createEntity(req.body.createEntityDTO);

                        if (result.result) {
                            return res.status(201).json({
                                message: 'Entity created successfuly'
                            });
                        } else {
                            return res.json({
                                message: 'Entity already exists'
                            })
                        }
                    } catch (e) {
                        console.log(e);

                        return res.status(500).json({
                            message: 'Error'
                        });
                    }
                });

        app.route('/entities/:id')
            .put(
                async (req: Request, res: Response) => {
                    try {
                        const result: IEditEntityResult = await this.entitiesController
                            .editEntity(req.params.id, req.body.editEntityDTO);

                        if (result.result) {
                            return res.status(200).json({
                                message: 'Entity updated'
                            });
                        }

                        return res.json({
                            message: 'Entity not exists'
                        });
                    } catch (e) {
                        console.log(e);

                        return res.status(500).json({
                            message: 'Error'
                        });
                    }
                });

        app.route('/entities/:id')
            .delete(
                async (req: Request, res: Response) => {
                    try {
                        const result: IDeleteEntityResult = await this.entitiesController
                            .deleteEntity(req.params.id);

                        if (result.result) {
                            return res.status(201).json({
                                message: 'Entity deleted successfuly'
                            });
                        }

                        return res.json({
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