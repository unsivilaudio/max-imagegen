import { useActionState, useState } from 'react';

import { useAuthContext } from '../store/auth-context';
import Form from './Form';
import Label from './Label';
import Input from './Input';
import InputContainer from './InputContainer';

export default function AuthForm() {
    const authCtx = useAuthContext();
    const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
    const [error, setError] = useState<string>();

    function handleSwitchAuthMode() {
        setAuthMode((prevAuthMode) => {
            if (prevAuthMode === 'login') {
                return 'signup';
            }
            return 'login';
        });
    }

    async function submitAction(_prevState: null, fd: FormData) {
        setError(undefined);
        const email = fd.get('email') as string;
        const password = fd.get('password') as string;
        try {
            if (authMode === 'signup') {
                await authCtx.signup(email, password);
            }
        } catch (err) {
            setError((err as Error).message);
        }
        return null;
    }

    const [, action, isPending] = useActionState(submitAction, null);

    return (
        <Form action={action} className='mx-auto max-w-[25rem]'>
            <InputContainer>
                <Label htmlFor='email'>Email</Label>
                <Input type='email' id='email' />
            </InputContainer>
            <InputContainer>
                <Label htmlFor='password'>Password</Label>
                <Input type='password' id='password' />
            </InputContainer>
            {error && <p className='mt-3 text-red-300'>{error}</p>}
            <p className='mt-4 flex flex-col gap-3'>
                <button
                    className='rounded-lg bg-sky-400 py-2 text-black hover:bg-sky-500 disabled:cursor-not-allowed disabled:bg-stone-600 disabled:text-stone-400'
                    disabled={isPending}
                >
                    {!isPending && authMode === 'login' ? 'Login' : 'Sign Up'}
                    {isPending && 'Submitting...'}
                </button>
                <button type='button' onClick={handleSwitchAuthMode}>
                    {authMode === 'login'
                        ? 'Create a new user'
                        : 'I already have an account, log in instead'}
                </button>
            </p>
        </Form>
    );
}
