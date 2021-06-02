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