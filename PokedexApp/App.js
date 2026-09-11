import React, { useState } from "react";
import {View, Text, TextInput,Button,Image,StyleSheet,ActivityIndicator,Alert,ScrollView, } from "react-native";

export default function App() {

       {/* Estados  */}
  const [characterId, setCharacterId] = useState("");
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(false);



     /* Consumimos la API en base al ID */
  const fetchCharacter = async () => {
    if (!characterId) {
      alert("Ingresa un ID válido");
      Alert.alert("Error", "Ingresa un ID válido");
      return;
    }

    try {
      setLoading(true);
      setCharacter(null);

      const response = await fetch(
        `https://thesimpsonsapi.com/api/characters/${characterId}`
      );

      if (!response.ok) {
        throw new Error("Personaje no encontrado");
      }

      const datos = await response.json();

      const imageUrl = datos.portrait_path
        ? `https://cdn.thesimpsonsapi.com/500${datos.portrait_path}`
        : null;

      const formattedCharacter = {
        id: datos.id,
        name: datos.name,
        gender: datos.gender,
        birthdate: datos.birthdate,
        occupation: datos.occupation || "Sin ocupación disponible",
        phrase: datos.phrases?.[0] || "Sin frase disponible",
        image: imageUrl,
      };

      setCharacter(formattedCharacter);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (

              /* Interfaz  */

    <ScrollView contentContainerStyle={styles.container}>

       {/* titulo  */}
      <Text style={styles.title}>📺 SimpsonDex 🍩  </Text>
      

       {/* Buscador */}
      <TextInput
        style={styles.input}
        placeholder="Ingresa ID del personaje"
        keyboardType="numeric"
        value={characterId}
        onChangeText={setCharacterId}
      />
      <Button title="Buscar Personaje" onPress={fetchCharacter} />

      {loading && (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      )}
      
              {/* Tarjeta par los personajex */}
      {character && (
        <View style={styles.card}>
          {character.image && (
            <Image
              source={{ uri: character.image }}
              style={styles.image}
              resizeMode="contain"
            />
          )}


          <Text style={styles.name}>
            #{character.id} - {character.name}
          </Text>

          <Text style={styles.text}>
            Fecha Nacimiento: {character.birthdate}
          </Text>

          <Text style={styles.text}>
            Ocupación: {character.occupation}
          </Text>

          <Text style={styles.quote}>
            Frase: "{character.phrase}"
          </Text>

        </View>
      )}
    </ScrollView>
  );
}


{/* Estilos  */}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFD90F",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
  },
  input: {
    width: "100%",
    height: 45,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  card: {
    marginTop: 20,
    backgroundColor: "#00AEEF",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    minHeight: 450,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#fff",
    textAlign: "center",
  },
  text: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 5,
  },
  quote: {
    color: "#fff",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 10,
  },
});
