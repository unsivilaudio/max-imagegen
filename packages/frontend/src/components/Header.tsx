import { useAuthContext } from '../store/auth-context';

export default function Header() {
    const { token, logout } = useAuthContext();
    return (
        <header className='text-center text-stone-50'>
            <h1 className='font-mono text-3xl font-bold'>Reactlicate Image Generator</h1>
            {token && (
                <button onClick={logout} className='mt-2 text-stone-200 hover:text-stone-400'>
                    Logout
                </button>
            )}
        </header>
    );
}
