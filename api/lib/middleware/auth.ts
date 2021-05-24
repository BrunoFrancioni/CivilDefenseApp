import { Request, Response, NextFunction } from 'express';
import { ICredential } from 'interfaces/ICredentials';
import * as jwt from 'jsonwebtoken';

export const verify = (req: Request, res: Response, next: NextFunction): any => {
    const token = req.header('Authorization');

    try {
        if (token) {
            const string = token.split(' ')[1];

            const decoded = jwt.verify(string, process.env.JWT_SECRET);

            res.locals.jwt = decoded;
            next();
        } else {
            return res.status(401).json({
                message: 'Permission denied.'
            });
        }
    } catch (e) {
        res.status(400).json({
            message: 'Invalid token'
        });
    }
}
export const sign = (credential: ICredential): string => {
    try {
        const result = jwt.sign({
            _id: credential._id,
            name_lastname: credential.name_lastname,
            dni: credential.dni,
            organization: credential.organization,
            email: credential.email
        }, process.env.JWT_SECRET);

        return result;
    } catch (e) {
        throw new Error(e);
    }
}