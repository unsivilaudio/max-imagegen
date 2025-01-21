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

app.use(authRoutes);
app.use(imageRoutes);

app.use((error: AppError, _req: Request, res: Response, _next: NextFunction) => {
    console.log(error.message);
    res.json({
        status: error.statusCode || 500,
        message: error.message || 'Oops! Something went wrong!',
    });
});

const PORT = process.env.port || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
