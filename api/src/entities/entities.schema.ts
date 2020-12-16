import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Entity extends Document {
    @Prop({ type: String, required: true })
    entityType: string;

    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, required: true })
    address: string;

    @Prop({ type: String, required: true })
    phone: string;

    @Prop({ type: String, required: true })
    email: string;

    @Prop({ type: String, required: true })
    field: string;

    @Prop({ type: String, required: true })
    risk: string;

    @Prop({ type: Object, required: true })
    coordinates: Record<string, number>;
}

export const EntitySchema = SchemaFactory.createForClass(Entity);