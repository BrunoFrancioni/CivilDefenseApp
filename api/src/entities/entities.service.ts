import { Injectable } from '@nestjs/common';
import { Entities } from './entities.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class EntitiesService {
    constructor(@InjectModel('Entities') private readonly entityModel: Model<Entities>) { }

    async findAll(): Promise<Entities[]> {
        const result = await this.entityModel.find().exec();

        return result;
    }

    async findById(id: string): Promise<Entities> {
        return id.match(/^[0-9a-fA-F]{24}$/)
            ? await this.entityModel.findOne({ _id: id })
            : null;
    }
}
