import React from "react";
import { Text } from "react-native";

const MockupTitle = ({ mockup }) => {
  return (
    <Text
      style={{
        color: mockup.textColor,
        fontSize: 24,
        marginTop: 24,
        fontWeight: "bold",
        textAlign: "center",
      }}
    >
      Lorem ipsum
    </Text>
  );
};

export default MockupTitle;
