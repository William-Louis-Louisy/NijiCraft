import React from "react";
import "react-native-gesture-handler";
import Routes from "./src/routes/Routes";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import AppProvider from "./src/contexts/AppContext";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppProvider>
        <StatusBar style="light" />
        <NavigationContainer theme={MyTheme}>
          <Routes />
        </NavigationContainer>
        <Toast />
      </AppProvider>
    </SafeAreaView>
  );
}
