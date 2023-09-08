import {
  Text,
  View,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  hexToRgb,
  rgbToHsl,
  rgbToHsv,
  generateObjectId,
} from "../utils/PaletteFunctions";
import { trad } from "../lang/traduction";
import { COLORS } from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { AppContext } from "../contexts/AppContext";
import PickerModal from "../components/PickerModal";
import { ColorPickerRef } from "reanimated-color-picker";
import { IColor, IPalette } from "../types/Palette.types";
import PaletteColorItem from "../components/PaletteColorItem";
import CurrentColorItem from "../components/CurrentColorItem";
import { useState, useEffect, useRef, useContext } from "react";
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
  const { lang } = useContext(AppContext);
  const [currentPalette, setCurrentPalette] =
    useState<IPalette>(defaultPalette);
  const [pickerType, setPickerType] = useState<string>("picker");
  const [modalVisible, setModalVisible] = useState<boolean>(true);
  const [selectedColorHex, setSelectedColorHex] = useState("#FF0000");
  const [selectedColor, setSelectedColor] = useState<IColor>(defaultColor);
  const [inputValue, setInputValue] = useState<string>(selectedColorHex);
  const pickerRef = useRef<ColorPickerRef>(null);

  const onSelectColor = ({ hex, rgb, rgba, hsv, hsva, hsl, hsla }: any) => {
    setSelectedColorHex(hex);
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

  const deleteColor = (colorToDelete: IColor) => {
    const newColors = currentPalette.colors.filter(
      (color) => color !== colorToDelete
    );
    setCurrentPalette({
      ...currentPalette,
      colors: newColors,
    });
  };

  const handleHexInputEndEditing = () => {
    const isValidHex = /^#([0-9A-Fa-f]{3,4}|[0-9A-Fa-f]{6,8})$/.test(
      inputValue
    );
    if (isValidHex) {
      setSelectedColorHex(inputValue);

      const rgb = hexToRgb(inputValue);
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
      setSelectedColor({
        hex: inputValue,
        rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
        rgba: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`,
        hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
        hsla: `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, 1)`,
        hsv: `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`,
        hsva: `hsva(${hsv.h}, ${hsv.s}%, ${hsv.v}%, 1)`,
      });

      if (pickerRef.current) {
        pickerRef.current.setColor(inputValue);
      }
    } else {
      setInputValue(selectedColorHex);
    }
  };

  // Reset palette
  const resetPalette = () => {
    setCurrentPalette(defaultPalette);
  };

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

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center" }}
    >
      {modalVisible ? null : (
        <>
          {/* Buttons */}
          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingHorizontal: 16,
              marginTop: 24,
              gap: 8,
            }}
          >
            {/* RESET */}
            <TouchableOpacity style={styles.btn} onPress={() => resetPalette()}>
              <Ionicons name="reload-outline" size={16} color={COLORS.TXT} />
              <Text style={{ color: COLORS.TXT }}>
                {trad[lang].paletteCreator.reset}
              </Text>
            </TouchableOpacity>
            {/* SHOW PICKER */}
            <TouchableOpacity
              style={styles.btn}
              onPress={() => setModalVisible(true)}
            >
              <Ionicons name="eye" size={16} color={COLORS.TXT} />
              <Text style={{ color: COLORS.TXT }}>
                {trad[lang].paletteCreator.picker}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Palette Name Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>
              {trad[lang].paletteCreator.paletteName} :
            </Text>
            <TextInput
              style={styles.nameInput}
              value={currentPalette.name}
              onChangeText={(text) =>
                setCurrentPalette({ ...currentPalette, name: text })
              }
            />
          </View>
        </>
      )}

      {/* Current Color */}
      <CurrentColorItem selectedColor={selectedColor} />

      {/* Palette Colors */}
      {currentPalette.colors.map((color, index) => (
        <PaletteColorItem
          key={index}
          color={color.hex}
          onEdit={() => console.log("yeah")}
          onDelete={() => console.log("yeah")}
        />
      ))}

      {/* Color Picker Modal */}
      <PickerModal
        lang={lang}
        addColor={addColor}
        pickerRef={pickerRef}
        pickerType={pickerType}
        inputValue={inputValue}
        modalVisible={modalVisible}
        setPickerType={setPickerType}
        onSelectColor={onSelectColor}
        setInputValue={setInputValue}
        setModalVisible={setModalVisible}
        selectedColorHex={selectedColorHex}
        handleHexInputEndEditing={handleHexInputEndEditing}
      />
    </ScrollView>
  );
};

export default PaletteCreator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: COLORS.BG,
    position: "relative",
  },

  btn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: COLORS.LMNT,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    color: COLORS.TXT,
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
    fontSize: 14,
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
    backgroundColor: "pink",
  },

  buttonRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 24,
    gap: 8,
  },
});
