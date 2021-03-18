import { Request, Response } from "express";
import { ICreateCredentialsResult, ILoginResult } from "interfaces/ICredentials";

import { CredentialsController } from '../controllers/credentialsController';

export class CredentialsRoutes {
    private credentialsController: CredentialsController = new CredentialsController();

    public routes(app): void {
        app.route('/credentials/signup')
            .post(async (req: Request, res: Response) => {
                try {
                    const result: ICreateCredentialsResult = await this.credentialsController.createCredential(req.body.createCredentialDTO);

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
                        return res.status(401).json({
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
    }
}