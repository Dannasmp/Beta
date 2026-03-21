import React, {createContext, useState, useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const login = async (token) => {
    console.log("TOKEN GUARDADO:", token);

    if (!token) {
        console.log("❌ TOKEN VACÍO");
        return;
    }

    setUserToken(token);
    await AsyncStorage.setItem('userToken', token);
};

    const logout = async () => {
        setUserToken(null);
        await AsyncStorage.removeItem('userToken');
    };

    const isLoggedIn = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            setUserToken(token);
        } catch (e) {
            console.log('Error en persistencia: ', e);
        } 
        setIsLoading(false); 
    };

    useEffect(() => {
        isLoggedIn();
    }, [])

    return (
        <AuthContext.Provider value={{ login, logout, userToken, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}