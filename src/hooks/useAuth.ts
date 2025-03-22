import { useState, useEffect } from 'react';
import { register, login, logout, getMe } from '../services/authService';
import { updateToken } from '../services/baseAPI';

// Defina uma interface para o usuário
interface User {
  name?: string;
  email?: string;
  [key: string]: any; // Para outras propriedades que possam existir
}

export function useAuth() {
    const [token, setToken] = useState<string>(localStorage.getItem('token') || '');
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        if (token) {
            updateToken(token);
            setIsAuthenticated(true);
            fetchUserData();
        }
    }, [token]);

    const fetchUserData = async () => {
        try {
            const response = await getMe();
            setUser(response.data);
            setIsAuthenticated(true);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar dados do usuário:', error);
            throw error;
        }
    };

    const handleSignUp = async (name: string, email: string, password: string, password_confirmation: string) => {
        try {
            const response = await register(name, email, password, password_confirmation);
            setToken(response.data.token);
            return response;
        } catch (error) {
            console.error('Erro no cadastro:', error);
            throw error;
        }
    };

    const handleLogin = async (email: string, password: string) => {
        try {
            const response = await login(email, password);
            setToken(response.data.token.plainTextToken);
            return response;
        } catch (error) {
            console.error('Erro no login:', error);
            throw error;
        }
    };

    const handleLogout = async () => {
        try {
            if (token) {
                await logout();
            }
        } catch (error) {
            console.error('Erro no logout:', error);
        } finally {
            setToken('');
            setUser(null);
            setIsAuthenticated(false);
            localStorage.removeItem('token');
        }
    };

    return {
        token,
        user,
        isAuthenticated,
        handleSignUp,
        handleLogin,
        handleLogout,
        fetchUserData
    };
} 