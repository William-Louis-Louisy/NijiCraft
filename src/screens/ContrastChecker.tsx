import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import {
  isValidHexColor,
  getContrastColor,
  evaluateColorContrast,
} from "../utils/ContrastFunctions";
import { COLORS } from "../constants/Colors";
import { StyleSheet, View } from "react-native";
import { AppContext } from "../contexts/AppContext";
import { ColorPickerRef } from "reanimated-color-picker";
import PreviewComponent from "../components/constrastChecker/PreviewComponent";
import ColorInputComponent from "../components/constrastChecker/ColorInputComponent";
import ConstrastColorPicker from "../components/constrastChecker/ConstrastColorPicker";
import ContrastRatioComponent from "../components/constrastChecker/ContrastRatioComponent";

export interface IColorToCompare {
  textColor: string;
  bgColor: string;
}

const defaultColorToCompare: IColorToCompare = {
  textColor: "#000000",
  bgColor: "#FFFFFF",
};

const ContrastChecker = () => {
  const { lang } = useContext(AppContext);
  const pickerRef = useRef<ColorPickerRef>(null);
  const [colorsToCompare, setColorsToCompare] = useState<IColorToCompare>(
    defaultColorToCompare
  );
  const [tempTextColor, setTempTextColor] = useState(colorsToCompare.textColor);
  const [tempBgColor, setTempBgColor] = useState(colorsToCompare.bgColor);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [pickerType, setPickerType] = useState("picker");
  const [pickerMode, setPickerMode] = useState("textColor");

  const contrastResult = evaluateColorContrast(
    colorsToCompare.textColor,
    colorsToCompare.bgColor
  );
  const contrastColor = getContrastColor(contrastResult.contrastRatio);

  const handleTextColorChange = useCallback((e: any) => {
    const text = e.nativeEvent.text;
    if (isValidHexColor(text)) {
      setColorsToCompare((prevColors) => ({ ...prevColors, textColor: text }));
    }
  }, []);

  const handleBgColorChange = useCallback((e: any) => {
    const text = e.nativeEvent.text;
    if (isValidHexColor(text)) {
      setColorsToCompare((prevColors) => ({ ...prevColors, bgColor: text }));
    }
  }, []);

  const onPickedColor = ({ hex }: any) => {
    if (pickerMode === "textColor") {
      setColorsToCompare({ ...colorsToCompare, textColor: hex });
      setTempTextColor(hex.toUpperCase());
    } else {
      setColorsToCompare({ ...colorsToCompare, bgColor: hex });
      setTempBgColor(hex.toUpperCase());
    }
  };

  useEffect(() => {
    setTempBgColor(colorsToCompare.bgColor);
    setTempTextColor(colorsToCompare.textColor);
  }, [colorsToCompare]);

  return (
    <View style={styles.container}>
      <PreviewComponent colors={colorsToCompare} lang={lang} />
      <View style={styles.colorInputs}>
        <ColorInputComponent
          labelKey="textColor"
          color={colorsToCompare.textColor}
          tempColor={tempTextColor}
          setTempColor={setTempTextColor}
          handleChange={handleTextColorChange}
          onPress={() => {
            setPickerMode("textColor");
            setIsPickerVisible(true);
          }}
          lang={lang}
        />
        <ColorInputComponent
          labelKey="backgroundColor"
          color={colorsToCompare.bgColor}
          tempColor={tempBgColor}
          setTempColor={setTempBgColor}
          handleChange={handleBgColorChange}
          onPress={() => {
            setPickerMode("bgColor");
            setIsPickerVisible(true);
          }}
          lang={lang}
        />
      </View>
      <ContrastRatioComponent
        contrastResult={contrastResult}
        contrastColor={contrastColor}
        lang={lang}
      />

      {/* PICKER */}
      {isPickerVisible && (
        <>
          <View
            style={styles.pickerOverlay}
            onStartShouldSetResponder={() => true}
            onResponderRelease={() => setIsPickerVisible(false)}
          />

          <ConstrastColorPicker
            lang={lang}
            pickerRef={pickerRef}
            pickerMode={pickerMode}
            pickerType={pickerType}
            setPickerType={setPickerType}
            colors={colorsToCompare}
            onComplete={onPickedColor}
            setColor={setColorsToCompare}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: COLORS.BG,
    position: "relative",
  },
  colorInputs: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 16,
  },

  pickerContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: COLORS.LMNT,
    position: "absolute",
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  slider: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginTop: 16,
  },

  pickerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
  },
});

export default ContrastChecker;
