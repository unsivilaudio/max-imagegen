import AuthForm from './components/AuthForm';
import Header from './components/Header';
import { AuthContextProvider } from './store/auth-context';

export default function App() {
    return (
        <AuthContextProvider>
            <div className='min-h-screen bg-stone-800 py-8'>
                <Header />
                <main className='mt-12'>
                    <AuthForm />
                </main>
            </div>
        </AuthContextProvider>
    );
}
