import { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IPalette } from "../types/Palette.types";
import { COLORS } from "../constants/Colors";
import { useFocusEffect } from "@react-navigation/native";

const PalettesList = () => {
  const [palettesList, setPalettesList] = useState<IPalette[]>([]);
  // GET PALETTES FROM ASYNC STORAGE
  const getPalettes = async () => {
    try {
      const palettes = await AsyncStorage.getItem("palettes");
      if (palettes) {
        const retrievedPalettes = JSON.parse(palettes);
        if (
          JSON.stringify(retrievedPalettes) !== JSON.stringify(palettesList)
        ) {
          setPalettesList(retrievedPalettes);
        }
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des palettes :", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getPalettes();
    }, [])
  );

  // DELETE PALETTE
  const deletePalette = async (id: string) => {
    try {
      const newPalettesList = palettesList.filter(
        (palette) => palette.id !== id
      );
      setPalettesList(newPalettesList);
      await AsyncStorage.setItem("palettes", JSON.stringify(newPalettesList));
    } catch (error) {
      console.error("Erreur lors de la suppression de la palette :", error);
    }
  };

  console.log(palettesList);

  return (
    <View style={styles.container}>
      <Text>PalettesList</Text>
      <ScrollView style={styles.listContainer}>
        {palettesList.map((palette) => {
          return (
            <View key={palette.id} style={styles.paletteContainer}>
              <View>
                <Text style={styles.paletteName}>{palette.name}</Text>
                <TouchableOpacity
                  onPress={() => deletePalette(palette.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 32,
                    height: 32,
                    backgroundColor: COLORS.LMNT,
                  }}
                >
                  <Text style={{ color: COLORS.TXT }}>X</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.colorsContainer}>
                {palette.colors.map((color, index) => {
                  const colorWidth = 100 / palette.colors.length;
                  return (
                    <View
                      key={index}
                      style={{
                        backgroundColor: color,
                        width: `${colorWidth}%`,
                        height: 64,
                      }}
                    ></View>
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default PalettesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.BG,
    position: "relative",
  },

  listContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },

  paletteContainer: {
    width: "100%",
    backgroundColor: COLORS.LMNT,
    display: "flex",
    flexDirection: "column",
    padding: 16,
  },

  paletteName: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.TXT,
  },

  colorsContainer: {
    width: "100%",
    height: 64,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
