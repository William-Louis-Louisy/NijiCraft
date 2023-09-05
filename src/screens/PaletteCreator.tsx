import {
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
import { COLORS } from "../constants/Colors";
import { IPalette } from "../types/Palette.types";
import Slider from "@react-native-community/slider";
import PaletteColorItem from "../components/PaletteColorItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  determineTextColor,
  generateObjectId,
  hexColor,
} from "../utils/PaletteFunctions";

const PaletteCreator = () => {
  const [rgba, setRgba] = useState({
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  });
  const [selectedColor, setSelectedColor] = useState<string>(
    `rgb(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`
  );
  const [currentPalette, setCurrentPalette] = useState<IPalette>({
    id: generateObjectId(),
    name: "My palette",
    colors: [],
  });

  const updateSelectedColor = () => {
    setSelectedColor(`rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`);
  };

  // Reset the color picker to black
  const resetColorPicker = () => {
    setRgba({ r: 0, g: 0, b: 0, a: 1 });
    setSelectedColor(`rgba(0, 0, 0, 1)`);
  };

  const addColor = () => {
    if (currentPalette.colors.length < 12) {
      setCurrentPalette({
        ...currentPalette,
        colors: [...currentPalette.colors, selectedColor],
      });
      resetColorPicker();
    } else {
      alert("You have reached the maximum number of colors (12).");
    }
  };

  const editColor = (oldColor: string, newColor: string) => {
    const newColors = currentPalette.colors.map((color) =>
      color === oldColor ? newColor : color
    );
    setCurrentPalette({
      ...currentPalette,
      colors: newColors,
    });
  };

  const deleteColor = (colorToDelete: string) => {
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
      resetColorPicker();
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
            color={color}
            onEdit={editColor}
            onDelete={deleteColor}
          />
        ))}

        <View
          style={{
            backgroundColor: selectedColor,
            height: 64,
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: 16,
          }}
        >
          <Text
            style={{
              color: determineTextColor(
                `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`
              ),
            }}
          >
            {hexColor(selectedColor)}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.colorPicker}>
        {/* COLOR PICKER */}

        <View style={styles.colorPickerRow}>
          <View style={styles.colorPickerLabelRow}>
            <Text style={styles.colorPickerLabel}>red :</Text>
            <TextInput
              style={styles.colorPickerInput}
              inputMode="numeric"
              maxLength={3}
            >
              {rgba.r}
            </TextInput>
          </View>
          <Slider
            step={1}
            value={rgba.r}
            thumbTintColor={COLORS.TXT}
            minimumTrackTintColor={"#FF0000"}
            maximumTrackTintColor={"#FF0000"}
            minimumValue={0}
            maximumValue={255}
            onValueChange={(value) => {
              setRgba({ ...rgba, r: value });
              updateSelectedColor();
            }}
          />
        </View>

        <View style={styles.colorPickerRow}>
          <View style={styles.colorPickerLabelRow}>
            <Text style={styles.colorPickerLabel}>green :</Text>
            <TextInput
              style={styles.colorPickerInput}
              inputMode="numeric"
              maxLength={3}
            >
              {rgba.g}
            </TextInput>
          </View>
          <Slider
            step={1}
            value={rgba.g}
            thumbTintColor={COLORS.TXT}
            minimumTrackTintColor={"#00FF00"}
            maximumTrackTintColor={"#00FF00"}
            minimumValue={0}
            maximumValue={255}
            onValueChange={(value) => {
              setRgba({ ...rgba, g: value });
              updateSelectedColor();
            }}
          />
        </View>

        <View style={styles.colorPickerRow}>
          <View style={styles.colorPickerLabelRow}>
            <Text style={styles.colorPickerLabel}>blue :</Text>
            <TextInput
              style={styles.colorPickerInput}
              inputMode="numeric"
              maxLength={3}
            >
              {rgba.b}
            </TextInput>
          </View>
          <Slider
            step={1}
            value={rgba.b}
            thumbTintColor={COLORS.TXT}
            minimumTrackTintColor={"#0000FF"}
            maximumTrackTintColor={"#0000FF"}
            minimumValue={0}
            maximumValue={255}
            onValueChange={(value) => {
              setRgba({ ...rgba, b: value });
              updateSelectedColor();
            }}
          />
        </View>

        <View style={styles.colorPickerRow}>
          <View style={styles.colorPickerLabelRow}>
            <Text style={styles.colorPickerLabel}>opacity :</Text>
            <TextInput
              style={styles.colorPickerInput}
              inputMode="numeric"
              maxLength={4}
            >
              {rgba.a}
            </TextInput>
          </View>
          <Slider
            step={0.01}
            value={rgba.a}
            thumbTintColor={COLORS.TXT}
            minimumTrackTintColor={"#FFF"}
            maximumTrackTintColor={"#FFF"}
            minimumValue={0}
            maximumValue={1}
            onValueChange={(value) => {
              setRgba({ ...rgba, a: value });
              updateSelectedColor();
            }}
          />
        </View>

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

  colorPickerRow: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },

  colorPickerLabelRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingRight: 16,
    paddingLeft: 8,
  },

  colorPickerLabel: {
    fontSize: 14,
    color: COLORS.TXT,
  },

  colorPickerInput: {
    height: 24,
    width: 48,
    borderRadius: 6,
    borderColor: "gray",
    borderWidth: 1,
    color: COLORS.TXT,
    paddingLeft: 8,
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
