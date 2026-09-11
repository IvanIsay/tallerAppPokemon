import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Modal } from 'react-native';
import { useLocalSearchParams, router, useFocusEffect } from 'expo-router';

const API_URL = 'https://6a6bd3ea9939b347ccce4cea.mockapi.io/api/v1/vehiculos';

export default function DetalleUsuarioScreen() {
  const { id } = useLocalSearchParams();
  const [vehiculo, setVehiculo] = useState(null);
  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const obtenerDetalle = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) throw new Error('Error al cargar la información del vehículo');
      const data = await response.json();
      setVehiculo(data);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      obtenerDetalle();
    }, [id])
  );

  const confirmarEliminacion = async () => {  
    setDeleting(true);
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('No se pudo eliminar el vehículo');
      setModalVisible(false);
      Alert.alert('Éxito', 'Vehículo eliminado correctamente');
      router.back();
    } catch (error) {
      setModalVisible(false);
      Alert.alert('Error', error.message);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>ID: <Text style={styles.value}>{id}</Text></Text>
      <Text style={styles.label}>Marca: <Text style={styles.value}>{vehiculo?.marca}</Text></Text>
      <Text style={styles.label}>Modelo: <Text style={styles.value}>{vehiculo?.modelo}</Text></Text>
      <Text style={styles.label}>Año: <Text style={styles.value}>{vehiculo?.anio}</Text></Text>
      <Text style={styles.label}>Color: <Text style={styles.value}>{vehiculo?.color}</Text></Text>

      <View style={styles.actions}>
        <TouchableOpacity 
          style={[styles.btn, styles.btnEdit]} 
          onPress={() => router.push({ pathname:'/actualizar', params: { id } })}
        >
          <Text style={styles.btnText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.btn, styles.btnDelete]} 
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.btnText}>Eliminar</Text>
        </TouchableOpacity>
      </View>

      {/* Modal Personalizado para Confirmar Eliminación */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirmar Eliminación</Text>
            <Text style={styles.modalMessage}>
              ¿Estás seguro de eliminar el {vehiculo?.marca} {vehiculo?.modelo}?
            </Text>

            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={[styles.btnModal, styles.btnCancel]} 
                onPress={() => setModalVisible(false)}
                disabled={deleting}
              >
                <Text style={styles.btnTextCancel}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.btnModal, styles.btnConfirm]} 
                onPress={confirmarEliminacion}
                disabled={deleting}
              >
                {deleting ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.btnTextConfirm}>Eliminar</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  label: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#333' },
  value: { fontWeight: 'normal', color: '#555' },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 },
  btn: { flex: 0.48, padding: 15, borderRadius: 8, alignItems: 'center' },
  btnEdit: { backgroundColor: '#ffc107' },
  btnDelete: { backgroundColor: '#dc3545' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 5
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  modalMessage: { fontSize: 16, color: '#666', marginBottom: 20 },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end' },
  btnModal: { paddingVertical: 10, paddingHorizontal: 18, borderRadius: 6, marginLeft: 10 },
  btnCancel: { backgroundColor: '#e0e0e0' },
  btnConfirm: { backgroundColor: '#dc3545' },
  btnTextCancel: { color: '#333', fontWeight: 'bold' },
  btnTextConfirm: { color: '#fff', fontWeight: 'bold' }
});