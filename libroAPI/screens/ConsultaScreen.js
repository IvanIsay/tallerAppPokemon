import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { router, useFocusEffect } from 'expo-router';

const API_URL = 'https://6a6bd3ea9939b347ccce4cea.mockapi.io/api/v1/libros';

export default function ConsultaUsuariosScreen() {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(false);

  const obtenerLibros = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Error al obtener los libros');
      const data = await response.json();
      setLibros(data);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Se ejecuta cada vez que la pantalla pasa a primer plano
  useFocusEffect(
    useCallback(() => {
      obtenerLibros();
    }, [])
  );

  const renderLibro = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => router.push({ pathname: '/detalle', params: { id: item.id } })}
    >
      <Text style={styles.title}>{item.titulo}</Text>
      <Text style={styles.subtitle}>Autor: {item.autor}</Text>
      <Text style={styles.pages}>Páginas: {item.paginas}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={libros}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={renderLibro}
          ListEmptyComponent={<Text style={styles.empty}>No hay libros disponibles</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 12, elevation: 2 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  subtitle: { fontSize: 15, color: '#555', marginTop: 4 },
  pages: { fontSize: 13, color: '#888', marginTop: 2 },
  empty: { textAlign: 'center', marginTop: 30, color: '#888', fontSize: 16 }
});