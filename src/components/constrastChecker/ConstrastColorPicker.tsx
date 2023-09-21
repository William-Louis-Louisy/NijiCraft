import ColorPicker, {
  BlueSlider,
  BrightnessSlider,
  GreenSlider,
  HueSlider,
  OpacitySlider,
  Panel1,
  RedSlider,
  SaturationSlider,
} from "reanimated-color-picker";
import { trad } from "../../lang/traduction";
import { COLORS } from "../../constants/Colors";
import ConstrastBtnGroup from "./ConstrastBtnGroup";
import React, { useState, useCallback } from "react";
import { IPalette } from "../../types/Palette.types";
import { StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { IColorToCompare } from "../../screens/ContrastChecker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dropdown } from "react-native-element-dropdown";
import { getPalettes } from "../../utils/CRUD";

const ConstrastColorPicker: React.FC<{
  pickerMode: string;
  pickerType: string;
  onComplete: any;
  pickerRef: any;
  lang: string;
  colors: IColorToCompare;
  setPickerType: any;
  setColor: any;
}> = ({
  pickerMode,
  pickerType,
  pickerRef,
  lang,
  onComplete,
  colors,
  setPickerType,
  setColor,
}) => {
  const [palettesList, setPalettesList] = useState<IPalette[]>([]);
  // GET PALETTES FROM ASYNC STORAGE
  useFocusEffect(
    useCallback(() => {
      getPalettes(lang, palettesList, setPalettesList);
    }, [])
  );

  const handlePaletteColor = (color: string) => {
    if (pickerMode === "textColor") {
      setColor({ ...colors, textColor: color });
    } else {
      setColor({ ...colors, bgColor: color });
    }
  };

  return (
    <View style={styles.pickerContainer}>
      <Text
        style={{
          fontSize: 14,
          color: COLORS.TXT,
          fontWeight: "bold",
          marginBottom: 16,
        }}
      >
        {pickerMode === "textColor"
          ? trad[lang].constrastChecker.textColor
          : trad[lang].constrastChecker.backgroundColor}
      </Text>

      <ConstrastBtnGroup type={pickerType} setType={setPickerType} />

      <ColorPicker
        ref={pickerRef}
        thumbSize={22}
        boundedThumb={true}
        sliderThickness={12}
        style={{ width: "100%" }}
        onComplete={onComplete}
        thumbStyle={{ marginBottom: 8 }}
        value={pickerMode === "textColor" ? colors.textColor : colors.bgColor}
      >
        {pickerType === "picker" && (
          <>
            <Panel1 thumbSize={35} style={{ width: "100%", height: 128 }} />
            <View style={styles.slider}>
              <Text style={{ fontSize: 12, color: COLORS.TXT }}>HUE</Text>
              <HueSlider />
            </View>

            <View style={styles.slider}>
              <Text style={{ fontSize: 12, color: COLORS.TXT }}>
                {trad[lang].paletteCreator.opacity}
              </Text>
              <OpacitySlider />
            </View>
          </>
        )}

        {pickerType === "rgba" && (
          <>
            <View style={styles.slider}>
              <Text style={{ fontSize: 12, color: COLORS.TXT }}>
                {trad[lang].paletteCreator.red}
              </Text>
              <RedSlider />
            </View>
            <View style={styles.slider}>
              <Text style={{ fontSize: 12, color: COLORS.TXT }}>
                {trad[lang].paletteCreator.green}
              </Text>
              <GreenSlider />
            </View>
            <View style={styles.slider}>
              <Text style={{ fontSize: 12, color: COLORS.TXT }}>
                {trad[lang].paletteCreator.blue}
              </Text>
              <BlueSlider />
            </View>
            <View style={styles.slider}>
              <Text style={{ fontSize: 12, color: COLORS.TXT }}>
                {trad[lang].paletteCreator.opacity}
              </Text>
              <OpacitySlider />
            </View>
          </>
        )}

        {pickerType === "hsva" && (
          <>
            <View style={styles.slider}>
              <Text style={{ fontSize: 12, color: COLORS.TXT }}>
                {trad[lang].paletteCreator.hue}
              </Text>
              <HueSlider />
            </View>
            <View style={styles.slider}>
              <Text style={{ fontSize: 12, color: COLORS.TXT }}>
                {trad[lang].paletteCreator.saturation}
              </Text>
              <SaturationSlider />
            </View>
            <View style={styles.slider}>
              <Text style={{ fontSize: 12, color: COLORS.TXT }}>
                {trad[lang].paletteCreator.value}
              </Text>
              <BrightnessSlider />
            </View>
            <View style={styles.slider}>
              <Text style={{ fontSize: 12, color: COLORS.TXT }}>
                {trad[lang].paletteCreator.opacity}
              </Text>
              <OpacitySlider />
            </View>
          </>
        )}

        {pickerType === "palettes" && (
          <>
            {palettesList.map((palette: IPalette, index) => {
              return (
                <View
                  key={palette.id}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: COLORS.TXT,
                      fontWeight: "bold",
                      marginBottom: 12,
                    }}
                  >{`${index + 1}.`}</Text>
                  <Dropdown
                    style={{
                      height: 40,
                      width: "80%",
                      borderRadius: 8,
                      borderWidth: 0.5,
                      borderColor: COLORS.TXT,
                      paddingHorizontal: 16,
                      marginBottom: 16,
                    }}
                    data={palette.colors}
                    iconColor={COLORS.TXT}
                    placeholder={palette.name}
                    placeholderStyle={{ color: COLORS.TXT }}
                    containerStyle={styles.dropdownContainer}
                    dropdownPosition="top"
                    labelField={"hex"}
                    valueField={"hex"}
                    selectedTextStyle={{ color: COLORS.ACCENT }}
                    activeColor={COLORS.BG}
                    renderItem={(item) => (
                      <View
                        style={{
                          paddingHorizontal: 16,
                          paddingVertical: 12,
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          gap: 16,
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: item.hex,
                            borderWidth: 0.5,
                            borderColor: COLORS.TXT,
                            borderRadius: 20,
                            height: 20,
                            width: 20,
                          }}
                        />
                        <Text style={{ color: COLORS.TXT }}>{item.hex}</Text>
                      </View>
                    )}
                    onChange={(item) => {
                      handlePaletteColor(item.hex);
                    }}
                  />
                </View>
              );
            })}
          </>
        )}
      </ColorPicker>
    </View>
  );
};

export default ConstrastColorPicker;

const styles = StyleSheet.create({
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
  dropdownContainer: {
    backgroundColor: COLORS.LMNT,
    borderWidth: 0.5,
    borderColor: COLORS.TXT,
    borderRadius: 8,
    marginBottom: 16,
  },
});
