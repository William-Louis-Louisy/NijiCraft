import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import MockupTitle from "./MockupTitle";
import MockupParagraph from "./MockupParagraph";
import MockupInput from "./MockupInput";
import MockupButtons from "./MockupButtons";
import MockupCardOne from "./MockupCardOne";
import MockupCardTwo from "./MockupCardTwo";
import MockupCardThree from "./MockupCardThree";

const Mockup = ({ mockup }) => {
  return (
    <View style={[styles.container, { backgroundColor: mockup.bgColor }]}>
      {/* Title */}
      <MockupTitle mockup={mockup} />

      {/* Paragraph */}
      <MockupParagraph mockup={mockup} />

      {/* Text input */}
      <MockupInput mockup={mockup} />

      {/* Buttons */}
      <MockupButtons mockup={mockup} />

      {/* Cards slider */}
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: 16,
        }}
      >
        {/* Card 1 */}
        <MockupCardOne mockup={mockup} />

        {/* Card 2 */}
        <MockupCardTwo mockup={mockup} />

        {/* Card 3 */}
        <MockupCardThree mockup={mockup} />
      </ScrollView>
    </View>
  );
};

export default Mockup;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    position: "relative",
    alignItems: "center",
  },
});
