import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
} from 'react-native';

import * as SplashScreen from 'expo-splash-screen';

// Evita que el Splash desaparezca automáticamente
SplashScreen.preventAutoHideAsync();

export default function App() {

  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');

  const [libros, setLibros] = useState([]);

  useEffect(() => {

    async function cargarSplash() {

      await new Promise(resolve => setTimeout(resolve, 2000));

      await SplashScreen.hideAsync();

    }

    cargarSplash();

  }, []);

  const agregarLibro = () => {

    if (
      titulo.trim() === '' ||
      autor.trim() === '' ||
      genero.trim() === ''
    ) {

      if (typeof window !== 'undefined') {
        alert('Todos los campos son obligatorios');
      }

      return;
    }

    const nuevoLibro = {
      id: Date.now().toString(),
      titulo,
      autor,
      genero,
    };

    setLibros([...libros, nuevoLibro]);

    setTitulo('');
    setAutor('');
    setGenero('');
  };

  const renderLibro = ({ item }) => (

    <Pressable style={styles.card}>

      <Text style={styles.tituloLibro}>
         {item.titulo}
      </Text>

      <Text>Autor: {item.autor}</Text>

      <Text>Género: {item.genero}</Text>

    </Pressable>

  );

  return (

    <ImageBackground
      source={require('./assets/fondo.jpg')}
      resizeMode="cover"
      style={styles.background}
    >

      <SafeAreaView style={styles.container}>

        <ScrollView>

          <Text style={styles.tituloPrincipal}>
            Catálogo de Libros
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Título del libro"
            value={titulo}
            onChangeText={setTitulo}
          />

          <TextInput
            style={styles.input}
            placeholder="Autor"
            value={autor}
            onChangeText={setAutor}
          />

          <TextInput
            style={styles.input}
            placeholder="Género"
            value={genero}
            onChangeText={setGenero}
          />

          <Pressable
            style={styles.boton}
            onPress={agregarLibro}
          >
            <Text style={styles.textoBoton}>
              Agregar Libro
            </Text>
          </Pressable>

          <Text style={styles.total}>
            Total de libros: {libros.length}
          </Text>

          <FlatList
            data={libros}
            keyExtractor={(item) => item.id}
            renderItem={renderLibro}
            scrollEnabled={false}
          />

        </ScrollView>

      </SafeAreaView>

    </ImageBackground>

  );

}

const styles = StyleSheet.create({

  background: {
    flex: 1,
  },

  container: {
    flex: 1,
    padding: 20,
  },

  tituloPrincipal: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#fff',
  },

  input: {

    backgroundColor: '#ffffffdd',

    borderRadius: 8,

    padding: 12,

    marginBottom: 15,

    fontSize: 16,

  },

  boton: {

    backgroundColor: '#1565C0',

    padding: 15,

    borderRadius: 8,

    alignItems: 'center',

    marginBottom: 20,

  },

  textoBoton: {

    color: 'white',

    fontWeight: 'bold',

    fontSize: 18,

  },

  total: {

    fontSize: 18,

    fontWeight: 'bold',

    color: 'white',

    marginBottom: 15,

  },

  card: {

    backgroundColor: '#ffffffdd',

    padding: 15,

    borderRadius: 10,

    marginBottom: 12,

  },

  tituloLibro: {

    fontSize: 18,

    fontWeight: 'bold',

    marginBottom: 5,

  },

});