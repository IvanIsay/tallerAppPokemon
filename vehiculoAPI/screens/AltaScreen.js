import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';

const API_URL = 'https://6a6bd3ea9939b347ccce4cea.mockapi.io/api/v1/vehiculos';

export default function AltaUsuariosScreen() {
  
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [anio, setAnio] = useState('');
  const [color, setColor] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGuardarVehiculo = async () => {
    if (!marca.trim() || !modelo.trim() || !anio.trim() || !color.trim()) {
      Alert.alert('Atención', 'Todos los campos son obligatorios.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          marca: marca.trim(),
          modelo: modelo.trim(),
          anio: Number(anio),
          color: color.trim()
        })
      });

      if (!response.ok) throw new Error('No se pudo guardar el vehículo');

      Alert.alert('Éxito', 'Vehículo registrado correctamente');
      setMarca('');
      setModelo('');
      setAnio('');
      setColor('');
      router.push('/(tabs)/consulta');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Registrar Nuevo Vehículo</Text>

      <TextInput 
        style={styles.input} 
        placeholder="Marca (ej. Toyota)" 
        value={marca} 
        onChangeText={setMarca} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Modelo (ej. Corolla)" 
        value={modelo} 
        onChangeText={setModelo} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Año (ej. 2022)" 
        keyboardType="numeric" 
        value={anio} 
        onChangeText={setAnio} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Color (ej. Blanco)" 
        value={color} 
        onChangeText={setColor} 
      />

      <TouchableOpacity 
        style={styles.btn} 
        onPress={handleGuardarVehiculo}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btnText}>Guardar Vehículo</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 15, fontSize: 16 },
  btn: { backgroundColor: '#28a745', padding: 15, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});