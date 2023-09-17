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
import { COLORS } from "../../constants/Colors";
import { Dropdown } from "react-native-element-dropdown";
import { elements } from "../../constants/MockupElements";
import { IColor, IPalette } from "../../types/Palette.types";

const VisualizerSetupModal = ({
  setModal,
  mockup,
  lang,
  palettes,
  selectedPalette,
  setSelectedPalette,
  setMockup,
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
          <Text style={styles.modalTitle}>
            {trad[lang].visualizer.modalTitle}
          </Text>
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
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => handlePaletteSelection(item)}
                    style={{
                      width: "100%",
                      marginBottom: 8,
                      ...(selectedPalette.id &&
                        selectedPalette.id === item.id && {
                          borderWidth: 1,
                          borderColor: COLORS.ACCENT,
                          paddingTop: 4,
                          borderTopLeftRadius: 6,
                          borderTopRightRadius: 6,
                        }),
                    }}
                  >
                    <Text style={{ color: COLORS.TXT }}>{item.name}</Text>
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
    alignItems: "center",
    width: "100%",
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.TXT,
  },

  modalTitle: {
    fontWeight: "bold",
    color: COLORS.TXT,
    textAlign: "center",
    paddingBottom: 16,
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
});
