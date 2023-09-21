import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const MockupButtons = ({ mockup }) => {
  return (
    <View
      style={{
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        gap: 16,
      }}
    >
      <View style={[styles.button, { backgroundColor: mockup.btnBgColor }]}>
        <Text style={{ color: mockup.btnTxtColor }}>Button</Text>
      </View>
      <View
        style={[
          styles.button,
          { borderWidth: 1, borderColor: mockup.outlineBtnColor },
        ]}
      >
        <Text style={{ color: mockup.outlineBtnColor }}>Button</Text>
      </View>
      <View style={[styles.button, { backgroundColor: mockup.btnBgColor }]}>
        <Ionicons name="add-outline" size={18} color={mockup.btnTxtColor} />
        <Text style={{ color: mockup.btnTxtColor }}>Button</Text>
      </View>
      <View style={[styles.button, { backgroundColor: mockup.btnBgColor }]}>
        <Ionicons name="add-outline" size={18} color={mockup.btnTxtColor} />
      </View>
    </View>
  );
};

export default MockupButtons;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 6,
    gap: 8,
  },
});
