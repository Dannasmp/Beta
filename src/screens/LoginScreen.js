import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { AuthContext } from "../context/authContext";
import { loginService } from "../api/apiService";

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);

    const handleLogin = async () => {
    if (!email || !password) {
        return Alert.alert("Error", "Complete todos los campos");
    }

    setLoading(true);

    try {
        console.log("🚀 INICIANDO LOGIN");

        const data = await loginService(email, password);

        console.log("✅ RESPUESTA:", data);

        const token = data?.token || data?.access || data?.idToken;

        console.log("🔑 TOKEN:", token);

        if (!token) {
            throw new Error("No se recibió token");
        }

        await login(token);

    } catch (e) {
        console.log("❌ ERROR LOGIN:", e);
        Alert.alert("Error de login", e.message);
    } finally {
        setLoading(false);
    }
};
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Iniciar Sesión
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            {loading ? (
                <ActivityIndicator size="large" color="#020e52" />
            ) : (
                <Button title="Iniciar Sesión" onPress={handleLogin} color="#020e52" />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#0000ff' },
    input: { borderBottomWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20 }
});

export default LoginScreen; 