import { useActionState } from 'react';
import Form from './Form';
import Input from './Input';
import InputContainer from './InputContainer';
import Label from './Label';
import { getComfyOpts, Ratios, ImageOpts } from '../util/comfyui';
import { useAuthContext } from '../store/auth-context';

async function sendImageRequest(prompt: string, options: ImageOpts, authToken: string) {
    const response = await fetch('http://localhost:8080/generate-image', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ prompt, options }),
    });

    if (!response.ok) {
        throw new Error('Failed to generate image. Check your inputs.');
    }

    const imageBlob = await response.blob();
    return URL.createObjectURL(imageBlob);
}

export default function ImageGeneration() {
    const { token } = useAuthContext();
    async function submitAction(
        _prevState:
            | { result: string; imageUrl: string; prompt: string }
            | { result: string; message: string; prompt: string }
            | null,
        formData: FormData,
    ) {
        const prompt = formData.get('prompt') as string;
        const quality = formData.get('quality') as string;
        const aspectRatio = formData.get('aspectRatio') as Ratios;
        const comfyOpts = getComfyOpts(quality, aspectRatio);
        const options = {
            prompt,
            ...comfyOpts,
        };
        try {
            const imageUrl = await sendImageRequest(prompt, options, token!);
            return { result: 'success', imageUrl, prompt };
        } catch (err) {
            return { result: 'error', message: (err as Error).message, prompt };
        }
    }

    const [formState, action, isPending] = useActionState(submitAction, null);

    return (
        <div className='mx-auto flex max-w-[70rem] items-start gap-4'>
            <Form action={action} className='flex w-[25rem] flex-col justify-between gap-8'>
                <div className='flex flex-col gap-4'>
                    <InputContainer>
                        <Label htmlFor='prompt'>Image Prompt</Label>
                        <Input
                            type='text'
                            id='prompt'
                            name='prompt'
                            isTextArea
                            defaultValue={formState?.prompt}
                        />
                    </InputContainer>
                    <div className='flex gap-5'>
                        <InputContainer>
                            <Label htmlFor='quality'>Quality</Label>
                            <Input
                                type='number'
                                id='quality'
                                name='quality'
                                min='1'
                                max='100'
                                steps='1.0'
                                defaultValue='24'
                                className='w-[4rem]'
                            />
                        </InputContainer>
                        <InputContainer>
                            <Label htmlFor='aspectRatio'>Aspect Ratio</Label>
                            <select
                                id='aspectRatio'
                                name='aspectRatio'
                                defaultValue='1:1'
                                className='w-[6rem] rounded-sm p-[0.6rem] text-black'
                            >
                                <option value='1:1'>1:1</option>
                                <option value='16:9'>16:9</option>
                                <option value='4:3'>4:3</option>
                            </select>
                        </InputContainer>
                        <InputContainer>
                            <Label htmlFor='format'>Format</Label>
                            <select
                                id='format'
                                name='format'
                                defaultValue='png'
                                className='w-[5rem] rounded-sm p-[0.6rem] text-black'
                            >
                                <option value='webp'>WebP</option>
                                <option value='png'>PNG</option>
                                <option value='jpg'>JPG</option>
                            </select>
                        </InputContainer>
                    </div>
                </div>
                <p className='flex justify-end'>
                    <button
                        disabled={isPending}
                        className='rounded-lg bg-sky-400 px-6 py-3 text-black hover:bg-sky-500 disabled:cursor-not-allowed disabled:bg-stone-400 disabled:text-stone-200'
                    >
                        {isPending ? 'Generating...' : 'Generate'}
                    </button>
                </p>
            </Form>
            <div className='flex h-[25rem] flex-1 items-center justify-center'>
                {!formState?.result && (
                    <p className='p-8 font-mono text-stone-400'>
                        Press "Generate" to generate an image based on your prompt.
                    </p>
                )}
                {formState?.result === 'success' && (
                    <img
                        src={formState.imageUrl}
                        alt={formState.prompt}
                        className='h-[25rem] rounded-md shadow-2xl'
                    />
                )}
                {formState?.result === 'error' && (
                    <p className='text-red-200'>{formState.message}</p>
                )}
            </div>
        </div>
    );
}
