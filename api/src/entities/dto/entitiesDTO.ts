export default class entitiesDTO {
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
    coordiantes: string[];

    constructor(_id: string, name: string, entityType: string, legalNumber: string, address: string, phone: string, postalCode: string, email: string, sector: string, risk: string[], coordinates: string[]) {
        this._id = _id;
        this.name = name;
        this.entityType = entityType;
        this.legalNumber = legalNumber;
        this.address = address;
        this.phone = phone;
        this.postalCode = postalCode;
        this.email = email;
        this.sector = sector;
        this.risk = risk;
        this.coordiantes = coordinates;
    }
}