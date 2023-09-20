import { Text } from "react-native";
import React from "react";

const MockupParagraph = ({ mockup }) => {
  return (
    <Text
      style={{
        color: mockup.textColor,
        fontSize: 16,
        textAlign: "center",
        paddingHorizontal: 16,
        paddingVertical: 16,
      }}
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </Text>
  );
};

export default MockupParagraph;
