import API from "../utils/API";

class EntitiesService {
    private path: string = '/entities';

    public async getEntities() {
        return await API.get(this.path);
    }


}

export default EntitiesService;