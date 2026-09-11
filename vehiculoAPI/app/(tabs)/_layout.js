import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen 
        name="index" 
        options={{ href: null }} 
      />
      <Tabs.Screen 
        name="consulta" 
        options={{ 
          title: 'Vehículos',
          headerTitle: 'Catálogo de Vehículos'
        }} 
      />
      <Tabs.Screen 
        name="alta" 
        options={{ 
          title: 'Nuevo Vehículo',
          headerTitle: 'Registrar Vehículo'
        }} 
      />
    </Tabs>
  );
}