import { ICreateEntity, IEditEntity } from '../interfaces/IEntities';
import API from '../utils/API';

class EntitiesService {
    private path: string = '/entities';

    public async getEntities(page: number = 1, size: number = 10) {
        return await API.get(this.path, {
            params: {
                page: page,
                size: size
            }
        });
    }

    public async createEntity(createEntity: ICreateEntity) {
        return await API.post(this.path, { createEntityDTO: createEntity });
    }

    public async editEntity(id: string, editEntity: IEditEntity) {
        return await API.put(this.path + `/${id}`, { editEntityDTO: editEntity });
    }

    public async deleteEntity(id: string) {
        return await API.delete(this.path + `/${id}`);
    }

    public async getEntity(id: string) {
        return await API.get(this.path + `/${id}`);
    }

    public async getStatsEntities() {
        return await API.get(this.path + '/stats');
    }
}

export default EntitiesService;