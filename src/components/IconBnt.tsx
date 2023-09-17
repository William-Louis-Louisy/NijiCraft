import React from "react";
import { COLORS } from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { IIconBtn } from "../types/IconBtn.types";
import { Text, TouchableOpacity } from "react-native";

const IconBnt = ({
  icon,
  label,
  onClick,
  bgColor,
  size = 16,
  color = COLORS.TXT,
}: IIconBtn) => {
  return (
    <TouchableOpacity
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        backgroundColor: bgColor,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 6,
      }}
      onPress={() => onClick()}
    >
      <Ionicons name={icon as any} size={size} color={color} />
      <Text style={{ color: color, fontSize: size }}>{label}</Text>
    </TouchableOpacity>
  );
};

export default IconBnt;
