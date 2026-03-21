import React,{useState} from "react";
import {View,TextInput,Button} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditarTareaScreen({route,navigation}){

const {tarea}=route.params;

const [titulo,setTitulo]=useState(tarea.titulo);
const [descripcion,setDescripcion]=useState(tarea.descripcion);

const actualizar = async ()=>{

const token = await AsyncStorage.getItem("token");

await fetch(`http://TU_IP:8000/api_tareas/tareas/${tarea.id}/`,{

method:"PUT",

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
value={titulo}
onChangeText={setTitulo}
/>

<TextInput
value={descripcion}
onChangeText={setDescripcion}
/>

<Button
title="Actualizar"
onPress={actualizar}
/>

</View>

);

}