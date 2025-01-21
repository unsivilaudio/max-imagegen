export type ImageOpts = {
    negative: string;
    model: string;
    cfg: number;
    steps: number;
    size: [number, number];
    denoise: number;
};

const maxConstraint = 512;
export type Ratios = '1:1' | '16:9' | '4:3';

function getSizes(ratio: Ratios) {
    const [horizontal, vertical] = ratio.split(':');
    const width = maxConstraint;
    const aspect = +horizontal / +vertical;
    const height = Math.round((width / aspect) * 100) / 100;
    return [width, height];
}

export function getComfyOpts(quality: string, aspectRatio: Ratios) {
    const size = getSizes(aspectRatio);
    return {
        steps: +quality,
        size,
        cfg: 5,
        negative: 'low quality, blurry',
        denoise: 1,
    } as ImageOpts;
}
