import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AppError from '../util/app-error';

const secretKey = process.env.JWT_SECRET || 'thequickbrownfox';

export function enforceAuth(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new AppError('Unauthorized', 401);
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new AppError('Unauthorized', 401);
        }
        const isValid = jwt.verify(token, secretKey);
        if (!isValid) {
            throw new AppError('Unauthorized', 401);
        }
    } catch (err) {
        if (err instanceof AppError) {
            return next(err);
        }
        console.log(err);
        return next(new AppError('Could not authorize request.', 500));
    }
    next();
}
