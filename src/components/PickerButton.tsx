import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../constants/Colors";

interface PickerButtonProps {
  type: string;
  currentType: string;
  setType: (type: string) => void;
  label: string;
  position?: "left" | "middle" | "right";
}

const PickerButton: React.FC<PickerButtonProps> = ({
  type,
  currentType,
  setType,
  label,
  position,
}) => {
  const isSelected = currentType === type;

  const getButtonStyle = () => {
    if (position === "left") return styles.btnLeft;
    if (position === "right") return styles.btnRight;
    return styles.btn;
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), isSelected ? styles.btnSelected : null]}
      onPress={() => setType(type)}
    >
      <Text
        style={[styles.btnText, isSelected ? styles.btnTextSelected : null]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default PickerButton;

const styles = StyleSheet.create({
  btn: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.TXT,
    backgroundColor: COLORS.LMNT,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: -1,
  },

  btnText: {
    fontSize: 12,
    color: COLORS.TXT,
  },

  btnTextSelected: {
    fontSize: 12,
    color: COLORS.BG,
  },

  btnSelected: {
    backgroundColor: COLORS.ACCENT,
    borderColor: COLORS.ACCENT,
  },
  btnLeft: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.TXT,
    backgroundColor: COLORS.LMNT,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  btnRight: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.TXT,
    backgroundColor: COLORS.LMNT,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: -1,
  },
});
