
import { IEntity } from 'interfaces/IEntities';
import EntitiesSchema, { IEntities } from '../models/entitiesModel';

export class EntitiesController {
    private Entities = EntitiesSchema;

    public async getAllEntities(): Promise<IEntity[]> {
        try {
            const result: IEntities[] = await this.Entities.find({}).exec();

            let entities: IEntity[] = new Array<IEntity>();

            if (result) {
                for (let element of result) {
                    let entity: IEntity = {
                        _id: element._id,
                        name: element.name,
                        entityType: element.entityType,
                        legalNumber: element.legalNumber,
                        address: element.address,
                        phone: element.phone,
                        postalCode: element.postalCode,
                        email: element.email,
                        sector: element.sector,
                        risk: element.risk,
                        coordinates: element.coordinates
                    }

                    entities.push(entity);
                }
            }

            return entities;
        } catch (e) {
            throw new Error(e);
        }
    }

    public async getEntity(_id: String): Promise<IEntity> {
        try {
            const result: IEntities = await this.Entities.findOne({ _id: _id }).exec();

            let entity: IEntity;

            if (result) {
                entity = {
                    _id: result._id,
                    name: result.name,
                    entityType: result.entityType,
                    legalNumber: result.legalNumber,
                    address: result.address,
                    phone: result.phone,
                    postalCode: result.postalCode,
                    email: result.email,
                    sector: result.sector,
                    risk: result.risk,
                    coordinates: result.coordinates
                }
            }

            return entity;
        } catch (e) {
            throw new Error(e);
        }
    }
}