import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>


      <Tabs.Screen
        name="alta"
        options={{title: "Alta" }}
      />

      <Tabs.Screen
        name="consulta"
        options={{title: "Consulta" }}
      />
    </Tabs>

    
  );
}