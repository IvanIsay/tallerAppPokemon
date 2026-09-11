import React,{useState} from 'react';

import{

View,
Text,
Image,
TextInput,
Button,
Switch,
Alert,
StyleSheet

} from 'react-native';

export default function GameCard(props){

const{

nombre,
consola,
precio,
imagen,
onDetalle

}=props;

const[favorito,setFavorito]=useState(false);

const[comentario,setComentario]=useState('');

const[comentarioGuardado,setComentarioGuardado]=useState('');

const guardarComentario=()=>{

setComentarioGuardado(comentario);

Alert.alert(

'Comentario',

'Comentario guardado correctamente'

);

}

return(

<View style={styles.card}>

<Image

source={{uri:imagen}}

style={styles.image}

/>

<Text style={styles.nombre}>
{nombre}
</Text>

<Text>{consola}</Text>

<Text>{precio}</Text>

<View style={styles.switchContainer}>

<Text>Favorito</Text>

<Switch

value={favorito}

onValueChange={setFavorito}

/>

</View>

<TextInput

style={styles.input}

placeholder="Escribe un comentario"

value={comentario}

onChangeText={setComentario}

/>

<Button

title="Guardar comentario"

onPress={guardarComentario}

/>

<Text style={styles.comment}>

Comentario:

{comentarioGuardado}

</Text>

<Button

title="Ver detalles"

onPress={onDetalle}

/>

</View>

)

}

const styles=StyleSheet.create({

card:{
backgroundColor:'#fff',
padding:15,
marginBottom:20,
borderRadius:10,
elevation:3
},

image:{
height:180,
borderRadius:10,
marginBottom:10
},

nombre:{
fontSize:22,
fontWeight:'bold'
},

input:{
borderBottomWidth:1,
marginVertical:10
},

switchContainer:{
flexDirection:'row',
justifyContent:'space-between',
alignItems:'center',
marginVertical:10
},

comment:{
marginVertical:10
}

});