import {
  Text,
  View,
  Modal,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import ColorPicker, {
  Panel1,
  HueSlider,
  RedSlider,
  BlueSlider,
  GreenSlider,
  OpacitySlider,
  SaturationSlider,
  BrightnessSlider,
} from "reanimated-color-picker";
import { trad } from "../lang/traduction";
import IconBnt from "../components/IconBnt";
import { COLORS } from "../constants/Colors";
import BtnGroup from "../components/BtnGroup";
import { getColorHarmonies } from "../utils/ColorHarmonies";
import {
  determineTextColor,
  hexToRgb,
  rgbToHsl,
  rgbToHsv,
} from "../utils/PaletteFunctions";
import { IPickerModalProps } from "../types/PickerModalProps.types";

const PickerModal = ({
  lang,
  addColor,
  pickerRef,
  pickerType,
  inputValue,
  modalVisible,
  setPickerType,
  onSelectColor,
  setInputValue,
  selectedColor,
  setModalVisible,
  setSelectedColor,
  selectedColorHex,
  setSelectedColorHex,
  handleHexInputEndEditing,
}: IPickerModalProps) => {
  const handleHarmonyColorClick = (color: string) => {
    setSelectedColorHex(color);

    const rgb = hexToRgb(color);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
    setSelectedColor({
      hex: color,
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      rgba: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`,
      hsl: `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(
        hsl.l
      )}%)`,
      hsla: `hsla(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(
        hsl.l
      )}%, 1)`,
      hsv: `hsv(${Math.round(hsv.h)}, ${Math.round(hsv.s)}%, ${Math.round(
        hsv.v
      )}%)`,
      hsva: `hsva(${Math.round(hsv.h)}, ${Math.round(hsv.s)}%, ${Math.round(
        hsv.v
      )}%, 1)`,
    });
    pickerRef.current.setColor(color);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      style={styles.modal}
    >
      <View style={styles.colorPicker}>
        <BtnGroup type={pickerType} setType={setPickerType} />
        <ColorPicker
          ref={pickerRef}
          style={{ width: "100%" }}
          value={selectedColorHex}
          onComplete={onSelectColor}
          sliderThickness={12}
          thumbSize={22}
          boundedThumb={true}
          thumbStyle={{ marginBottom: 8 }}
        >
          {pickerType === "picker" && (
            <>
              <Panel1 style={{ width: "100%", height: 128 }} />
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

          {pickerType === "hex" && (
            <>
              <Panel1 style={{ width: "100%", height: 128 }} />
              <View style={styles.slider}>
                <Text style={{ fontSize: 12, color: COLORS.TXT }}>
                  {trad[lang].paletteCreator.hue}
                </Text>
                <HueSlider />
              </View>
              <TextInput
                style={[styles.nameInput, { marginTop: 16 }]}
                value={inputValue}
                onChangeText={setInputValue}
                onEndEditing={handleHexInputEndEditing}
                maxLength={9} // #RRGGBBAA
                autoCapitalize="characters"
              />
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

          {pickerType === "harmonies" && (
            <>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                {getColorHarmonies(selectedColor).map((harmony, index) => {
                  return (
                    <TouchableOpacity
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onPress={() => handleHarmonyColorClick(harmony.hex)}
                      key={index}
                    >
                      <View
                        style={{
                          width: 96,
                          height: 40,
                          backgroundColor: harmony.color,
                          borderRadius: 6,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: "bold",
                            color: determineTextColor(harmony.rgb),
                          }}
                        >
                          {harmony.hex.toUpperCase()}
                        </Text>
                      </View>
                      <Text style={{ fontSize: 12, color: COLORS.TXT }}>
                        {trad[lang].paletteCreator[harmony.name]}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </>
          )}
        </ColorPicker>

        <View style={styles.buttonRow}>
          <IconBnt
            icon="add"
            label={trad[lang].paletteCreator.addColor}
            bgColor={COLORS.BG}
            onClick={() => addColor()}
          />
          <IconBnt
            icon="close"
            label={trad[lang].paletteCreator.close}
            bgColor={COLORS.BG}
            onClick={() => setModalVisible(false)}
          />
        </View>
      </View>
    </Modal>
  );
};

export default PickerModal;

const styles = StyleSheet.create({
  modal: {
    width: "100%",
    position: "relative",
  },

  colorPicker: {
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

  buttonRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 24,
    gap: 8,
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
