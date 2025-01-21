import prisma from '../db/db';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import AppError from '../util/app-error';

const secretKey = process.env.JWT_SECRET || 'thequickbrownfox';
if (!process.env.JWT_SECRET) {
    console.warn(
        'WARNING: You are using a hardcoded string, please define JWT_SECRET as an environment variable.'
    );
}

export async function createUser(email: string, password: string) {
    const user = await prisma.user.findFirst({ where: { email } });
    if (user) {
        throw new AppError('User creation failed, invalid credentials.', 400);
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await prisma.user.create({ data: { email, password: hashedPassword } });
    const token = jwt.sign({ id: result.id }, secretKey, { expiresIn: '1h' });
    return token;
}

export async function login(email: string, password: string) {
    const user = await prisma.user.findFirstOrThrow({ where: { email } });
    if (!(await bcrypt.compare(password, user.password))) {
        throw new AppError('Invalid email or password.', 400);
    }
    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
    return token;
}
