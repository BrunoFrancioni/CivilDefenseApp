import { ICreateEvent } from "../interfaces/IEvents";
import API from "../utils/API";

class EventsService {
    private path: string = '/events';

    public async createEvent(createEvent: ICreateEvent) {
        return API.post(this.path, {
            createEvent: createEvent
        });
    }

    public async getActiveEvents() {
        return API.get(this.path);
    }
}

export default EventsService;