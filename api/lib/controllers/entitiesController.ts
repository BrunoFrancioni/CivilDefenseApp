
import { ICreateEntity, ICreateEntityResult, IDeleteEntityResult, IEditEntity, IEditEntityResult, IEntity, IGetEntities, IGetEntitiesResult, IGetEntitiesStatsResult, IGetEntityResult } from 'interfaces/IEntities';
import EntitiesSchema, { IEntities } from '../models/entitiesModel';

export class EntitiesController {
    private Entities = EntitiesSchema;

    public async getAllEntities(): Promise<IGetEntitiesResult> {
        try {
            const totalResult = await this.Entities.find().countDocuments().exec();

            let result: IGetEntitiesResult;

            if (totalResult != 0) {
                const entities: IEntities[] = await this.Entities.find({}).exec();

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

    public async getEntitiesStats(): Promise<IGetEntitiesStatsResult> {
        try {
            let result: IGetEntitiesStatsResult;

            const totalResult = await this.Entities.find().countDocuments().exec();

            if (totalResult === 0) {
                result = {
                    result: true,
                    stats: {
                        totalEntities: totalResult,
                        statsEntityType: null,
                        statsSector: null,
                        statsRisk: null
                    }
                }

                return result;
            }

            const totalEducacion: number = await this.Entities.find({ entityType: { $eq: 'inundación' } })
                .countDocuments().exec();

            const totalCentroSalud: number = await this.Entities.find({ entityType: { $eq: 'centro salud' } })
                .countDocuments().exec();

            const totalDepositoCombustible: number = await this.Entities.find({ entityType: { $eq: 'depósito combustible' } })
                .countDocuments().exec();

            const totalOrganismoPublico: number = await this.Entities.find({ entityType: { $eq: 'organismo público' } })
                .countDocuments().exec();

            const totalLugarEventoMasivo: number = await this.Entities.find({ entityType: { $eq: 'lugar evento masivo' } })
                .countDocuments().exec();

            const totalClub: number = await this.Entities.find({ entityType: { $eq: 'club' } })
                .countDocuments().exec();

            const totalHogarAcogida: number = await this.Entities.find({ entityType: { $eq: 'hogar acogida' } })
                .countDocuments().exec();

            const totalSectorPrivada: number = await this.Entities.find({ sector: { $eq: 'Privada' } })
                .countDocuments().exec();

            const totalSectorPublico: number = await this.Entities.find({ sector: { $eq: 'Publico' } })
                .countDocuments().exec();

            const totalSectorEstatal: number = await this.Entities.find({ sector: { $eq: 'Estatal' } })
                .countDocuments().exec();

            const totalRiskIncendio: number = await this.Entities.find({ risk: { $eq: 'incendio' } }).countDocuments();

            const totalRiskInundacion: number = await this.Entities.find({ risk: { $eq: 'inundación' } }).countDocuments();

            const totalRiskAccidente: number = await this.Entities.find({ risk: { $eq: 'accidente' } }).countDocuments();

            const totalRiskAmenazaClimatica: number = await this.Entities.find({ risk: { $eq: 'amenaza climática' } }).countDocuments();

            result = {
                result: true,
                stats: {
                    totalEntities: totalResult,
                    statsEntityType: {
                        totalEducacion: totalEducacion,
                        totalCentroSalud: totalCentroSalud,
                        totalDepositoCombustible: totalDepositoCombustible,
                        totalOrganismoPublico: totalOrganismoPublico,
                        totalLugarEventoMasivo: totalLugarEventoMasivo,
                        totalClub: totalClub,
                        totalHogarAcogida: totalHogarAcogida
                    },
                    statsSector: {
                        totalPrivada: totalSectorPrivada,
                        totalPublico: totalSectorPublico,
                        totalEstatal: totalSectorEstatal
                    },
                    statsRisk: {
                        totalIncendio: totalRiskIncendio,
                        totalInundacion: totalRiskInundacion,
                        totalAccidente: totalRiskAccidente,
                        totalAmenazaClimatica: totalRiskAmenazaClimatica
                    }
                }
            }

            return result;
        } catch (e) {
            throw new Error(e);
        }
    }
}