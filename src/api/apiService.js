import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = "http://172.31.221.19:8000/api_tareas";

export const loginService = async (email, password) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/login/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
             throw new Error(data.error || 'Error al iniciar sesion');
        }

        return data;
    } catch (error) {
        throw error;
    }
};

export const taskApiService = {

    // 🔥 GET tareas
    getAll: (token) => fetch(`${BASE_URL}/tareas/`, {
        headers: {
            'Authorization': `Bearer ${token}` // ✅ FIX IMPORTANTE
        }
    }).then(res => res.json()),

    // 🔥 CREAR tarea
    create: (token, data) => fetch(`${BASE_URL}/tareas/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`, // ✅ FIX
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json()),

    // 🔥 ACTUALIZAR
    update: (token, id, data) => fetch(`${BASE_URL}/tareas/${id}/`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`, // ✅ FIX
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json()),
    
    // 🔥 ELIMINAR
    delete: (token, id) => fetch(`${BASE_URL}/tareas/${id}/`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}` // ✅ FIX
        }
    })
};

export const perfilService = {

  getPerfil: async (token) => {
    const res = await fetch(`${BASE_URL}/perfil/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return await res.json();
  },

  subirImagen: async (token, imagen) => {
    const formData = new FormData();

    formData.append('imagen', {
      uri: imagen.uri,
      name: 'foto.jpg',
      type: 'image/jpeg'
    });

    const res = await fetch(`${BASE_URL}/perfil/imagen/`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    return await res.json();
  }
};