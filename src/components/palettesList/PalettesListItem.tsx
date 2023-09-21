import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/Colors";
import { IPalette } from "../../types/Palette.types";
import { ISelectedPalette } from "../../screens/PalettesList";
import React, { FC, Dispatch, SetStateAction, useRef } from "react";

interface IPalettesListItemProps {
  palette: IPalette;
  navigate: (route: string, params?: any) => void;
  setModal: Dispatch<SetStateAction<boolean>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  selectedPalette: ISelectedPalette;
  handleDropdown: (palette: IPalette) => void;
}

const PalettesListItem: FC<IPalettesListItemProps> = ({
  palette,
  isOpen,
  selectedPalette,
  navigate,
  setModal,
  setIsOpen,
  handleDropdown,
}) => {
  const dropdownRef = useRef(null);

  // Hanndle click outside dropdown
  const handleClickOutside = () => {
    setIsOpen(false);
  };

  return (
    <TouchableWithoutFeedback onPress={handleClickOutside}>
      <View key={palette.id} style={styles.paletteContainer}>
        <View style={styles.header}>
          <Text style={styles.paletteName}>{palette.name}</Text>

          {isOpen && selectedPalette.id === palette.id ? (
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View
                ref={dropdownRef}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <TouchableOpacity
                  style={styles.action}
                  onPress={() => {
                    navigate("PaletteCreator", {
                      paletteToEdit: palette,
                    });
                    setIsOpen(false);
                  }}
                >
                  <Ionicons name="create" size={20} color={COLORS.TXT} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.action}
                  onPress={() => {
                    setModal(true);
                    setIsOpen(false);
                  }}
                >
                  <Ionicons name="trash" size={20} color={COLORS.WARNING} />
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableOpacity
              onPress={() => handleDropdown(palette)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="ellipsis-vertical" size={20} color={COLORS.TXT} />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          onPress={() =>
            navigate("PaletteDetails", {
              palette: palette,
              paletteName: palette.name,
            })
          }
          style={styles.colorsContainer}
        >
          {palette.colors.map((color, index) => {
            const colorWidth = 100 / palette.colors.length;
            return (
              <View
                key={index}
                style={{
                  backgroundColor: color.hex,
                  width: `${colorWidth}%`,
                  height: 32,
                }}
              />
            );
          })}
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PalettesListItem;

const styles = StyleSheet.create({
  paletteContainer: {
    width: "100%",
    backgroundColor: COLORS.LMNT,
    display: "flex",
    flexDirection: "column",
    marginBottom: 16,
  },

  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },

  paletteName: {
    fontWeight: "bold",
    color: COLORS.TXT,
  },

  colorsContainer: {
    width: "100%",
    height: 32,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  action: {
    backgroundColor: COLORS.BG,
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
