export interface IEntity {
    _id: string;
    name: string;
    entityType: string;
    legalNumber: string;
    address: string;
    phone: string;
    postalCode: string;
    email: string;
    sector: string;
    risk: string[];
    coordinates: string[];
}

export interface IGetEntities {
    page: number;
    size: number;
}

export interface IGetEntitiesResult {
    result: boolean;
    entities: IEntity[];
    totalResults: number;
}

export interface ICreateEntity {
    name: string;
    entityType: string;
    legalNumber: string;
    address: string;
    phone: string;
    postalCode: string;
    email: string;
    sector: string;
    risk: string[];
    coordinates: string[];
}

export interface ICreateEntityResult {
    result: boolean;
}

export interface IEditEntity {
    name: string;
    entityType: string;
    address: string;
    phone: string;
    postalCode: string;
    sector: string;
    risk: string[];
    coordinates: string[];
}

export interface IEditEntityResult {
    result: boolean;
}

export interface IDeleteEntityResult {
    result: boolean;
}

export interface IGetEntityResult {
    result: boolean;
    entity: IEntity;
}

export interface IGetEntitiesStatsResult {
    result: boolean;
    stats: IStatsEntities;
}

export interface IStatsEntities {
    totalEntities: number;
    statsEntityType: {
        totalEducacion: number;
        totalCentroSalud: number;
        totalDepositoCombustible: number;
        totalOrganismoPublico: number;
        totalLugarEventoMasivo: number;
        totalClub: number;
        totalHogarAcogida: number;
    },
    statsSector: {
        totalPrivado: number;
        totalPublico: number;
        totalEstatal: number;
    },
    statsRisk: {
        totalIncendio: number;
        totalInundacion: number;
        totalAccidente: number;
        totalAmenazaClimatica: number;
    }
}