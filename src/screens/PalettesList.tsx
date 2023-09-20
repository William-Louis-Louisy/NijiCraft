import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { trad } from "../lang/traduction";
import IconBnt from "../components/IconBnt";
import { COLORS } from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { IPalette } from "../types/Palette.types";
import { AppContext } from "../contexts/AppContext";
import { useFocusEffect } from "@react-navigation/native";
import { useState, useCallback, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PalettesList = ({ navigation: { navigate } }) => {
  const { lang } = useContext(AppContext);
  const [modal, setModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPalette, setSelectedPalette] = useState({
    id: "",
    name: "",
  });
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

  // Handle dropdown menu opening depending on the palette ID
  const handleDropdown = (palette) => {
    setSelectedPalette({
      id: palette.id,
      name: palette.name,
    });
    setIsOpen(!isOpen);
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
      setModal(false);
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

              {isOpen && selectedPalette.id === palette.id ? (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <TouchableOpacity
                    style={styles.action}
                    onPress={() => {
                      navigate("PaletteCreator", {
                        paletteToEdit: palette,
                      });
                      setIsOpen(false);
                    }}
                  >
                    <Ionicons name="create" size={20} color={COLORS.TXT} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.action}
                    onPress={() => {
                      setModal(true);
                      setIsOpen(false);
                    }}
                  >
                    <Ionicons name="trash" size={20} color={COLORS.WARNING} />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => handleDropdown(palette)}
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
              )}
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
                      height: 32,
                    }}
                  />
                );
              })}
            </TouchableOpacity>
          </View>
        );
      })}

      {modal && (
        <>
          <View
            style={styles.pickerOverlay}
            onStartShouldSetResponder={() => true}
            onResponderRelease={() => setModal(false)}
          >
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>
                {trad[lang].common.delete} {selectedPalette.name}
              </Text>

              <View style={styles.modalContent}>
                <Text style={styles.modalText}>
                  {trad[lang].common.deleteWarning}
                </Text>
                <View style={styles.modalButtons}>
                  <IconBnt
                    size={14}
                    icon="md-close-sharp"
                    bgColor={COLORS.BG}
                    label={trad[lang].common.cancel}
                    onClick={() => setModal(false)}
                  />
                  <IconBnt
                    size={14}
                    icon="trash"
                    bgColor={COLORS.WARNING}
                    label={trad[lang].common.delete}
                    onClick={() => deletePalette(selectedPalette.id)}
                  />
                </View>
              </View>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default PalettesList;

const styles = StyleSheet.create({
  listContainer: {
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
    fontWeight: "bold",
    color: COLORS.TXT,
  },

  colorsContainer: {
    width: "100%",
    height: 32,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  action: {
    backgroundColor: COLORS.BG,
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  pickerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(23, 23, 23, 0.7)",
    alignItems: "center",
    justifyContent: "center",
  },

  modalContainer: {
    width: "80%",
    padding: 16,
    borderRadius: 6,
    backgroundColor: COLORS.LMNT,
    justifyContent: "space-between",
  },

  modalTitle: {
    fontSize: 16,
    color: COLORS.TXT,
    fontWeight: "bold",
    marginBottom: 32,
  },

  modalText: {
    color: COLORS.TXT,
  },

  modalContent: {
    width: "100%",
    gap: 16,
  },

  modalButtons: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 16,
  },
});
