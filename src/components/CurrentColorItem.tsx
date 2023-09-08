import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { determineTextColor } from "../utils/PaletteFunctions";
import { ICurrentColorItemProps } from "../types/Palette.types";

const CurrentColorItem = ({ selectedColor }: ICurrentColorItemProps) => {
  return (
    <View
      style={{
        backgroundColor: selectedColor.hex,
        height: 64,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
      }}
    >
      <Text
        style={{
          color: determineTextColor(selectedColor.rgba),
          fontSize: 16,
          fontWeight: "bold",
        }}
      >
        {selectedColor.hex.toUpperCase()}
      </Text>

      <Ionicons
        name="ellipse"
        size={16}
        color={determineTextColor(selectedColor.rgba)}
      />
    </View>
  );
};

export default CurrentColorItem;
