import { Injectable } from '@nestjs/common';
import { Entities } from './entities.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import createEntityDTO from './dto/createEntityDTO';
import PersistenceException from '../exceptions/PersistenceException';
import entitiesDTO from './dto/entitiesDTO';

@Injectable()
export class EntitiesService {
    constructor(@InjectModel('Entities') private readonly entityModel: Model<Entities>) { }

    async findAll(): Promise<entitiesDTO[]> {
        try {
            const result = await this.entityModel.find();

            const entities: entitiesDTO[] = new Array<entitiesDTO>();

            for (let i = 0; i < result.length; i++) {
                const { _id, name, entityType, legalNumber, address, phone, postalCode, email, sector, risk, coordinates } = result[i];

                entities.push(new entitiesDTO(_id, name, entityType, legalNumber, address, phone, postalCode, email, sector, risk, coordinates));
            }

            return entities;
        } catch (e) {
            console.log(e);
            throw new PersistenceException(e);
        }
    }

    async findById(idEntity: string): Promise<entitiesDTO> {
        try {
            const result = await idEntity.match(/^[0-9a-fA-F]{24}$/)
                ? await this.entityModel.findOne({ _id: idEntity })
                : null;

            if (result === null) {
                return null;
            }

            const { _id, name, entityType, legalNumber, address, phone, postalCode, email, sector, risk, coordinates } = result;

            return new entitiesDTO(_id, name, entityType, legalNumber, address, phone, postalCode, email, sector, risk, coordinates);
        } catch (e) {
            console.log(e);
            throw new PersistenceException(e);
        }
    }

    async createEntity(entity: createEntityDTO): Promise<entitiesDTO> {
        try {
            const result = await new this.entityModel(entity).save();

            if (!result) {
                return null;
            }

            const { _id, name, entityType, legalNumber, address, phone, postalCode, email, sector, risk, coordinates } = result;

            return new entitiesDTO(_id, name, entityType, legalNumber, address, phone, postalCode, email, sector, risk, coordinates);
        } catch (e) {
            console.log(e);
            throw new PersistenceException(e);
        }
    }

    async updateEntity(idEntity: string, entity: createEntityDTO): Promise<entitiesDTO> {
        try {
            const result = await this.entityModel.findOneAndUpdate({ _id: idEntity }, entity, { new: true });

            if (!result) {
                return null;
            }

            const { _id, name, entityType, legalNumber, address, phone, postalCode, email, sector, risk, coordinates } = result;

            return new entitiesDTO(_id, name, entityType, legalNumber, address, phone, postalCode, email, sector, risk, coordinates);
        } catch (e) {
            console.log(e);
            throw new PersistenceException(e);
        }
    }

    async deleteEntity(idEntity: string): Promise<entitiesDTO> {
        try {
            const result = await this.entityModel.findOneAndDelete({ _id: idEntity });

            if (!result) {
                return null;
            }

            const { _id, name, entityType, legalNumber, address, phone, postalCode, email, sector, risk, coordinates } = result;

            return new entitiesDTO(_id, name, entityType, legalNumber, address, phone, postalCode, email, sector, risk, coordinates);
        } catch (e) {
            console.log(e);
            throw new PersistenceException(e);
        }
    }
}
