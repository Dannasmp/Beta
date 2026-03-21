import * as ImagePicker from "expo-image-picker";
import {Button,View,Image} from "react-native";
import {useState} from "react";

export default function CambiarFotoScreen(){

const [image,setImage] = useState(null);

const seleccionarImagen = async ()=>{

let result = await ImagePicker.launchImageLibraryAsync({
mediaTypes:ImagePicker.MediaTypeOptions.Images,
quality:1
});

if(!result.canceled){

setImage(result.assets[0].uri);

subirImagen(result.assets[0].uri);

}

};

const subirImagen = async (uri)=>{

const data = new FormData();

data.append("file",{
uri:uri,
type:"image/jpeg",
name:"foto.jpg"
});

data.append("upload_preset","TU_PRESET");

await fetch("https://api.cloudinary.com/v1_1/TU_CLOUD_NAME/image/upload",{

method:"POST",
body:data

});

};

return(

<View>

<Button
title="Seleccionar Foto"
onPress={seleccionarImagen}
/>

{image && <Image source={{uri:image}} style={{width:200,height:200}}/>}

</View>

);

}