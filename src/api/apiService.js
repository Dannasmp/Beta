import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = "http://127.0.0.1:8000/api";

export const loginService = async (email, password) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al iniciar sesión');
        }

        return data;

    } catch (error) {
        throw error;
    }
};