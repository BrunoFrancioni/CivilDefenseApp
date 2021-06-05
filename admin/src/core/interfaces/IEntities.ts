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
        totalPrivada: number;
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