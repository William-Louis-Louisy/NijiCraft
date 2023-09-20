import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { trad } from "../../lang/traduction";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/Colors";
import { Dropdown } from "react-native-element-dropdown";
import { elements } from "../../constants/MockupElements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IColor, IPalette } from "../../types/Palette.types";

const VisualizerSetupModal = ({
  lang,
  mockup,
  setModal,
  palettes,
  setMockup,
  selectedPalette,
  setSelectedPalette,
}) => {
  const [section, setSection] = useState("palettes");

  const handlePaletteSelection = async (palette: IPalette) => {
    setSelectedPalette(palette);
    setSection("setup");
  };

  return (
    <>
      <View
        style={styles.pickerOverlay}
        onStartShouldSetResponder={() => true}
        onResponderRelease={() => setModal(false)}
      />
      <View style={styles.pickerContainer}>
        {/* HEADER */}
        <View style={styles.modalHeader}>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={{
                paddingVertical: 6,
                paddingHorizontal: 8,
                borderWidth: 1,
                borderColor:
                  section === "palettes" ? COLORS.ACCENT : COLORS.TXT,
                backgroundColor:
                  section === "palettes" ? COLORS.ACCENT : COLORS.LMNT,
                borderTopLeftRadius: 6,
                borderBottomLeftRadius: 6,
              }}
              onPress={() => setSection("palettes")}
            >
              <MaterialCommunityIcons
                name="palette-swatch-outline"
                size={20}
                color={section === "palettes" ? COLORS.BG : COLORS.TXT}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: 6,
                paddingHorizontal: 8,
                borderWidth: 1,
                borderColor: section === "setup" ? COLORS.ACCENT : COLORS.TXT,
                backgroundColor:
                  section === "setup" ? COLORS.ACCENT : COLORS.LMNT,
                marginLeft: -1,
                borderTopRightRadius: 6,
                borderBottomRightRadius: 6,
              }}
              onPress={() => setSection("setup")}
            >
              <MaterialCommunityIcons
                name="brush"
                size={20}
                color={section === "setup" ? COLORS.BG : COLORS.TXT}
              />
            </TouchableOpacity>
          </View>

          {/* CLOSE MODAL BUTTON */}
          <MaterialCommunityIcons
            name="close"
            size={20}
            color={COLORS.TXT}
            style={{ marginBottom: 16, marginRight: 16 }}
            onPress={() => setModal(false)}
          />
        </View>

        {/* CONTENT */}
        <View style={styles.modalContent}>
          {section === "palettes" && (
            <>
              <Text style={styles.sectionTitle}>
                {trad[lang].visualizer.selectPalette}
              </Text>
              {/* PALETTES LIST */}
              <FlatList
                data={palettes}
                style={{ marginBottom: 16 }}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handlePaletteSelection(item)}
                    style={{
                      width: "100%",
                      marginBottom: 8,
                      padding: 8,
                      backgroundColor: COLORS.BG,
                      borderRadius: 6,
                      ...(selectedPalette.id &&
                        selectedPalette.id === item.id && {
                          backgroundColor: COLORS.GOOD,
                        }),
                    }}
                  >
                    <View style={styles.paletteHead}>
                      <Text style={styles.label}>{item.name}</Text>

                      {selectedPalette.id === item.id && (
                        <Ionicons
                          name="ios-checkmark-done-sharp"
                          size={16}
                          color={COLORS.TXT}
                        />
                      )}
                    </View>

                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      {item.colors.map((color: IColor, index: number) => {
                        const colorWidth = 100 / item.colors.length;
                        return (
                          <View
                            key={`${color.hex}-color-${item}`}
                            style={{
                              backgroundColor: color.hex,
                              height: 32,
                              width: `${colorWidth}%`,
                            }}
                          />
                        );
                      })}
                    </View>
                  </TouchableOpacity>
                )}
              />
            </>
          )}

          {section === "setup" && (
            <>
              <Text style={styles.sectionTitle}>
                {trad[lang].visualizer.applyColors}
              </Text>
              <FlatList
                data={elements}
                style={{
                  width: "100%",
                  height: Dimensions.get("window").height * 0.35,
                }}
                keyExtractor={(item) => item.name}
                renderItem={({ item, index }) => (
                  <View key={index}>
                    <Text style={{ color: COLORS.TXT }}>
                      {trad[lang].visualizer[item.tradKey]}
                    </Text>
                    <Dropdown
                      style={{
                        height: 40,
                        width: "100%",
                        borderRadius: 8,
                        borderWidth: 0.5,
                        borderColor: COLORS.TXT,
                        paddingHorizontal: 16,
                        marginBottom: 16,
                      }}
                      data={selectedPalette.colors}
                      iconColor={COLORS.TXT}
                      placeholder={trad[lang].visualizer.selectColor}
                      placeholderStyle={{ color: COLORS.TXT }}
                      containerStyle={styles.dropdownContainer}
                      dropdownPosition="auto"
                      labelField={"hex"}
                      valueField={"hex"}
                      selectedTextStyle={{ color: COLORS.ACCENT }}
                      activeColor={COLORS.BG}
                      onChange={(dropdownItem) => {
                        setMockup({
                          ...mockup,
                          [item.name]: dropdownItem.hex,
                        });
                      }}
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
                    />
                  </View>
                )}
              />
            </>
          )}
        </View>
      </View>
    </>
  );
};

export default VisualizerSetupModal;

const styles = StyleSheet.create({
  pickerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
  },

  pickerContainer: {
    width: "100%",
    maxHeight: Dimensions.get("window").height * 0.65,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 24,
    backgroundColor: COLORS.LMNT,
    position: "absolute",
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.TXT,
  },

  modalContent: {
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  sectionTitle: {
    color: COLORS.TXT,
    marginBottom: 16,
    fontWeight: "bold",
  },

  dropdownContainer: {
    backgroundColor: COLORS.LMNT,
    borderWidth: 0.5,
    borderColor: COLORS.TXT,
    borderRadius: 8,
    marginBottom: 16,
  },

  label: {
    color: COLORS.TXT,
    paddingVertical: 4,
  },

  paletteHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  buttonGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    marginLeft: 16,
  },
});
