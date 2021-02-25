import * as bcrypt from 'bcrypt';

import CredentialsSchema, { ICredentials } from '../models/credentialsModel';
import { ICreateCredentials, ICredential, ILoginCredential, ILoginResult } from 'interfaces/ICredentials';
import { Auth } from '../middleware/auth';

export class CredentialsController {
    private Credentials = CredentialsSchema;
    private auth: Auth = new Auth();

    public async createCredential(createCredentialDTO: ICreateCredentials): Promise<boolean> {
        try {
            const user = await this.Credentials.findOne({ email: createCredentialDTO.email }).exec();

            if (user) return false;

            const hash = bcrypt.hashSync(createCredentialDTO.password, 10);

            const result = await new this.Credentials({
                name_lastname: createCredentialDTO.name_lastname,
                dni: createCredentialDTO.dni,
                organization: createCredentialDTO.organization,
                email: createCredentialDTO.email,
                password: hash,
                role: createCredentialDTO.role
            }).save();

            if (result == null) {
                return false;
            }

            return true;
        } catch (e) {
            throw new Error(e);
        }
    }

    public async login(loginCredentialDTO: ILoginCredential): Promise<ILoginResult> {
        try {
            const credential: ICredentials = await this.Credentials.findOne({ email: loginCredentialDTO.email }).exec();

            if (credential == null) {
                const result: ILoginResult = {
                    result: false,
                    token: null,
                    user: null
                }

                return result;
            }

            const resultPassword = bcrypt.compareSync(loginCredentialDTO.password, credential.password);

            if (!resultPassword) {
                const result: ILoginResult = {
                    result: false,
                    token: null,
                    user: null
                }

                return result;
            }

            const user: ICredential = {
                _id: credential._id,
                name_lastname: credential.name_lastname,
                dni: credential.dni,
                organization: credential.organization,
                email: credential.email,
                role: credential.role
            }

            const token = this.auth.sign(user);

            const result: ILoginResult = {
                result: true,
                token: token,
                user: user
            }

            return result;
        } catch (e) {
            throw new Error(e);
        }
    }

    public async loginAdmin(loginCredentialDTO: ILoginCredential): Promise<ILoginResult | string> {
        try {
            const credential: ICredentials = await this.Credentials.findOne({ email: loginCredentialDTO.email }).exec();

            if (credential == null) {
                const result: ILoginResult = {
                    result: false,
                    token: null,
                    user: null
                }

                return result;
            }

            if (credential.role !== 'admin') {
                return 'User is not admin';
            }

            const resultPassword = bcrypt.compareSync(loginCredentialDTO.password, credential.password);

            if (!resultPassword) {
                const result: ILoginResult = {
                    result: false,
                    token: null,
                    user: null
                }

                return result;
            }

            const user: ICredential = {
                _id: credential._id,
                name_lastname: credential.name_lastname,
                dni: credential.dni,
                organization: credential.organization,
                email: credential.email,
                role: credential.role
            }

            const token = this.auth.sign(user);

            const result: ILoginResult = {
                result: true,
                token: token,
                user: user
            }

            return result;
        } catch (e) {
            throw new Error(e);
        }
    }
}