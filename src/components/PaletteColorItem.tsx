import React from "react";
import { COLORS } from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { IPaletteColorItemProps } from "../types/PaletteColorItemProps.types";

const PaletteColorItem = ({
  color,
  onEdit,
  onDelete,
}: IPaletteColorItemProps) => {
  return (
    <View
      style={{
        backgroundColor: color,
        height: 64,
        width: "100%",
      }}
    >
      <View style={styles.container}>
        <Text style={styles.colorName}>{color}</Text>
        <View>
          <TouchableOpacity style={styles.btn} onPress={() => onEdit(color)}>
            <Ionicons name="create-outline" size={20} color={COLORS.TXT} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => onDelete(color)}>
            <Ionicons name="trash" size={20} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PaletteColorItem;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 16,
  },

  colorName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },

  btn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    backgroundColor: COLORS.LMNT,
  },
});
