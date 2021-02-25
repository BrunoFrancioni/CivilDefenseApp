import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const EntitiesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    entityType: {
        type: String,
        required: true
    },
    legalNumber: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    sector: {
        type: String,
        required: true
    },
    risk: {
        type: [String],
        required: true
    },
    coordinates: {
        type: [String],
        required: true
    }
});