import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useContext } from "react";
import { trad } from "../lang/traduction";
import { COLORS } from "../constants/Colors";
import { AppContext } from "../contexts/AppContext";

const sections = ["intro", "background", "motivation", "offers", "thanks"];

const AboutUs = () => {
  const picSize = Dimensions.get("window").width / 3;
  const { lang } = useContext(AppContext);
  return (
    <ScrollView style={styles.container}>
      <Image
        style={{
          width: picSize,
          height: picSize,
          borderRadius: picSize,
          backgroundColor: COLORS.TXT,
          alignSelf: "center",
          marginTop: 24,
        }}
        source={require("../assets/unsplash/image.png")}
      />

      <View
        style={{
          marginBottom: 32,
        }}
      >
        {sections.map((section, index) => {
          return (
            <View key={index} style={{ padding: 16 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: COLORS.ACCENT,
                }}
              >
                {trad[lang].aboutUs[section].label}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  marginTop: 4,
                  color: COLORS.TXT,
                }}
              >
                {trad[lang].aboutUs[section].text}
              </Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BG,
  },
});
