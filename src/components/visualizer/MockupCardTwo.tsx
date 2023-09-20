import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const MockupCardTwo = ({ mockup }) => {
  return (
    <View style={[styles.card2, { backgroundColor: mockup.cardBgColor }]}>
      <Image
        style={styles.image2}
        source={require("../../assets/unsplash/sonia-sanmartin-noNNvkquBZQ-unsplash.jpg")}
      />
      <View
        style={{
          width: "60%",
          height: "100%",
          padding: 16,
          justifyContent: "space-between",
        }}
      >
        <Ionicons
          name="play-circle-outline"
          size={32}
          color={mockup.cardAccentColor}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: mockup.cardTxtColor,
          }}
        >
          Maecenas sed erat
        </Text>
        <View
          style={{
            gap: 6,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Ionicons
            name="ios-eye-sharp"
            size={12}
            color={mockup.cardTxtColor}
          />
          <Text style={{ color: mockup.cardTxtColor, fontSize: 12 }}>
            80,989
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MockupCardTwo;

const styles = StyleSheet.create({
  card2: {
    height: 160,
    width: 240,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  image2: {
    height: "100%",
    width: "40%",
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
});
