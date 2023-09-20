import React from "react";
import { trad } from "../lang/traduction";
import HomeBtn from "../components/HomeBtn";
import { COLORS } from "../constants/Colors";
import { AppContext } from "../contexts/AppContext";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";

const screensList = [
  {
    icon: "color-palette",
    label: "Palette creator",
    target: "PaletteCreator",
    tradKey: "create",
    image: require("../assets/shots/creat_fr.png"),
  },
  {
    icon: "list",
    label: "Palettes list",
    target: "PalettesList",
    tradKey: "list",
    image: require("../assets/shots/list_fr.png"),
  },
  {
    icon: "contrast",
    label: "Contrast checker",
    target: "ContrastChecker",
    tradKey: "contrast",
    image: require("../assets/shots/checker_fr.png"),
  },
  {
    icon: "color-filter",
    label: "Visualizer",
    target: "Visualizer",
    tradKey: "visualizer",
    image: require("../assets/shots/visu_fr.png"),
  },
];

const Home = () => {
  const { lang } = React.useContext(AppContext);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: "center",
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
});
