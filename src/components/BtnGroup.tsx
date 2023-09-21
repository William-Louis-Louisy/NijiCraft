import React from "react";
import { COLORS } from "../constants/Colors";
import { IBtnGroup } from "../types/BtnGroup.types";
import { StyleSheet, View } from "react-native";
import PickerButton from "./PickerButton";

const BtnGroup = ({ type, setType }: IBtnGroup) => {
  return (
    <View style={styles.container}>
      <PickerButton
        type="picker"
        currentType={type}
        setType={setType}
        label="Picker"
        position="left"
      />
      <PickerButton
        type="hex"
        currentType={type}
        setType={setType}
        label="HEX"
        position="middle"
      />
      <PickerButton
        type="rgba"
        currentType={type}
        setType={setType}
        label="RGBA"
        position="middle"
      />
      <PickerButton
        type="hsva"
        currentType={type}
        setType={setType}
        label="HSVA"
        position="middle"
      />
      <PickerButton
        type="harmonies"
        currentType={type}
        setType={setType}
        label="Harms"
        position="right"
      />
    </View>
  );
};

export default BtnGroup;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 6,
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.5)",
    marginBottom: 24,
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

  label: {
    fontSize: 12,
    color: COLORS.TXT,
  },

  activeLabel: {
    fontSize: 12,
    color: COLORS.BG,
  },

  activeBtn: {
    backgroundColor: COLORS.ACCENT,
    borderColor: COLORS.ACCENT,
  },
});
