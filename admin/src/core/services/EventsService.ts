import API from "../utils/API";

class EventsService {
    private path: string = '/events';

    public async getPaginateActiveEvents(page: number = 1, size: number = 10) {
        return await API.get(this.path + '/active', {
            params: {
                page: page,
                size: size
            }
        });
    }

    public async getPaginateInactiveEvents(page: number = 1, size: number = 10) {
        return await API.get(this.path + '/inactive', {
            params: {
                page: page,
                size: size
            }
        });
    }

    public async setEventInactive(id: string) {
        return await API.put(this.path + `/${id}`);
    }

    public async deleteEvent(id: string) {
        return await API.delete(this.path + `/${id}`);
    }

    public async getEventsStats() {
        return await API.get(this.path + '/stats');
    }
}

export default EventsService;