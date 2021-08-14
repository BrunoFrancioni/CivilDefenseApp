import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface IEvents extends mongoose.Document {
    title: string;
    description: string;
    coordinates: string[];
    event_type: string;
    creator: any;
    date_time: Date;
    active: boolean;
}

const EventsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    coordinates: {
        type: [String],
        required: true
    },
    event_type: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "credentials"
    },
    date_time: {
        type: Date,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    }
});

export default mongoose.model<IEvents>('events', EventsSchema);