
import { ICreateEntity, ICreateEntityResult, IDeleteEntityResult, IEditEntity, IEditEntityResult, IEntity, IGetEntities, IGetEntitiesResult, IGetEntityResult } from 'interfaces/IEntities';
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

    public async getPaginateEntities(getEntities: IGetEntities): Promise<IGetEntitiesResult> {
        try {
            const { page, size } = getEntities;

            const totalResult = await this.Entities.find().countDocuments().exec();

            let result: IGetEntitiesResult;

            if (totalResult != 0) {
                const entities: IEntities[] = await this.Entities.find().limit(size).skip((page - 1) * size).exec();

                const entitiesDTO: IEntity[] = [];

                entities.forEach(ent => {
                    const entity: IEntity = {
                        _id: ent._id,
                        name: ent.name,
                        entityType: ent.entityType,
                        legalNumber: ent.legalNumber,
                        address: ent.address,
                        phone: ent.phone,
                        postalCode: ent.postalCode,
                        email: ent.email,
                        sector: ent.sector,
                        risk: ent.risk,
                        coordinates: ent.coordinates
                    }

                    entitiesDTO.push(entity);
                });

                result = {
                    result: true,
                    entities: entitiesDTO,
                    totalResults: totalResult
                }
            } else {
                result = {
                    result: true,
                    entities: null,
                    totalResults: totalResult
                }
            }

            return result;
        } catch (e) {
            throw new Error(e);
        }
    }

    public async getEntity(_id: String): Promise<IGetEntityResult> {
        try {
            let result: IGetEntityResult;

            const getEntity: IEntities = await this.Entities.findOne({ _id: _id }).exec();

            let entity: IEntity;

            if (getEntity) {
                entity = {
                    _id: getEntity._id,
                    name: getEntity.name,
                    entityType: getEntity.entityType,
                    legalNumber: getEntity.legalNumber,
                    address: getEntity.address,
                    phone: getEntity.phone,
                    postalCode: getEntity.postalCode,
                    email: getEntity.email,
                    sector: getEntity.sector,
                    risk: getEntity.risk,
                    coordinates: getEntity.coordinates
                }

                result = {
                    result: true,
                    entity: entity
                }
            } else {
                result = {
                    result: false,
                    entity: null
                }
            }

            return result;
        } catch (e) {
            throw new Error(e);
        }
    }

    public async createEntity(createEntityDTO: ICreateEntity): Promise<ICreateEntityResult> {
        try {
            const entity = await this.Entities.findOne({ email: createEntityDTO.email }).exec();

            let result: ICreateEntityResult;

            if (entity) {
                result = {
                    result: false
                }

                return result;
            }

            const newEntity = await new this.Entities({
                name: createEntityDTO.name,
                entityType: createEntityDTO.entityType,
                legalNumber: createEntityDTO.legalNumber,
                address: createEntityDTO.address,
                phone: createEntityDTO.phone,
                postalCode: createEntityDTO.postalCode,
                email: createEntityDTO.email,
                sector: createEntityDTO.sector,
                risk: createEntityDTO.risk,
                coordinates: createEntityDTO.coordinates
            }).save();

            if (newEntity == null) {
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

    public async editEntity(id: string, editEntityDTO: IEditEntity): Promise<IEditEntityResult> {
        try {
            let result: IEditEntityResult;

            const entity = await this.Entities.findOne({ _id: id }).exec();

            if (!entity) {
                result = {
                    result: false
                }

                return result;
            }

            entity.name = editEntityDTO.name;
            entity.entityType = editEntityDTO.entityType;
            entity.address = editEntityDTO.address;
            entity.phone = editEntityDTO.phone;
            entity.postalCode = editEntityDTO.postalCode;
            entity.sector = editEntityDTO.sector;
            entity.risk = entity.risk;
            entity.coordinates = entity.coordinates;

            const ent = await entity.save();

            if (ent === null) {
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

    public async deleteEntity(id: string): Promise<IDeleteEntityResult> {
        try {
            let result: IDeleteEntityResult;

            const deleted = await this.Entities.deleteOne({ _id: id }).exec();

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
}