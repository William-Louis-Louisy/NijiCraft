import { trad } from "../lang/traduction";
import { COLORS } from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { AppContext } from "../contexts/AppContext";
import React, { useState, useContext } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import {
  evaluateContrast,
  getContrastRatio,
  getStars,
} from "../utils/ContrastFunctions";

interface IColorToCompare {
  textColor: string;
  bgColor: string;
}

const defaultColorToCompare: IColorToCompare = {
  textColor: "#000000",
  bgColor: "#FFFFFF",
};

const ContrastChecker = () => {
  const { lang } = useContext(AppContext);
  const [colorsToCompare, setColorsToCompare] = useState<IColorToCompare>(
    defaultColorToCompare
  );
  const [tempTextColor, setTempTextColor] = useState(colorsToCompare.textColor);
  const [tempBgColor, setTempBgColor] = useState(colorsToCompare.bgColor);

  /**
   * Evaluate the contrast between two hex colors and return a rating from 0 to 5 stars.
   * @param color1 - The first hex color
   * @param color2 - The second hex color
   * @returns - The contrast rating (0 to 5 stars)
   */
  function evaluateColorContrast(color1: string, color2: string) {
    const contrastRatio =
      Math.round(getContrastRatio(color1, color2) * 10) / 10;
    const contrastRating = evaluateContrast(contrastRatio);
    return {
      contrastRatio,
      contrastRating,
    };
  }

  /**
   * Depending on the contrast rato, return a string with the corresponding color.
   * @param contrastRatio - The contrast ratio
   * @returns - The color
   */
  function getContrastColor(contrastRatio: number) {
    if (contrastRatio >= 7) {
      return {
        textColor: "#0d5f07",
        bgColor: "#d2fbd0",
        value: trad[lang].constrastChecker.exellent,
      };
    } else if (contrastRatio >= 4.5) {
      return {
        textColor: "#5f5207",
        bgColor: "#fbf5d0",
        value: trad[lang].constrastChecker.good,
      };
    } else if (contrastRatio >= 3) {
      return {
        textColor: "#5f5207",
        bgColor: "#fbf5d0",
        value: trad[lang].constrastChecker.acceptable,
      };
    } else if (contrastRatio >= 2) {
      return {
        textColor: "#5f0707",
        bgColor: "#fbd0d0",
        value: trad[lang].constrastChecker.poor,
      };
    } else if (contrastRatio >= 1.5) {
      return {
        textColor: "#5f0707",
        bgColor: "#fbd0d0",
        value: trad[lang].constrastChecker.veryPoor,
      };
    }
  }

  const contrastColor = getContrastColor(
    evaluateColorContrast(colorsToCompare.textColor, colorsToCompare.bgColor)
      .contrastRatio
  );

  function isValidHexColor(hex: string): boolean {
    const hexRegex = /^#([A-Fa-f0-9]{3,4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/;
    return hexRegex.test(hex);
  }

  const handleTextColorChange = (e: any) => {
    const text = e.nativeEvent.text;
    if (isValidHexColor(text)) {
      setColorsToCompare({ ...colorsToCompare, textColor: text });
    }
  };

  const handleBgColorChange = (e: any) => {
    const text = e.nativeEvent.text;
    if (isValidHexColor(text)) {
      setColorsToCompare({ ...colorsToCompare, bgColor: text });
    }
  };

  return (
    <View style={styles.container}>
      {/* Preview */}
      <View
        style={[
          styles.previewContainer,
          { backgroundColor: colorsToCompare.bgColor },
        ]}
      >
        <Text style={[styles.poemTitle, { color: colorsToCompare.textColor }]}>
          Couleur d'orange
        </Text>
        <Text style={{ color: colorsToCompare.textColor }}>
          {trad[lang].constrastChecker.poem}
        </Text>
        <Text style={[styles.poemAutor, { color: colorsToCompare.textColor }]}>
          Paul Éluard
        </Text>
      </View>

      {/* Color inputs */}
      <View style={styles.colorInputs}>
        {/* Text color input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            {trad[lang].constrastChecker.textColor}
          </Text>
          {/* Inputs block */}
          <View style={styles.inputBlock}>
            <View
              style={{
                backgroundColor: colorsToCompare.textColor,
                width: 56,
                height: 40,
                borderTopLeftRadius: 6,
                borderBottomLeftRadius: 6,
                borderWidth: 1,
                borderColor: COLORS.TXT,
                marginRight: -1,
              }}
            />
            <TextInput
              style={[styles.input]}
              maxLength={9} // #RRGGBBAA
              autoCapitalize="characters"
              value={tempTextColor}
              onChangeText={setTempTextColor}
              onEndEditing={(e) => handleTextColorChange(e)}
            />
          </View>
        </View>
        {/* Background color input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            {trad[lang].constrastChecker.backgroundColor}
          </Text>

          <View style={styles.inputBlock}>
            <View
              style={{
                backgroundColor: colorsToCompare.bgColor,
                width: 56,
                height: 40,
                borderTopLeftRadius: 6,
                borderBottomLeftRadius: 6,
                borderWidth: 1,
                borderColor: COLORS.TXT,
                marginRight: -1,
              }}
            />
            <TextInput
              style={[styles.input]}
              maxLength={9} // #RRGGBBAA
              autoCapitalize="characters"
              value={tempBgColor}
              onChangeText={setTempBgColor}
              onEndEditing={(e) => handleBgColorChange(e)}
            />
          </View>
        </View>
      </View>

      {/* Contrast ratio */}
      <View
        style={{
          width: "100%",
          paddingHorizontal: 16,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ width: "100%" }}>
          <Text style={styles.inputLabel}>
            {trad[lang].constrastChecker.constrast}
          </Text>

          <View
            style={{
              backgroundColor: contrastColor.bgColor,
              width: "100%",
              padding: 16,
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 32,
                color: contrastColor.textColor,
              }}
            >
              {
                evaluateColorContrast(
                  colorsToCompare.textColor,
                  colorsToCompare.bgColor
                ).contrastRatio
              }
            </Text>

            <View>
              <Text
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  color: contrastColor.textColor,
                }}
              >
                {contrastColor.value}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons
                  name={
                    getStars(
                      evaluateColorContrast(
                        colorsToCompare.textColor,
                        colorsToCompare.bgColor
                      ).contrastRating
                    ).star1 as any
                  }
                  size={20}
                  color={contrastColor.textColor}
                />
                <Ionicons
                  name={
                    getStars(
                      evaluateColorContrast(
                        colorsToCompare.textColor,
                        colorsToCompare.bgColor
                      ).contrastRating
                    ).star2 as any
                  }
                  size={20}
                  color={contrastColor.textColor}
                />
                <Ionicons
                  name={
                    getStars(
                      evaluateColorContrast(
                        colorsToCompare.textColor,
                        colorsToCompare.bgColor
                      ).contrastRating
                    ).star3 as any
                  }
                  size={20}
                  color={contrastColor.textColor}
                />
                <Ionicons
                  name={
                    getStars(
                      evaluateColorContrast(
                        colorsToCompare.textColor,
                        colorsToCompare.bgColor
                      ).contrastRating
                    ).star4 as any
                  }
                  size={20}
                  color={contrastColor.textColor}
                />
                <Ionicons
                  name={
                    getStars(
                      evaluateColorContrast(
                        colorsToCompare.textColor,
                        colorsToCompare.bgColor
                      ).contrastRating
                    ).star5 as any
                  }
                  size={20}
                  color={contrastColor.textColor}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ContrastChecker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: COLORS.BG,
    position: "relative",
  },
  previewContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 32,
  },
  poemTitle: {
    fontSize: 20,
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
    marginBottom: 16,
  },
  poemAutor: {
    fontSize: 12,
    fontStyle: "italic",
    width: "100%",
    textAlign: "right",
    marginTop: 8,
  },

  colorInputs: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 16,
  },

  inputContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "48%",
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.TXT,
  },

  inputBlock: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 8,
    width: "100%",
  },

  input: {
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.TXT,
    paddingHorizontal: 16,
    color: COLORS.TXT,
    width: 96,
  },
});
