import { createContext, useState, useEffect, useContext, type ReactNode } from 'react';

// 1. Define what your User looks like (matching your Backend JSON)
interface User {
    email: string;
    isStudio: boolean;
    // add other fields like 'username' if needed
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    checkAuth: () => Promise<void>;
    logout: () => void;
    login: (loginRequest: LoginRequest) => void;
}

interface LoginRequest {
    email: string;
    password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const checkAuth = async () => {
        try {
            // Calling your /me endpoint we discussed
            const response = await fetch('http://localhost:8080/api/v1/auth/me', {
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data); // Store { email: '...', isStudio: true/false }
            } else {
                setUser(null);
            }
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // 2. The Login Logic moved here
    const login = async (loginRequest: LoginRequest) => {
        const response = await fetch('http://localhost:8080/api/v1/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginRequest),
            credentials: 'include', // Receives the cookie
        });

        if (!response.ok) throw new Error('Login failed');

        // After login success, we immediately fetch user details
        await checkAuth();
    };

    const logout = async () => {
        try {
            await fetch('http://localhost:8080/api/v1/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });
        } finally {
            // Always clear local state even if the network call fails
            setUser(null);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, checkAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// 3. Custom hook with a check to ensure it's used within a Provider
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
