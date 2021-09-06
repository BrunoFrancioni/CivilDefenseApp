import { IChangePassword, ICredentialLogIn } from '../interfaces/IUsers';
import API from '../utils/API';

class UsersService {
    private path: string = '/credentials';

    public async loginCredential(loginCredential: ICredentialLogIn) {
        return await API.post(this.path + '/login?admin=false', {
            loginCredentialDTO: loginCredential
        });
    }

    public async changePassword(id: string, changePasswordDTO: IChangePassword) {
        return await API.put(this.path + '/' + id + '/password', {
            changePasswordDTO: {
                oldPassword: changePasswordDTO.oldPassword,
                newPassword: changePasswordDTO.newPassword
            }
        });
    }
}

export default UsersService;