import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface ICredentials extends mongoose.Document {
    name_lastname: string,
    dni: string,
    organization: string,
    email: string,
    password: string
}

const CredentialsSchema = new Schema({
    name_lastname: {
        type: String,
        required: true
    },
    dni: {
        type: String,
        required: true
    },
    organization: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

export default mongoose.model<ICredentials>('credentials', CredentialsSchema)