import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const MockupCardThree = ({ mockup }) => {
  return (
    <View style={[styles.card3, { backgroundColor: mockup.cardBgColor }]}>
      <View
        style={{
          width: 96,
          borderRadius: 6,
        }}
      >
        <Image
          style={{
            height: "100%",
            width: "100%",
            borderRadius: 6,
          }}
          source={require("../../assets/unsplash/tyler-nix-PQeoQdkU9jQ-unsplash.jpg")}
        />
      </View>

      <View
        style={{
          width: "100%",
          height: "100%",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={{ color: mockup.cardTxtColor, fontWeight: "bold" }}>
            Marcus Davis
          </Text>
          <Text style={{ color: mockup.cardTxtColor, fontSize: 12 }}>
            Senior Journalist
          </Text>
        </View>

        <View
          style={{
            borderRadius: 6,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: mockup.cardSecondaryColor,
            padding: 4,
          }}
        >
          <View style={{ padding: 4 }}>
            <Text style={{ color: mockup.cardTxtColor, fontSize: 12 }}>
              Articles
            </Text>
            <Text
              style={{
                color: mockup.cardAccentColor,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              77
            </Text>
          </View>
          <View style={{ padding: 4 }}>
            <Text style={{ color: mockup.cardTxtColor, fontSize: 12 }}>
              Followers
            </Text>
            <Text
              style={{
                color: mockup.cardAccentColor,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              972
            </Text>
          </View>
          <View style={{ padding: 4 }}>
            <Text style={{ color: mockup.cardTxtColor, fontSize: 12 }}>
              Rating
            </Text>
            <Text
              style={{
                color: mockup.cardAccentColor,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              9.6
            </Text>
          </View>
        </View>

        <View
          style={{
            width: "60%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 24,
            paddingHorizontal: 8,
          }}
        >
          <Ionicons name="chatbox" size={20} color={mockup.cardTxtColor} />
          <Ionicons name="heart" size={20} color={mockup.cardTxtColor} />
        </View>
      </View>
    </View>
  );
};

export default MockupCardThree;

const styles = StyleSheet.create({
  card3: {
    height: 160,
    width: Dimensions.get("window").width * 0.85,
    borderRadius: 6,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    marginRight: 16,
  },
});
