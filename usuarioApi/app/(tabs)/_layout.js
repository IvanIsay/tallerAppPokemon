
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs>

       <Tabs.Screen
        name="index"
        options={{title: "Inicio", href: null, }}
      />

      <Tabs.Screen
        name="alta"
        options={{
          title: "Alta",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-add"  size={15} color={"red"} />
          ),
        }}
      />

      <Tabs.Screen
        name="consulta"
        options={{
          title: "Consulta",
          tabBarIcon: ({ color, size }) => (
            <Ionicons  name="search" size={15} color={"red"} />
          ),
        }}
      />


    </Tabs>

    
  );
}