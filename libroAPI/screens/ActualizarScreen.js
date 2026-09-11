import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

const API_URL = 'https://6a6bd3ea9939b347ccce4cea.mockapi.io/api/v1/libros';

export default function ActualizarUsuarioScreen() {
  const { id } = useLocalSearchParams();

  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [paginas, setPaginas] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cargarLibro = async () => {
      if (!id) return;
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error('Error al cargar datos');
        const data = await response.json();
        setTitulo(data.titulo || '');
        setAutor(data.autor || '');
        setPaginas(data.paginas ? data.paginas.toString() : '');
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };
    cargarLibro();
  }, [id]);

  const handleActualizarLibro = async () => {
    if (!titulo.trim() || !autor.trim() || !paginas.toString().trim()) {
      Alert.alert('Atención', 'Todos los campos son requeridos');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo: titulo.trim(),
          autor: autor.trim(),
          paginas: Number(paginas)
        })
      });

      if (!response.ok) throw new Error('No se pudo actualizar el registro');

      Alert.alert('Éxito', 'Libro actualizado correctamente');
      router.back();
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Editar Libro #{id}</Text>

      <TextInput 
        style={styles.input} 
        placeholder="Título" 
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
        placeholder="Páginas" 
        keyboardType="numeric" 
        value={paginas} 
        onChangeText={setPaginas} 
      />

      <TouchableOpacity 
        style={styles.btn} 
        onPress={handleActualizarLibro}
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