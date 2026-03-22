import React,{useState} from "react";
import {View,TextInput,Button} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CrearTareaScreen({navigation}){

const [titulo,setTitulo]=useState("");
const [descripcion,setDescripcion]=useState("");

const crearTarea = async () => {

const token = await AsyncStorage.getItem("token");

await fetch("http://TU_IP:8000/api_tareas/tareas/",{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({
titulo,
descripcion
})
});

navigation.goBack();

};

return(

<View style={{padding:20}}>

<TextInput
placeholder="Titulo"
value={titulo}
onChangeText={setTitulo}
/>

<TextInput
placeholder="Descripcion"
value={descripcion}
onChangeText={setDescripcion}
/>

<Button
title="Guardar"
onPress={crearTarea}
/>

</View>

);

}

