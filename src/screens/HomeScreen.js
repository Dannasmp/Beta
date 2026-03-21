import React, { useContext, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AuthContext } from '../context/authContext';
import { perfilService } from '../api/apiService';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const { logout, userToken } = useContext(AuthContext);

  const [user, setUser] = useState(null);

  const cargarPerfil = async () => {
    try {
      const data = await perfilService.getPerfil(userToken);
      setUser(data);
    } catch (error) {
      console.log("Error cargando perfil:", error);
    }
  };

  // 🔥 ESTO ES LA CLAVE
  useFocusEffect(
    useCallback(() => {
      cargarPerfil();
    }, [])
  );

  return (
    <View style={styles.container}>

      {/* PERFIL */}
      <View style={styles.card}>
        <Image
          source={{
            uri: user?.foto_url || 'https://i.pravatar.cc/150'
          }}
          style={styles.image}
        />

        <Text style={styles.name}>
          {user?.username || 'Usuario ADSO'}
        </Text>

        <Text style={styles.role}>
          {user?.rol?.toUpperCase() || 'APRENDIZ'}
        </Text>
      </View>

      {/* BOTONES */}
      <View style={styles.row}>
        
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate('Tareas')}
        >
          <Text style={styles.boxText}>📋 Mis Tareas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate('Perfil')}
        >
          <Text style={styles.boxText}>📸 Cambiar Foto</Text>
        </TouchableOpacity>

      </View>

      {/* LOGOUT */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity onPress={logout}>
          <Text style={styles.logout}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2'
  },

  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 30,
    elevation: 3
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold'
  },

  role: {
    color: 'green',
    marginTop: 5
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  box: {
    backgroundColor: '#fff',
    width: '45%',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 3
  },

  boxText: {
    fontWeight: 'bold'
  },

  logoutContainer: {
    marginTop: 'auto',
    alignItems: 'center'
  },

  logout: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16
  }
});