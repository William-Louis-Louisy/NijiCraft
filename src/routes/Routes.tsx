import React from "react";
import Home from "../screens/Home";
import { Ionicons } from "@expo/vector-icons";
import Visualizer from "../screens/Visualizer";
import PalettesList from "../screens/PalettesList";
import PaletteCreator from "../screens/PaletteCreator";
import ContrastChecker from "../screens/ContrastChecker";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { COLORS } from "../constants/Colors";

const Tab = createBottomTabNavigator();

function Routes() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Palettes list") {
            iconName = focused ? "list" : "list-outline";
          } else if (route.name === "Palette creator") {
            iconName = focused ? "color-palette" : "color-palette-outline";
          } else if (route.name === "Contrast checker") {
            iconName = focused ? "contrast" : "contrast-outline";
          } else if (route.name === "Visualizer") {
            iconName = focused ? "color-filter" : "color-filter-outline";
          }
          return (
            <Ionicons
              name={iconName}
              size={24}
              color={focused ? COLORS.ACCENT : COLORS.TXT}
            />
          );
        },
        tabBarStyle: { backgroundColor: COLORS.LMNT },
        headerStyle: { backgroundColor: COLORS.LMNT },
        headerTitleStyle: { color: COLORS.TXT },
        tabBarActiveTintColor: COLORS.ACCENT,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Palettes list" component={PalettesList} />
      <Tab.Screen name="Palette creator" component={PaletteCreator} />
      <Tab.Screen name="Contrast checker" component={ContrastChecker} />
      <Tab.Screen name="Visualizer" component={Visualizer} />
    </Tab.Navigator>
  );
}

export default Routes;
