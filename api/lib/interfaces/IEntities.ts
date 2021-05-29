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