import * as bcrypt from 'bcrypt';

import CredentialsSchema, { ICredentials } from '../models/credentialsModel';
import {
    ICreateCredentials,
    ICreateCredentialsResult,
    ICredential,
    IDeleteCredentialResult,
    IEditCredential,
    IEditCredentialResult,
    IGetCredentialByIdResult,
    IGetCredentials,
    IGetCredentialsResult,
    IGetNewPassword,
    IGetNewPasswordResult,
    ILoginCredential,
    ILoginResult
} from 'interfaces/ICredentials';
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
                password: hash
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
                email: credential.email
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

            if (credential.organization !== 'admin') {
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
                email: credential.email
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

    public async getCredentials(getCredentials: IGetCredentials): Promise<IGetCredentialsResult> {
        try {
            const { page, size } = getCredentials;

            const totalResult: number = await this.Credentials.find({ organization: { $ne: 'admin' } })
                .countDocuments().exec();

            let result: IGetCredentialsResult;

            if (totalResult != 0) {
                const credentials: ICredentials[] = await this.Credentials
                    .find({ organization: { $ne: 'admin' } }).limit(size).skip((page - 1) * size).exec();

                const credentialsDTO: ICredential[] = [];

                credentials.forEach(cred => {
                    const credential: ICredential = {
                        _id: cred._id,
                        name_lastname: cred.name_lastname,
                        dni: cred.dni,
                        organization: cred.organization,
                        email: cred.email
                    }

                    credentialsDTO.push(credential);
                });

                result = {
                    result: true,
                    credentials: credentialsDTO,
                    totalResults: totalResult
                }
            } else {
                result = {
                    result: true,
                    credentials: null,
                    totalResults: totalResult
                }
            }

            return result;
        } catch (e) {
            throw new Error(e);
        }
    }

    public async getCredentialById(id: string): Promise<IGetCredentialByIdResult> {
        try {
            let result: IGetCredentialByIdResult;

            const credential = await this.Credentials.findOne({ _id: id }).exec();

            if (!credential) {
                result = {
                    result: false,
                    credential: null
                }

                return result;
            }

            const credentialResult: ICredential = {
                _id: credential._id,
                name_lastname: credential.name_lastname,
                dni: credential.dni,
                organization: credential.organization,
                email: credential.email
            }

            result = {
                result: true,
                credential: credentialResult
            }

            return result;
        } catch (e) {
            throw new Error(e);
        }
    }

    public async generateNewPassword(generateNewPassword: IGetNewPassword): Promise<IGetNewPasswordResult> {
        try {
            let result: IGetNewPasswordResult;

            const admin: ICredentials = await this.Credentials
                .findOne({ _id: generateNewPassword.idAdmin }).exec();

            if (admin.organization !== 'admin') {
                result = {
                    result: false,
                    newPassword: ''
                }

                return result;
            }

            const credential: ICredentials = await this.Credentials
                .findOne({ _id: generateNewPassword.idCredential }).exec();

            if (!credential) {
                result = {
                    result: false,
                    newPassword: ''
                }

                return result;
            }

            const pass = Math.random().toString(36).slice(2);

            const hash = bcrypt.hashSync(pass, 10);

            credential.password = hash;

            const cred = await credential.save();

            if (cred == null) {
                result = {
                    result: false,
                    newPassword: ''
                }

                return result;
            }

            result = {
                result: true,
                newPassword: pass
            }

            return result;
        } catch (e) {
            throw new Error(e);
        }
    }

    public async editCredentials(id: string, editCredentialDTO: IEditCredential): Promise<IEditCredentialResult> {
        try {
            let result: IEditCredentialResult;

            const credential = await this.Credentials.findOne({ _id: id }).exec();

            if (!credential) {
                result = {
                    result: false
                }

                return result;
            }

            credential.dni = editCredentialDTO.dni;
            credential.name_lastname = editCredentialDTO.name_lastname;
            credential.organization = editCredentialDTO.organization;

            const cred = await credential.save();

            if (cred == null) {
                result = {
                    result: false
                }

                return result;
            }

            result = {
                result: true
            }

            return result;
        } catch (e) {
            throw new Error(e);
        }
    }

    public async deleteCredential(id: string): Promise<IDeleteCredentialResult> {
        try {
            let result: IDeleteCredentialResult;

            const deleted = await this.Credentials.deleteOne({ _id: id }).exec();

            if (deleted.deletedCount == 0) {
                result = {
                    result: false
                }

                return result;
            }

            result = {
                result: true
            }

            return result;
        } catch (e) {
            throw new Error(e);
        }
    }
}