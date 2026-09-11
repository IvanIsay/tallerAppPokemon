import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';

 /* 'http://192.168.0.43:5000/v1/usuarios/' */

import { router } from 'expo-router';

export default function ConsultaUsuariosScreen() {

  const [usuarios, setUsuarios] = useState([]);

  const obtenerUsuarios = async () => {
    try {
      const respuesta = await fetch(
        'http://localhost:5000/v1/usuarios/' );

      const datos = await respuesta.json();

      console.log("Respuesta API:", datos);

      // Guardamos únicamente el arreglo de usuarios
      setUsuarios(datos.usuarios);

    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);


  const renderTarjeta = ({ item }) => (

    <Pressable
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: '/detalleUsuario',
          params: {
            id: item.id,
            nombre: item.nombre,
            edad: item.edad,
          },
        })
      }
    >

      <Text style={styles.nombre}>
        {item.nombre}
      </Text>

      <View style={styles.linea} />

      <Text style={styles.info}>
        Edad: {item.edad} años
      </Text>

      <Text style={styles.verDetalle}>
        Ver detalles →
      </Text>

    </Pressable>

  );


  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.titulo}>
        Lista de Usuarios
      </Text>

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTarjeta}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}

        ListEmptyComponent={
          <Text style={styles.listaVacia}>
            No hay usuarios para mostrar.
          </Text>
        }
      />

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1F2937',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    elevation: 4,

    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563EB',
  },

  linea: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 10,
  },

  info: {
    fontSize: 16,
    color: '#4B5563',
  },

  verDetalle: {
    fontSize: 14,
    color: '#2563EB',
    textAlign: 'right',
    marginTop: 12,
    fontWeight: '600',
  },

  listaVacia: {
    textAlign: 'center',
    marginTop: 20,
    color: '#6B7280',
    fontSize: 16,
  },

});