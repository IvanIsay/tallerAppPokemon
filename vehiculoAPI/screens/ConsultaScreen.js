import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { router, useFocusEffect } from 'expo-router';

const API_URL = 'https://6a6bd3ea9939b347ccce4cea.mockapi.io/api/v1/vehiculos';

export default function ConsultaUsuariosScreen() {
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(false);

  const obtenerVehiculos = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Error al obtener la lista de vehículos');
      const data = await response.json();
      setVehiculos(data);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      obtenerVehiculos();
    }, [])
  );

  const renderVehiculo = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => router.push({ pathname: '/detalle', params: { id: item.id } })}
    >
      <Text style={styles.title}>{item.marca} {item.modelo}</Text>
      <Text style={styles.subtitle}>Año: {item.anio} | Color: {item.color}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={vehiculos}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={renderVehiculo}
          ListEmptyComponent={<Text style={styles.empty}>No hay vehículos registrados</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 12, elevation: 2 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  subtitle: { fontSize: 14, color: '#666', marginTop: 4 },
  empty: { textAlign: 'center', marginTop: 30, color: '#888', fontSize: 16 }
});