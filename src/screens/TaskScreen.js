import React, { useEffect, useState, useContext } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput
} from "react-native";

import { AuthContext } from "../context/authContext";
import { taskApiService } from "../api/apiService";

const TaskScreen = () => {
    const { userToken } = useContext(AuthContext);

    const [tasks, setTasks] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState(null);

    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const loadTasks = async () => {
        const data = await taskApiService.getAll(userToken);
        setTasks(data.datos || []);
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const openCreateModal = () => {
        setEditMode(false);
        setTitulo('');
        setDescripcion('');
        setModalVisible(true);
    };

    const openEditModal = (task) => {
        setEditMode(true);
        setCurrentTaskId(task.id);
        setTitulo(task.titulo);
        setDescripcion(task.descripcion);
        setModalVisible(true);
    };

    const saveTask = async () => {
        if (editMode) {
            await taskApiService.update(userToken, currentTaskId, {
                titulo,
                descripcion
            });
        } else {
            await taskApiService.create(userToken, {
                titulo,
                descripcion
            });
        }

        setModalVisible(false);
        loadTasks();
    };

    const deleteTask = async (id) => {
        await taskApiService.delete(userToken, id);
        loadTasks();
    };

    return (
        <View style={styles.container}>

            <Text style={styles.header}>Mis Tareas</Text>

            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.title}>{item.titulo}</Text>
                            <Text>{item.descripcion}</Text>
                        </View>

                        <View style={styles.actions}>
                            <Text onPress={() => openEditModal(item)}>✏️</Text>
                            <Text onPress={() => deleteTask(item.id)}>🗑️</Text>
                        </View>
                    </View>
                )}
            />

            {/* BOTÓN + */}
            <TouchableOpacity style={styles.fab} onPress={openCreateModal}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>

            {/* MODAL */}
            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalBox}>

                        <Text style={styles.modalTitle}>
                            {editMode ? "Editar Tarea" : "Nueva Tarea"}
                        </Text>

                        <TextInput
                            placeholder="Título"
                            value={titulo}
                            onChangeText={setTitulo}
                            style={styles.input}
                        />

                        <TextInput
                            placeholder="Descripción"
                            value={descripcion}
                            onChangeText={setDescripcion}
                            style={styles.input}
                        />

                        <View style={styles.modalButtons}>
                            <Text style={styles.cancel} onPress={() => setModalVisible(false)}>
                                CANCELAR
                            </Text>

                            <Text style={styles.save} onPress={saveTask}>
                                GUARDAR
                            </Text>
                        </View>

                    </View>
                </View>
            </Modal>

        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#f2f2f2" },

    header: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },

    card: {
        backgroundColor: "#fff",
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center"
    },

    title: { fontWeight: "bold" },

    actions: {
        flexDirection: "row",
        gap: 10
    },

    fab: {
        position: "absolute",
        bottom: 30,
        right: 30,
        backgroundColor: "green",
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center"
    },

    fabText: { color: "#fff", fontSize: 24 },

    modalContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)"
    },

    modalBox: {
        backgroundColor: "#fff",
        margin: 20,
        padding: 20,
        borderRadius: 10
    },

    modalTitle: {
        fontSize: 18,
        marginBottom: 10
    },

    input: {
        borderBottomWidth: 1,
        marginBottom: 10
    },

    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10
    },

    cancel: { color: "red" },
    save: { color: "green" }
});

export default TaskScreen;