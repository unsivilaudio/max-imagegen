import { createContext, ReactNode, use, useState } from 'react';

type AuthContextState = {
    token: null | string;
    signup(email: string, password: string): Promise<void>;
    login(email: string, password: string): Promise<void>;
    logout(): void;
};

const AuthContext = createContext<AuthContextState>({
    token: null,
    signup: async (email: string, password: string) => {},
    login: async (email: string, password: string) => {},
    logout: () => {},
});

export function useAuthContext() {
    const authCtx = use(AuthContext);

    if (!authCtx) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }

    return authCtx;
}

type AuthContextProviderProps = {
    children: ReactNode;
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [token, setToken] = useState<null | string>(null);

    async function signup(email: string, password: string) {
        const response = await fetch('http://localhost:8080/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const resData = await response.json();
        if (!response.ok) {
            throw new Error(
                resData.message || 'Creating a user failed. Check your credentials or try later.',
            );
        }

        setToken(resData.token);
    }

    async function login(email: string, password: string) {}

    function logout() {
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ token, signup, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
