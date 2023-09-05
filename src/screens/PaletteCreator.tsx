import {
  Text,
  View,
  Button,
  Modal,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import ColorPicker, {
  Panel1,
  HueSlider,
  OpacitySlider,
} from "reanimated-color-picker";
import {
  generateObjectId,
  determineTextColor,
} from "../utils/PaletteFunctions";
import { useState, useEffect } from "react";
import { COLORS } from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { IColor, IPalette } from "../types/Palette.types";
import PaletteColorItem from "../components/PaletteColorItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

const defaultColor = {
  hex: "#000000",
  rgb: "rgb(0, 0, 0)",
  rgba: "rgba(0, 0, 0, 1)",
  hsv: "hsv(0, 0, 0)",
  hsva: "hsva(0, 0, 0, 1)",
  hsl: "hsl(0, 0, 0)",
  hsla: "hsla(0, 0, 0, 1)",
};

const defaultPalette = {
  id: generateObjectId(),
  name: "My palette",
  colors: [],
};

const PaletteCreator = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(true);
  const [selectedColor, setSelectedColor] = useState<IColor>(defaultColor);
  const [currentPalette, setCurrentPalette] =
    useState<IPalette>(defaultPalette);

  const onSelectColor = ({ hex, rgb, rgba, hsv, hsva, hsl, hsla }: any) => {
    setSelectedColor({ hex, rgb, rgba, hsv, hsva, hsl, hsla });
  };
  const addColor = () => {
    if (currentPalette.colors.length < 12) {
      setCurrentPalette({
        ...currentPalette,
        colors: [...currentPalette.colors, selectedColor],
      });
    } else {
      alert("You have reached the maximum number of colors (12).");
    }
  };

  const editColor = (oldColor: IColor, newColor: IColor) => {
    const newColors = currentPalette.colors.map((color) =>
      color === oldColor ? newColor : color
    );
    setCurrentPalette({
      ...currentPalette,
      colors: newColors,
    });
  };

  const deleteColor = (colorToDelete: IColor) => {
    const newColors = currentPalette.colors.filter(
      (color) => color !== colorToDelete
    );
    setCurrentPalette({
      ...currentPalette,
      colors: newColors,
    });
  };

  // SAVE PALETTE TO ASYNC STORAGE
  // Save after every change to currentPalette
  useEffect(() => {
    const onChangeSavePalettes = async () => {
      try {
        if (currentPalette.colors.length === 0) return;

        const palettes = await AsyncStorage.getItem("palettes");
        const parsedPalettes = palettes ? JSON.parse(palettes) : [];
        const palettesList = Array.isArray(parsedPalettes)
          ? parsedPalettes
          : [];

        // Vérifier si la currentPalette existe déjà dans le stockage
        const existingIndex = palettesList.findIndex(
          (p) => p.id === currentPalette.id
        );

        if (existingIndex !== -1) {
          // Mettre à jour la palette existante
          palettesList[existingIndex] = currentPalette;
        } else {
          // Ajouter la nouvelle palette
          palettesList.push(currentPalette);
        }

        await AsyncStorage.setItem("palettes", JSON.stringify(palettesList));
      } catch (error) {
        console.error("Erreur lors de la sauvegarde des palettes :", error);
      }
    };

    onChangeSavePalettes();
  }, [currentPalette]);

  // Save, reset and redirect to PalettesList on save button press
  const savePalette = async () => {
    try {
      if (currentPalette.colors.length === 0) {
        // Check if there are colors in the palette
        alert(
          "Veuillez ajouter des couleurs à votre palette avant de sauvegarder !"
        );
        return;
      }

      const palettes = await AsyncStorage.getItem("palettes");
      const parsedPalettes = palettes ? JSON.parse(palettes) : [];
      const palettesList = Array.isArray(parsedPalettes) ? parsedPalettes : [];

      // Check if the currentPalette already exists in the storage
      const existingIndex = palettesList.findIndex(
        (p) => p.id === currentPalette.id
      );

      if (existingIndex !== -1) {
        // Update the existing palette
        palettesList[existingIndex] = currentPalette;
      } else {
        // Add the new palette
        palettesList.push(currentPalette);
      }

      await AsyncStorage.setItem("palettes", JSON.stringify(palettesList));
      setCurrentPalette({
        id: generateObjectId(),
        name: "My palette",
        colors: [],
      });
      // resetColorPicker();
      alert("Palette saved !");
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des palettes :", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Palette Name Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Palette Name :</Text>
        <TextInput
          style={styles.nameInput}
          value={currentPalette.name}
          onChangeText={(text) =>
            setCurrentPalette({ ...currentPalette, name: text })
          }
        />
      </View>
      <ScrollView style={styles.paletteContainer}>
        {currentPalette.colors.map((color, index) => (
          <PaletteColorItem
            key={index}
            color={color.hex}
            onEdit={() => console.log("yeah")}
            onDelete={() => console.log("yeah")}
          />
        ))}

        <View
          style={{
            backgroundColor: selectedColor.hex,
            height: 64,
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 16,
          }}
        >
          <Text
            style={{
              color: determineTextColor(selectedColor.rgba),
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {selectedColor.hex}
          </Text>

          <Ionicons
            name="ellipse"
            size={16}
            color={determineTextColor(selectedColor.rgba)}
          />
        </View>
      </ScrollView>

      <View style={styles.colorPicker}>
        <ColorPicker
          style={{ width: "100%" }}
          value={"red"}
          onComplete={onSelectColor}
        >
          <Panel1 style={{ width: "100%", height: 128 }} />
          <HueSlider style={{ marginTop: 16 }} />
          <OpacitySlider style={{ marginTop: 16 }} />
        </ColorPicker>

        <View style={styles.buttonRow}>
          <Button title="Add Color" onPress={() => addColor()} />
          <Button title="Save Palette" onPress={() => savePalette()} />
        </View>
      </View>
    </View>
  );
};

export default PaletteCreator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.BG,
    position: "relative",
  },

  inputContainer: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginVertical: 16,
    gap: 4,
  },

  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.TXT,
  },

  nameInput: {
    height: 40,
    borderRadius: 6,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 16,
    width: "100%",
    color: COLORS.TXT,
  },

  colorName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },

  paletteContainer: {
    width: "100%",
    height: "100%",
  },

  colorPicker: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    padding: 16,
    backgroundColor: COLORS.LMNT,
  },

  buttonRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    gap: 8,
  },
});
