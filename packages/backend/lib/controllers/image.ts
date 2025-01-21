import path from 'path';
import { WebSocket } from 'node:http';
import fs from 'node:fs/promises';

import { Client, BasePipe } from '@stable-canvas/comfyui-client';

/**
 * using 'comfyui-client' to use local comfyui backend
 * https://github.com/StableCanvas/comfyui-client
 *
 */
const client = new Client({
    api_host: '127.0.0.1:11132',
});

client
    .connect()
    .getSDModels()
    .then((data) => console.log(data));

type ImageOpts = {
    negative: string;
    model: string;
    cfg: number;
    steps: number;
    size: [number, number];
    denoise: number;
};

const imageOpts: ImageOpts = {
    negative: 'low quality, blurry',
    model: 'sd15.safetensors',
    cfg: 5,
    steps: 24,
    size: [1024, 768],
    denoise: 1,
};

export async function generateImage(prompt: string, options: ImageOpts) {
    const generator = new BasePipe().with(client);
    const finalOpts = { ...imageOpts, ...options };
    const results = await generator
        .prompt(prompt)
        .model(finalOpts.model)
        .negative(finalOpts.negative)
        .size(...finalOpts.size)
        .steps(finalOpts.steps)
        .cfg(finalOpts.cfg)
        .seed()
        .save()
        .wait();
    /* grab last step image with `steps` */
    const img0 = results.images[finalOpts.steps];
    const image = Buffer.from(img0.data);

    return { image, type: img0.mime };
}
