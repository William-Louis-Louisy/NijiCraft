import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";

const MockupInput = ({ mockup }) => {
  return (
    <View
      style={{ width: "100%", paddingHorizontal: 16, position: "relative" }}
    >
      <TextInput
        style={{
          width: "100%",
          height: 40,
          backgroundColor: mockup.inputBgColor,
          color: mockup.inputTxtColor,
          paddingHorizontal: 16,
          borderRadius: 8,
          borderWidth: 0.5,
          borderColor: mockup.inputBorderColor,
        }}
        placeholder="Lorem ipsum"
        placeholderTextColor={mockup.inputTxtColor}
      />
      <View
        style={{
          position: "absolute",
          backgroundColor: mockup.btnBgColor,
          right: 15,
          paddingHorizontal: 12,
          top: 0,
          bottom: 0,
          alignItems: "center",
          justifyContent: "center",
          borderTopRightRadius: 8,
          borderBottomRightRadius: 8,
          borderWidth: 0.5,
          borderColor: mockup.inputBorderColor,
        }}
      >
        <Ionicons name="search-sharp" size={24} color={mockup.btnTxtColor} />
      </View>
    </View>
  );
};

export default MockupInput;
