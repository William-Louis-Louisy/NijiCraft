import { useState, useCallback, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { IPalette } from "../types/Palette.types";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { trad } from "../lang/traduction";
import { AppContext } from "../contexts/AppContext";
import PaletteDetails from "./PaletteDetails";

const PalettesList = ({ navigation: { navigate } }) => {
  const { lang } = useContext(AppContext);
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

  return (
    <ScrollView style={styles.listContainer}>
      {palettesList.map((palette) => {
        return (
          <View key={palette.id} style={styles.paletteContainer}>
            <View style={styles.header}>
              <Text style={styles.paletteName}>{palette.name}</Text>
              <TouchableOpacity
                onPress={() => deletePalette(palette.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons
                  name="ellipsis-vertical"
                  size={20}
                  color={COLORS.TXT}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() =>
                navigate("PaletteDetails", {
                  palette: palette,
                  paletteName: palette.name,
                })
              }
              style={styles.colorsContainer}
            >
              {palette.colors.map((color, index) => {
                const colorWidth = 100 / palette.colors.length;
                return (
                  <View
                    key={index}
                    style={{
                      backgroundColor: color.hex,
                      width: `${colorWidth}%`,
                      height: 64,
                    }}
                  ></View>
                );
              })}
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default PalettesList;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: COLORS.BG,
    position: "relative",
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
    marginBottom: 16,
  },

  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
