import { Request, Response } from "express";

import { EntitiesController } from '../controllers/entitiesController';

import { verify } from '../middleware/auth';

export class EntitiesRoutes {
    private entitiesController: EntitiesController = new EntitiesController();

    public routes(app): void {
        app.route('/entities')
            .get(verify,
                async (req: Request, res: Response) => {
                    const result = await this.entitiesController.getAllEntities();

                    return res.status(200).json({
                        result
                    });
                })
    }
}