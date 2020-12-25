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

    async createEntity(entity: createEntityDTO): Promise<boolean> {
        const newEntity: Entities = new Entities();
        newEntity.name = entity.name;
        newEntity.entityType = entity.entityType;
        newEntity.legalNumber = entity.legalNumber;
        newEntity.address = entity.address;
        newEntity.phone = entity.phone;
        newEntity.postalCode = entity.postalCode;
        newEntity.email = entity.email;
        newEntity.sector = entity.sector;
        newEntity.risk = entity.risk;
        newEntity.coordinates = entity.coordinates;
        console.log(newEntity);
        try {
            const result = await this.entityModel.create(newEntity);

            if (result) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            console.log(e);
            throw new PersistenceException(e);
        }
    }

    async updateEntity(idEntity: string, entity: createEntityDTO): Promise<Entities> {
        try {
            const result = await this.entityModel.findOneAndUpdate({ _id: idEntity }, entity);

            return result;
        } catch (e) {
            console.log(e);
            throw new PersistenceException(e);
        }
    }

    async deleteEntity(idEntity: string): Promise<boolean> {
        try {
            const result = await this.entityModel.findOneAndDelete({ _id: idEntity });

            if (!result) {
                return false;
            }

            return true;
        } catch (e) {
            console.log(e);
            throw new PersistenceException(e);
        }
    }
}
