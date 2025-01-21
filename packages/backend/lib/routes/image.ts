import express from 'express';
import { generateImage } from '../controllers/image';
import { enforceAuth } from '../middleware/enforce-auth';
import AppError from '../util/app-error';

const router = express.Router();

router.post('/generate-image', enforceAuth, async (req, res, next) => {
    const { prompt, options } = req.body;
    if (!prompt || prompt.trim().length === 0) {
        return next(new AppError('Invalid prompt.', 422));
    }

    const { image, type } = await generateImage(prompt, options);
    res.type(type);
    res.status(201).send(image);
});

export default router;
