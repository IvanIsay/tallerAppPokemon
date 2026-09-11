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
          title: 'Libros',
          headerTitle: 'Catálogo de Libros'
        }} 
      />
      <Tabs.Screen 
        name="alta" 
        options={{ 
          title: 'Nuevo Libro',
          headerTitle: 'Registrar Libro'
        }} 
      />
    </Tabs>
  );
}