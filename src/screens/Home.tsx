import React from "react";
import HomeBtn from "../components/HomeBtn";
import { COLORS } from "../constants/Colors";
import { Button, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screensList = [
  {
    icon: "home",
    label: "Home",
    target: "Home",
  },
  {
    icon: "list",
    label: "Palettes list",
    target: "Palettes list",
  },
  {
    icon: "color-palette",
    label: "Palette creator",
    target: "Palette creator",
  },
  {
    icon: "contrast",
    label: "Contrast checker",
    target: "Contrast checker",
  },
  {
    icon: "color-filter",
    label: "Visualizer",
    target: "Visualizer",
  },
];

const Home = () => {
  const clearAsyncStorage = async () => {
    AsyncStorage.clear();
  };

  return (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        {screensList.map((screen, index) => {
          return (
            <HomeBtn
              key={index}
              icon={screen.icon}
              target={screen.target}
              label={screen.label}
            />
          );
        })}
      </View>

      <Button title="Clear AsyncStorage" onPress={clearAsyncStorage} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.BG,
    paddingHorizontal: 16,
  },

  btnContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 8,
  },
});
