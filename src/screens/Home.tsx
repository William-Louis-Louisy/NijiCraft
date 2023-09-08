import React from "react";
import HomeBtn from "../components/HomeBtn";
import { COLORS } from "../constants/Colors";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { trad } from "../lang/traduction";
import { AppContext } from "../contexts/AppContext";

const screensList = [
  {
    icon: "color-palette",
    label: "Palette creator",
    target: "Palette creator",
    tradKey: "create",
  },
  {
    icon: "list",
    label: "Palettes list",
    target: "Palettes list",
    tradKey: "list",
  },
  {
    icon: "contrast",
    label: "Contrast checker",
    target: "Contrast checker",
    tradKey: "contrast",
  },
  {
    icon: "color-filter",
    label: "Visualizer",
    target: "Visualizer",
    tradKey: "visualizer",
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
          backgroundColor: COLORS.ACCENT,
          gap: 16,
        }}
      >
        <Text style={{ fontSize: 28, fontWeight: "bold", color: COLORS.LMNT }}>
          {trad[lang].home.title}
        </Text>
        <Text style={{ fontWeight: "bold", fontSize: 18, color: COLORS.BG }}>
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
                <Text>{trad[lang].home[screen.tradKey].description}</Text>
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
    color: COLORS.LMNT,
  },
});
