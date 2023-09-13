import React from "react";
import { trad } from "../lang/traduction";
import * as Clipboard from "expo-clipboard";
import { COLORS } from "../constants/Colors";
import Toast from "react-native-toast-message";
import { IColor } from "../types/Palette.types";
import { AppContext } from "../contexts/AppContext";
import { Dropdown } from "react-native-element-dropdown";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { determineTextColor } from "../utils/PaletteFunctions";

const PaletteDetails = ({ navigation, route }) => {
  const { lang } = React.useContext(AppContext);
  const colors: IColor[] = route.params.palette.colors;
  const paletteName = route.params.palette.paletteName;

  const getColorOptions = (color: IColor) => {
    return [
      { label: "HEX", value: color.hex },
      { label: "HSL", value: color.hsl },
      { label: "HSLA", value: color.hsla },
      { label: "HSV", value: color.hsv },
      { label: "HSVA", value: color.hsva },
      { label: "RGB", value: color.rgb },
      { label: "RGBA", value: color.rgba },
    ];
  };

  const copyToClipboard = (color: string) => {
    Clipboard.setStringAsync(color);
    Toast.show({
      type: "info",
      text1: trad[lang].paletteDetails.copied,
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 60,
    });
  };
  return (
    <View style={styles.listContainer}>
      <Text style={styles.info}>
        {trad[lang].paletteDetails.copyToClipboard}
      </Text>

      <FlatList
        data={colors}
        renderItem={({ item, index }) => (
          <View key={index}>
            <View
              style={{
                backgroundColor: item.hex,
                width: "100%",
                height: 64,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <Dropdown
                style={{
                  height: 40,
                  width: "55%",
                  borderRadius: 8,
                  paddingHorizontal: 16,
                  backgroundColor: item.hex,
                }}
                data={getColorOptions(item)}
                iconColor={determineTextColor(item.rgb)}
                placeholder={trad[lang].paletteDetails.dropDown}
                placeholderStyle={[
                  styles.fontSize,
                  { color: determineTextColor(item.rgb) },
                ]}
                containerStyle={styles.dropdownContainer}
                itemTextStyle={[
                  styles.fontSize,
                  { color: determineTextColor(item.rgb) },
                ]}
                selectedTextStyle={[
                  styles.fontSize,
                  { color: determineTextColor(item.rgb) },
                ]}
                activeColor={COLORS.LMNT}
                labelField="label"
                valueField="value"
                onChange={(item) => {
                  copyToClipboard(item.value);
                }}
              />
            </View>
          </View>
        )}
        keyExtractor={(item) => item.hex}
      />
    </View>
  );
};

export default PaletteDetails;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: COLORS.BG,
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },

  dropdownContainer: { backgroundColor: COLORS.LMNT },

  fontSize: { fontSize: 14 },

  info: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 16,
    color: COLORS.TXT,
    fontStyle: "italic",
    textAlign: "center",
  },
});
