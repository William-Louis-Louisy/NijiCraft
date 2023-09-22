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
import Toast from "react-native-toast-message";
import { AppContext } from "../contexts/AppContext";
import PickerModal from "../components/PickerModal";
import { ColorPickerRef } from "reanimated-color-picker";
import { IColor, IPalette } from "../types/Palette.types";
import { useFocusEffect } from "@react-navigation/native";
import PaletteColorItem from "../components/PaletteColorItem";
import CurrentColorItem from "../components/CurrentColorItem";
import { useState, useEffect, useRef, useContext, useCallback } from "react";
import { onChangeSavePalette } from "../utils/CRUD";

const defaultColor = {
  hex: "#469490",
  rgb: "rgb(70, 148, 144)",
  rgba: "rgba(70, 148, 144, 1)",
  hsv: "hsv(177, 53%, 58%)",
  hsva: "hsva(177, 53%, 58%, 1)",
  hsl: "hsl(177, 36%, 43%)",
  hsla: "hsla(177, 36%, 43%, 1)",
};

const defaultPalette: IPalette = {
  id: generateObjectId(),
  name: "My palette",
  colors: [],
};

const PaletteCreator = ({ route }) => {
  const { lang } = useContext(AppContext);
  const [currentPalette, setCurrentPalette] =
    useState<IPalette>(defaultPalette);
  const [pickerType, setPickerType] = useState<string>("picker");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedColorHex, setSelectedColorHex] = useState(defaultColor.hex);
  const [selectedColor, setSelectedColor] = useState<IColor>(defaultColor);
  const [inputValue, setInputValue] = useState<string>(selectedColorHex);
  const pickerRef = useRef<ColorPickerRef>(null);

  const MAX_COLORS = 12;

  const isValidHexColor = (hex: string): boolean => {
    return /^#([0-9A-Fa-f]{3,4}|[0-9A-Fa-f]{6,8})$/.test(hex);
  };

  const onSelectColor = ({ hex, rgb, rgba, hsv, hsva, hsl, hsla }: any) => {
    setSelectedColorHex(hex);
    setSelectedColor({ hex, rgb, rgba, hsv, hsva, hsl, hsla });
  };

  const addColor = () => {
    if (currentPalette.colors.length < MAX_COLORS) {
      setCurrentPalette({
        ...currentPalette,
        colors: [...currentPalette.colors, selectedColor],
      });
    } else {
      Toast.show({
        type: "error",
        text1: trad[lang].toasts.maximumReached,
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 60,
      });
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
    const isValidHex = isValidHexColor(inputValue);
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

    // reset route params
    route.params = {};
  };

  // Save after every change to currentPalette
  useEffect(() => {
    onChangeSavePalette(lang, currentPalette);
  }, [currentPalette]);

  useFocusEffect(
    useCallback(() => {
      if (
        route.params?.paletteToEdit &&
        route.params?.paletteToEdit.id !== currentPalette.id
      ) {
        setCurrentPalette(route.params.paletteToEdit);
      }
    }, [route.params?.paletteToEdit])
  );

  useEffect(() => {
    setInputValue(selectedColorHex);
  }, [selectedColorHex]);

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
              <Ionicons name="eyedrop-outline" size={16} color={COLORS.TXT} />
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
          onDelete={() => deleteColor(color)}
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
        selectedColor={selectedColor}
        setPickerType={setPickerType}
        onSelectColor={onSelectColor}
        setInputValue={setInputValue}
        setModalVisible={setModalVisible}
        setSelectedColor={setSelectedColor}
        selectedColorHex={selectedColorHex}
        setSelectedColorHex={setSelectedColorHex}
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
});
