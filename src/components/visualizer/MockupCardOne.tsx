import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const MockupCardOne = ({ mockup }) => {
  return (
    <View style={[styles.card1, { backgroundColor: mockup.cardBgColor }]}>
      <Image
        style={styles.image}
        source={require("../../assets/unsplash/simone-mascellari-SKnfgtlnsdU-unsplash.jpg")}
      />
      <View
        style={[styles.cardOverlay, { backgroundColor: mockup.cardBgColor }]}
      >
        <Text
          style={{
            color: mockup.cardTxtColor,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Lorem ipsum
        </Text>
      </View>
    </View>
  );
};

export default MockupCardOne;

const styles = StyleSheet.create({
  card1: {
    height: 160,
    width: 120,
    borderRadius: 6,
    marginLeft: 16,
  },

  cardOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 48,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    objectFit: "cover",
    height: "100%",
    width: "100%",
    borderRadius: 6,
  },
});
