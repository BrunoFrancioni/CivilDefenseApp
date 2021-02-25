import { Request, Response, NextFunction } from 'express';
import { ICredential } from 'interfaces/ICredentials';
import * as jwt from 'jsonwebtoken';
import { ICredentials } from 'models/credentialsModel';

export class Auth {
    public sign(credential: ICredential): string {
        try {
            const result = jwt.sign({
                _id: credential._id,
                name_lastname: credential.name_lastname,
                dni: credential.dni,
                organization: credential.organization,
                email: credential.email,
                role: credential.role
            }, process.env.JWT_SECRET);

            return result;
        } catch (e) {
            throw new Error(e);
        }
    }

    public verify(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split(' ')[1];

        if (token) {
            jwt.verify(token, process.env.JWT_SECRET);

            next();
        } else {
            return res.status(401).json({
                message: 'Permission denied.'
            });
        }
    }
}