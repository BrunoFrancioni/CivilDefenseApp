import * as bcrypt from 'bcrypt';

import CredentialsSchema, { ICredentials } from '../models/credentialsModel';
import { ICreateCredentials, ICreateCredentialsResult, ICredential, ILoginCredential, ILoginResult } from 'interfaces/ICredentials';
import { sign } from '../middleware/auth';

export class CredentialsController {
    private Credentials = CredentialsSchema;

    public async createCredential(createCredentialDTO: ICreateCredentials): Promise<ICreateCredentialsResult> {
        try {
            const user = await this.Credentials.findOne({ email: createCredentialDTO.email }).exec();

            if (user) {
                const result: ICreateCredentialsResult = {
                    result: false,
                    pass: null
                }

                return result;
            };

            const pass = Math.random().toString(36).slice(2);

            const hash = bcrypt.hashSync(pass, 10);

            const credential = await new this.Credentials({
                name_lastname: createCredentialDTO.name_lastname,
                dni: createCredentialDTO.dni,
                organization: createCredentialDTO.organization,
                email: createCredentialDTO.email,
                password: hash,
                role: createCredentialDTO.role
            }).save();

            if (credential == null) {
                const result: ICreateCredentialsResult = {
                    result: false,
                    pass: null
                }

                return result;
            }

            const result: ICreateCredentialsResult = {
                result: true,
                pass: pass
            }

            return result;
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

            const token = sign(user);

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

            const token = sign(user);

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