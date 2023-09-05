import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppProvider from "./src/contexts/AppContext";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import Routes from "./src/routes/Routes";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};

export default function App() {
  return (
    <AppProvider>
      <StatusBar style="light" />
      <NavigationContainer theme={MyTheme}>
        <Routes />
      </NavigationContainer>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
