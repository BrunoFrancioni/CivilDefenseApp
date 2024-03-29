import { ICreateCredentials, IEditCredential, IGetNewPassword, ILoginCredential } from '../interfaces/IUsers';
import API from '../utils/API';

class UsersService {
    private path: string = '/credentials';

    public async createCredentials(createCredentialsDTO: ICreateCredentials) {
        return await API.post(this.path + '/signup', { createCredentialsDTO: createCredentialsDTO });
    }

    public async loginCredential(loginCredential: ILoginCredential) {
        return await API.post(this.path + '/login?admin=true', {
            loginCredentialDTO: loginCredential
        });
    }

    public async getCredentials(page: number = 1, size: number = 10) {
        return await API.get(this.path, {
            params: {
                page: page,
                size: size
            }
        });
    }

    public async getCredentialById(id: string) {
        return await API.get(this.path + `/get/${id}`);
    }

    public async generateNewPassword(consult: IGetNewPassword) {
        return await API.post(this.path + '/password', { generateNewPassword: consult });
    }

    public async editCredentials(id: string, editCredentialDTO: IEditCredential) {
        return await API.put(this.path + `/${id}`, { editCredentialDTO });
    }

    public async deleteCredential(id: string) {
        return await API.delete(this.path + `/${id}`);
    }

    public async getStatsCredentials() {
        return await API.get(this.path + '/stats');
    }
}

export default UsersService;