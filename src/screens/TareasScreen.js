import React, {useEffect, useState} from "react";
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://TU_IP:8000/api_tareas/tareas/";

export default function TareasScreen({navigation}){

const [tareas,setTareas] = useState([]);

useEffect(()=>{
   cargarTareas();
},[]);

const cargarTareas = async () => {

   const token = await AsyncStorage.getItem("token");

   const res = await fetch(API_URL,{
      headers:{
         Authorization:`Bearer ${token}`
      }
   });

   const data = await res.json();
   setTareas(data);
};

return(

<View style={styles.container}>

<TouchableOpacity
style={styles.btnCrear}
onPress={()=>navigation.navigate("CrearTarea")}
>
<Text style={{color:"white"}}>Crear tarea</Text>
</TouchableOpacity>

<FlatList
data={tareas}
keyExtractor={(item)=>item.id.toString()}
renderItem={({item})=>(
<TouchableOpacity
style={styles.card}
onPress={()=>navigation.navigate("EditarTarea",{tarea:item})}
>

<Text style={styles.titulo}>{item.titulo}</Text>
<Text>{item.descripcion}</Text>

</TouchableOpacity>
)}
/>

</View>
);
}

const styles = StyleSheet.create({
container:{flex:1,padding:20},
card:{backgroundColor:"white",padding:15,marginBottom:10,borderRadius:10},
titulo:{fontWeight:"bold",fontSize:16},
btnCrear:{
backgroundColor:"#2ecc71",
padding:10,
marginBottom:20,
alignItems:"center",
borderRadius:10
}
});