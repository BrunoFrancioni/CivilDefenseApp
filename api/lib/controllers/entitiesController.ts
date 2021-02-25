import * as mongoose from 'mongoose';
import { Request, Response } from 'express';

import { EntitiesSchema } from '../models/entitiesModel';

export class EntitiesController {
    private Entities = mongoose.model('entities', EntitiesSchema);

    public async getAllEntities() {
        return await this.Entities.find({}).exec();
    }
}