import { Request, Response } from "express";
import { IChangePassword, IChangePasswordResult, ICreateCredentialsResult, IDeleteCredentialResult, IEditCredentialResult, IGetCredentialByIdResult, IGetCredentials, IGetCredentialsResult, IGetCredentialsStatsResult, IGetNewPasswordResult, ILoginResult } from "interfaces/ICredentials";
import { verify } from '../middleware/auth';

import { CredentialsController } from '../controllers/credentialsController';

export class CredentialsRoutes {
    private credentialsController: CredentialsController = new CredentialsController();

    public routes(app): void {
        app.route('/credentials/signup')
            .post(verify,
                async (req: Request, res: Response) => {
                    try {
                        const result: ICreateCredentialsResult = await this.credentialsController
                            .createCredential(req.body.createCredentialsDTO);

                        if (result.result) {
                            return res.status(201).json({
                                message: 'User Created Successfully',
                                password: result.pass
                            });
                        } else {
                            return res.status(400).json({
                                message: 'User already exists'
                            });
                        }
                    } catch (e) {
                        console.log(e);

                        return res.status(500).json({
                            message: 'Error'
                        });
                    }
                });

        app.route('/credentials/login?:admin')
            .post(async (req: Request, res: Response) => {
                try {
                    let result: ILoginResult | string = null;

                    if (req.query.admin == 'true') {
                        result = await this.credentialsController.loginAdmin(req.body.loginCredentialDTO);
                    } else {
                        result = await this.credentialsController.login(req.body.loginCredentialDTO);
                    }

                    if (typeof (result) == 'string') {
                        return res.status(401).json({
                            message: result
                        });
                    }

                    if (!result.result) {
                        return res.status(400).json({
                            message: 'Email or password incorrect.'
                        });
                    } else {
                        return res.status(200).json({
                            token: result.token,
                            user: result.user
                        });
                    }
                } catch (e) {
                    console.log(e);

                    return res.status(500).json({
                        message: 'Error'
                    });
                }
            });

        app.route('/credentials')
            .get(verify,
                async (req: Request, res: Response) => {
                    try {
                        const params: IGetCredentials = {
                            page: Number(req.query.page),
                            size: Number(req.query.size)
                        }

                        let result: IGetCredentialsResult = await this.credentialsController.getCredentials(params);

                        return res.status(200).json({
                            credentials: result.credentials,
                            totalResults: result.totalResults
                        });
                    } catch (e) {
                        console.log(e);

                        return res.status(500).json({
                            message: 'Error'
                        });
                    }
                });

        app.route('/credentials/get/:id')
            .get(verify,
                async (req: Request, res: Response) => {
                    try {
                        const result: IGetCredentialByIdResult = await this.credentialsController
                            .getCredentialById(req.params.id);

                        if (result.result) {
                            return res.status(200).json({
                                credential: result.credential
                            });
                        } else {
                            return res.status(400).json({
                                message: 'User don`t exists'
                            });
                        }
                    } catch (e) {
                        console.log(e);

                        return res.status(500).json({
                            message: 'Error'
                        });
                    }
                });

        app.route('/credentials/password')
            .post(verify,
                async (req: Request, res: Response) => {
                    try {
                        const result: IGetNewPasswordResult = await this.credentialsController
                            .generateNewPassword(req.body.generateNewPassword);

                        if (result.result) {
                            return res.status(200).json({
                                password: result.newPassword
                            });
                        }

                        return res.status(400).json({
                            message: 'Bad request'
                        });
                    } catch (e) {
                        console.log(e);

                        return res.status(500).json({
                            message: 'Error'
                        });
                    }
                });
        app.route('/credentials/:id/password')
            .put(verify,
                async(req: Request, res: Response) => {
                    const changePasswordDTO: IChangePassword = {
                        id: req.params.id,
                        oldPassword: req.body.changePasswordDTO.oldPassword,
                        newPassword: req.body.changePasswordDTO.newPassword
                    }
                    
                    try {
                        const result: IChangePasswordResult = await this.credentialsController
                            .changePassword(changePasswordDTO);

                        console.log("result", result);

                        if(result.result) {
                            return res.status(200).json({
                                message: 'Password changed'
                            });
                        }

                        return res.status(400).json({
                            message: result.message
                        });
                    } catch (e) {
                        console.log(e);

                        return res.status(500).json({
                            message: 'Error'
                        });
                    }
                });

        app.route('/credentials/:id')
            .put(verify,
                async (req: Request, res: Response) => {
                    try {
                        const result: IEditCredentialResult = await this.credentialsController
                            .editCredentials(req.params.id, req.body.editCredentialDTO);

                        if (result.result) {
                            return res.status(200).json({
                                message: 'User updated'
                            });
                        }

                        return res.status(400).json({
                            message: 'User not exists'
                        });
                    } catch (e) {
                        console.log(e);

                        return res.status(500).json({
                            message: 'Error'
                        });
                    }
                });

        app.route('/credentials/:id')
            .delete(verify,
                async (req: Request, res: Response) => {
                    try {
                        const result: IDeleteCredentialResult = await this.credentialsController
                            .deleteCredential(req.params.id);

                        if (result.result) {
                            return res.status(201).json({
                                message: 'User deleted successfuly'
                            });
                        }

                        return res.status(400).json({
                            message: 'Bad request'
                        });
                    } catch (e) {
                        console.log(e);

                        return res.status(500).json({
                            message: 'Error'
                        });
                    }
                });

        app.route('/credentials/stats')
            .get(verify,
                async (req: Request, res: Response) => {
                    try {
                        const result: IGetCredentialsStatsResult = await this.credentialsController
                            .getCredentialsStats();

                        if (result.result) {
                            return res.status(200).json({
                                stats: result.stats
                            });
                        } else {
                            return res.status(400).json({
                                message: 'Error'
                            });
                        }
                    } catch (e) {
                        console.log(e);

                        return res.status(500).json({
                            message: 'Error'
                        });
                    }
                });
    }
}