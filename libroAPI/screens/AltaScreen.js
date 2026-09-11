import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';

const API_URL = 'https://6a6bd3ea9939b347ccce4cea.mockapi.io/api/v1/libros';

export default function AltaUsuariosScreen() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [paginas, setPaginas] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGuardarLibro = async () => {
    if (!titulo.trim() || !autor.trim() || !paginas.trim()) {
      Alert.alert('Atención', 'Todos los campos son obligatorios.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo: titulo.trim(),
          autor: autor.trim(),
          paginas: Number(paginas)
        })
      });

      if (!response.ok) throw new Error('No se pudo guardar el libro');

      Alert.alert('Éxito', 'Libro registrado correctamente');
      setTitulo('');
      setAutor('');
      setPaginas('');
      router.push('/(tabs)/consulta');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Registrar Nuevo Libro</Text>

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
        placeholder="Número de páginas" 
        keyboardType="numeric" 
        value={paginas} 
        onChangeText={setPaginas} 
      />

      <TouchableOpacity 
        style={styles.btn} 
        onPress={handleGuardarLibro}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btnText}>Guardar Libro</Text>
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