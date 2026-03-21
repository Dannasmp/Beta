import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../context/authContext';
import { perfilService } from '../api/apiService';

const ProfileScreen = () => {
  const { userToken } = useContext(AuthContext);

  const [imagen, setImagen] = useState(null);
  const [imagenActual, setImagenActual] = useState(null);

  // 🔥 Cargar imagen actual desde backend
  const cargarPerfil = async () => {
    const data = await perfilService.getPerfil(userToken);
    setImagenActual(data.foto_url);
  };

  useEffect(() => {
    cargarPerfil();
  }, []);

  // 🔥 Elegir imagen
  const seleccionarImagen = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1
    });

    if (!result.canceled) {
      setImagen(result.assets[0]);
    }
  };

  // 🔥 Subir imagen
  
  const guardarImagen = async () => {
  if (!imagen) {
    return Alert.alert("Error", "Selecciona una imagen");
  }

  try {
    const res = await perfilService.subirImagen(userToken, imagen);

    console.log("RESPUESTA:", res);

    if (res.error) {
      Alert.alert("Error", res.error);
      return;
    }

    Alert.alert("Éxito", "Imagen actualizada");

    setImagen(null);
    cargarPerfil();

  } catch (error) {
    console.log(error);
    Alert.alert("Error al subir imagen");
  }
};

  return (
    <View style={styles.container}>

      <Text style={styles.title}>📸 Cambiar Foto de Perfil</Text>

      {/* FOTO */}
      <View style={styles.circle}>
        {imagen ? (
          <Image source={{ uri: imagen.uri }} style={styles.image} />
        ) : imagenActual ? (
          <Image source={{ uri: imagenActual }} style={styles.image} />
        ) : (
          <Text>No has seleccionado imagen</Text>
        )}
      </View>

      {/* BOTÓN GALERÍA */}
      <TouchableOpacity style={styles.btn} onPress={seleccionarImagen}>
        <Text style={styles.btnText}>Elegir de la galería</Text>
      </TouchableOpacity>

      {/* GUARDAR */}
      <TouchableOpacity style={styles.saveBtn} onPress={guardarImagen}>
        <Text style={styles.saveText}>Guardar</Text>
      </TouchableOpacity>

      {/* CANCELAR */}
      <Text style={styles.cancel}>Cancelar</Text>

    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    padding: 20
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  },

  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
  },

  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100
  },

  btn: {
    borderWidth: 2,
    borderColor: 'green',
    padding: 15,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center'
  },

  btnText: {
    color: 'green',
    fontWeight: 'bold'
  },

  saveBtn: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '90%',
    alignItems: 'center'
  },

  saveText: {
    color: '#fff',
    fontWeight: 'bold'
  },

  cancel: {
    marginTop: 20,
    color: 'red'
  }
});