import React from "react";
import { COLORS } from "../../constants/Colors";
import { IBtnGroup } from "../../types/BtnGroup.types";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const ConstrastBtnGroup: React.FC<IBtnGroup> = ({ type, setType }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setType("picker")}
        style={[styles.btnLeft, type === "picker" ? styles.activeBtn : {}]}
      >
        <Text
          style={[styles.label, type === "picker" ? styles.activeLabel : {}]}
        >
          Picker
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setType("rgba")}
        style={[styles.btn, type === "rgba" ? styles.activeBtn : {}]}
      >
        <Text style={[styles.label, type === "rgba" ? styles.activeLabel : {}]}>
          RGBA
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setType("hsva")}
        style={[styles.btn, type === "hsva" ? styles.activeBtn : {}]}
      >
        <Text style={[styles.label, type === "hsva" ? styles.activeLabel : {}]}>
          HSVA
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setType("palettes")}
        style={[styles.btnRight, type === "palettes" ? styles.activeBtn : {}]}
      >
        <Text
          style={[styles.label, type === "palettes" ? styles.activeLabel : {}]}
        >
          Palettes
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConstrastBtnGroup;

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
