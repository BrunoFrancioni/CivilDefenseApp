import { ICredentialLogIn } from '../interfaces/IUsers';
import API from '../utils/API';

class UsersService {
    private path: string = '/credentials';

    public async loginCredential(loginCredential: ICredentialLogIn) {
        return await API.post(this.path + '/login?admin=false', {
            loginCredentialDTO: loginCredential
        });
    }
}

export default UsersService;