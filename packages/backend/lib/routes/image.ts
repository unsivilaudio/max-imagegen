import express from 'express';
import { generateImage } from '../controllers/image';
import { enforceAuth } from '../middleware/enforce-auth';

const router = express.Router();

router.post('/generate-image', enforceAuth, async (req, res, next) => {
    const { prompt, options } = req.body;
    const { image, type } = await generateImage(prompt, options);
    res.type(type);
    res.status(201).send(image);
});

export default router;
