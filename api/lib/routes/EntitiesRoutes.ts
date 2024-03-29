import { Request, Response } from "express";
import { ICreateEntityResult, IDeleteEntityResult, IEditEntityResult, IGetEntities, IGetEntitiesResult, IGetEntitiesStatsResult, IGetEntityResult } from "interfaces/IEntities";

import { EntitiesController } from '../controllers/entitiesController';

import { verify } from '../middleware/auth';

export class EntitiesRoutes {
    private entitiesController: EntitiesController = new EntitiesController();

    public routes(app): void {
        app.route('/entities/all')
            .get(async (req: Request, res: Response) => {
                try {
                    let result: IGetEntitiesResult = await this.entitiesController.getAllEntities();

                    return res.status(200).json({
                        entities: result.entities,
                        totalResults: result.totalResults
                    });
                } catch (e) {
                    console.log(e);

                    return res.status(500).json({
                        message: 'Error'
                    });
                }
            });

        app.route('/entities')
            .get(verify,
                async (req: Request, res: Response) => {
                    try {
                        const params: IGetEntities = {
                            page: Number(req.query.page),
                            size: Number(req.query.size)
                        }

                        let result: IGetEntitiesResult = await this.entitiesController
                            .getPaginateEntities(params);

                        return res.status(200).json({
                            entities: result.entities,
                            totalResults: result.totalResults
                        });
                    } catch (e) {
                        console.log(e);

                        return res.status(500).json({
                            message: 'Error'
                        });
                    }
                });

        app.route('/entities/stats')
            .get(verify,
                async (req: Request, res: Response) => {
                    try {
                        const result: IGetEntitiesStatsResult = await this.entitiesController
                            .getEntitiesStats();

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

        app.route('/entities/:id')
            .get(verify,
                async (req: Request, res: Response) => {
                    try {
                        const result: IGetEntityResult = await this.entitiesController
                            .getEntity(req.params.id);

                        if (result.result) {
                            return res.status(200).json({
                                entity: result.entity
                            });
                        } else {
                            return res.status(400).json({
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
            .post(verify,
                async (req: Request, res: Response) => {
                    try {
                        const result: ICreateEntityResult = await this.entitiesController
                            .createEntity(req.body.createEntityDTO);

                        if (result.result) {
                            return res.status(201).json({
                                message: 'Entity created successfuly'
                            });
                        } else {
                            return res.status(400).json({
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
            .put(verify,
                async (req: Request, res: Response) => {
                    try {
                        const result: IEditEntityResult = await this.entitiesController
                            .editEntity(req.params.id, req.body.editEntityDTO);

                        if (result.result) {
                            return res.status(200).json({
                                message: 'Entity updated'
                            });
                        }

                        return res.status(400).json({
                            message: 'Entity don`t exists'
                        });
                    } catch (e) {
                        console.log(e);

                        return res.status(500).json({
                            message: 'Error'
                        });
                    }
                });

        app.route('/entities/:id')
            .delete(verify,
                async (req: Request, res: Response) => {
                    try {
                        const result: IDeleteEntityResult = await this.entitiesController
                            .deleteEntity(req.params.id);

                        if (result.result) {
                            return res.status(201).json({
                                message: 'Entity deleted successfuly'
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