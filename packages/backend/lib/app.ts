import express, { Request, Response, NextFunction } from 'express';
import authRoutes from './routes/auth';
import imageRoutes from './routes/image';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        status: 200,
        message: 'Hello world',
    });
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(authRoutes);
app.use(imageRoutes);

app.use((error: AppError, _req: Request, res: Response, _next: NextFunction) => {
    console.log(error.message);
    const status = error.statusCode || 500;
    res.status(status).json({
        status,
        message: error.message || 'Oops! Something went wrong!',
    });
});

const PORT = process.env.port || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
