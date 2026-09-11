import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

const API_URL = 'https://6a6bd3ea9939b347ccce4cea.mockapi.io/api/v1/vehiculos';

export default function ActualizarUsuarioScreen() {
  const { id } = useLocalSearchParams();

  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [anio, setAnio] = useState('');
  const [color, setColor] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cargarVehiculo = async () => {
      if (!id) return;
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error('Error al cargar datos del vehículo');
        const data = await response.json();
        setMarca(data.marca || '');
        setModelo(data.modelo || '');
        setAnio(data.anio ? data.anio.toString() : '');
        setColor(data.color || '');
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };
    cargarVehiculo();
  }, [id]);

  const handleActualizarVehiculo = async () => {
    if (!marca.trim() || !modelo.trim() || !anio.toString().trim() || !color.trim()) {
      Alert.alert('Atención', 'Todos los campos son requeridos');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          marca: marca.trim(),
          modelo: modelo.trim(),
          anio: Number(anio),
          color: color.trim()
        })
      });

      if (!response.ok) throw new Error('No se pudo actualizar el registro');

      Alert.alert('Éxito', 'Vehículo actualizado correctamente');
      router.back();
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Editar Vehículo #{id}</Text>

      <TextInput 
        style={styles.input} 
        placeholder="Marca" 
        value={marca} 
        onChangeText={setMarca} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Modelo" 
        value={modelo} 
        onChangeText={setModelo} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Año" 
        keyboardType="numeric" 
        value={anio} 
        onChangeText={setAnio} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Color" 
        value={color} 
        onChangeText={setColor} 
      />

      <TouchableOpacity 
        style={styles.btn} 
        onPress={handleActualizarVehiculo}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btnText}>Guardar Cambios</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 15, fontSize: 16 },
  btn: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});