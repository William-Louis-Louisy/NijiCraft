import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { trad } from "../lang/traduction";
import HomeBtn from "../components/HomeBtn";
import { COLORS } from "../constants/Colors";
import { AppContext } from "../contexts/AppContext";
import { screensList } from "../constants/ScreensList";

const Home = ({ navigation: { navigate } }) => {
  const { lang } = React.useContext(AppContext);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Main Banner */}
      <View
        style={{
          width: "100%",
          alignItems: "flex-start",
          paddingVertical: 40,
          paddingHorizontal: 16,
          gap: 16,
        }}
      >
        <View style={{ width: "100%", alignItems: "center", marginBottom: 12 }}>
          <Image
            source={require("../assets/logo-nijicraft.png")}
            style={{ width: 128, height: 64 }}
          />
        </View>

        <Text
          style={{ fontSize: 28, fontWeight: "bold", color: COLORS.ACCENT }}
        >
          {trad[lang].home.title}
        </Text>
        <Text
          style={{ fontWeight: "bold", fontSize: 18, color: COLORS.ACCENT }}
        >
          {trad[lang].home.subtitle}
        </Text>

        {/* Buttons */}
        <View style={{ marginTop: 24 }}>
          {screensList.map((screen, index) => {
            return (
              <View key={index} style={styles.btnBlock}>
                <View style={styles.btnContainer}>
                  <HomeBtn
                    icon={screen.icon}
                    target={screen.target}
                    label={screen.label}
                  />
                  <Text style={styles.btnTitle}>
                    {trad[lang].home[screen.tradKey].title}
                  </Text>
                </View>
                <Text style={styles.description}>
                  {trad[lang].home[screen.tradKey].description}
                </Text>
              </View>
            );
          })}
        </View>
        {/* FOOTER */}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigate("AboutUs", {})}>
          <Text
            style={{ color: COLORS.TXT, fontSize: 12, fontStyle: "italic" }}
          >
            © 2023 221B-BakerScript.
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BG,
  },

  btnBlock: {
    width: "100%",
    gap: 4,
    paddingVertical: 16,
  },

  btnContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  btnTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.ACCENT,
  },

  description: {
    color: COLORS.TXT,
  },

  footer: {
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: COLORS.LMNT,
  },
});
