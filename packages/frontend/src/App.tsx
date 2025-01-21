import AuthForm from './components/AuthForm';
import Header from './components/Header';
import ImageGeneration from './components/ImageGeneration';
import { useAuthContext } from './store/auth-context';

export default function App() {
    const { token } = useAuthContext();
    return (
        <div className='min-h-screen bg-stone-800 py-8'>
            <Header />
            <main className='mt-12'>{!token ? <AuthForm /> : <ImageGeneration />}</main>
        </div>
    );
}
