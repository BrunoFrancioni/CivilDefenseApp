import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Credentials extends Document {
    @Prop({ type: String, required: true })
    name_lastame: string;

    @Prop({ type: String, required: true, unique: true })
    dni: string;

    @Prop({ type: String, required: true })
    organization: string;

    @Prop({ type: String, required: true, unique: true })
    email: string;

    @Prop({ type: String, required: true })
    password: string;
}

export const CredentialsSchema = SchemaFactory.createForClass(Credentials);