import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Entities extends Document {
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, required: true })
    entityType: string;

    @Prop({ type: String, required: true, unique: true })
    legalNumber: string;

    @Prop({ type: String, required: true })
    address: string;

    @Prop({ type: String, required: true })
    phone: string;

    @Prop({ type: String, required: true })
    postalCode: string;

    @Prop({ type: String, required: true, unique: true })
    email: string;

    @Prop({ type: String, required: true })
    sector: string;

    @Prop({ type: [String], required: true })
    risk: Array<string>;

    @Prop({ type: [Number], required: true })
    coordinates: Array<number>;
}

export const EntitiesSchema = SchemaFactory.createForClass(Entities);