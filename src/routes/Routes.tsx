import React, { useContext } from "react";
import Home from "../screens/Home";
import { Ionicons } from "@expo/vector-icons";
import Visualizer from "../screens/Visualizer";
import PalettesList from "../screens/PalettesList";
import PaletteCreator from "../screens/PaletteCreator";
import ContrastChecker from "../screens/ContrastChecker";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { COLORS } from "../constants/Colors";
import IconBnt from "../components/IconBnt";
import { Modal } from "react-native";
import Settings from "../components/Settings";
import { AppContext } from "../contexts/AppContext";
import { trad } from "../lang/traduction";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const Tab = createBottomTabNavigator();

function Routes() {
  const { lang } = useContext(AppContext);
  const [modalVisible, setModalVisible] = React.useState(false);
  const singleTap = Gesture.Tap().onEnd((_event, success) => {
    if (success) {
      console.log("Single tap detected");
    }
  });

  return (
    <>
      <Tab.Navigator
        initialRouteName={trad[lang].screens.home}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = "";
            if (route.name === trad[lang].screens.home) {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === trad[lang].screens.palettesList) {
              iconName = focused ? "list" : "list-outline";
            } else if (route.name === trad[lang].screens.paletteCreator) {
              iconName = focused ? "color-palette" : "color-palette-outline";
            } else if (route.name === trad[lang].screens.contrastChecker) {
              iconName = focused ? "contrast" : "contrast-outline";
            } else if (route.name === trad[lang].screens.visualizer) {
              iconName = focused ? "color-filter" : "color-filter-outline";
            }
            return (
              <Ionicons
                name={iconName as any}
                size={24}
                color={focused ? COLORS.ACCENT : COLORS.TXT}
              />
            );
          },
          headerRight: () => (
            <IconBnt
              icon={"settings"}
              size={24}
              onClick={() => setModalVisible(true)}
            />
          ),

          tabBarStyle: { backgroundColor: COLORS.LMNT },
          headerStyle: { backgroundColor: COLORS.LMNT },
          headerTitleStyle: { color: COLORS.TXT },
          tabBarActiveTintColor: COLORS.ACCENT,
          headerTitleAlign: "center",
          tabBarShowLabel: false,
        })}
      >
        <Tab.Screen name={trad[lang].screens.home} component={Home} />
        <Tab.Screen
          name={trad[lang].screens.palettesList}
          component={PalettesList}
        />
        <Tab.Screen
          name={trad[lang].screens.paletteCreator}
          component={PaletteCreator}
        />
        <Tab.Screen
          name={trad[lang].screens.contrastChecker}
          component={ContrastChecker}
        />
        <Tab.Screen
          name={trad[lang].screens.visualizer}
          component={Visualizer}
        />
      </Tab.Navigator>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <Settings setModalVisible={setModalVisible} />
      </Modal>
    </>
  );
}

export default Routes;
