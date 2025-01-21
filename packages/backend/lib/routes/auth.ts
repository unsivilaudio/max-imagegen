import express from 'express';
import AppError from '../util/app-error';
import { createUser, login } from '../controllers/auth';

const router = express.Router();

router.post('/signup', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password || password.trim().length < 7 || !email.includes('@')) {
            throw new AppError(
                'Invalid credentials, please ensure you have entered a valid email and a password that is at least 8 characters in length.',
                422
            );
        }
        const token = await createUser(email, password);
        res.status(201).json({ message: 'User created successfully.', token });
    } catch (err) {
        if (err instanceof AppError) {
            return next(err);
        }
        next(new AppError('Creating user failed.', 500));
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const token = await login(email, password);
        res.json({ message: 'Sucessfully logged in user.', token });
    } catch (err) {
        if (err instanceof AppError) {
            return next(err);
        }
        next(new AppError('Could not log in user.', 500));
    }
});

export default router;
