
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>

      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="detalleUsuario"
        options={{
          title: "Detalle del usuario",
        }}
      />

      <Stack.Screen
        name="actualizarUsuario"
        options={{
          title: 'Actualizar Usuario',
        }}
      />
      
    </Stack>
  );
}