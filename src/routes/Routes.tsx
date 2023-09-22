import Home from "../screens/Home";
import { Modal } from "react-native";
import { trad } from "../lang/traduction";
import React, { useContext } from "react";
import IconBnt from "../components/IconBnt";
import { COLORS } from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import Settings from "../components/Settings";
import Visualizer from "../screens/Visualizer";
import PalettesList from "../screens/PalettesList";
import { AppContext } from "../contexts/AppContext";
import PaletteCreator from "../screens/PaletteCreator";
import PaletteDetails from "../screens/PaletteDetails";
import ContrastChecker from "../screens/ContrastChecker";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AboutUs from "../screens/AboutUs";
import ClearDataModal from "../components/ClearDataModal";

const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();

interface VisualizerRouteParams {
  handleModal: () => void;
}

function Routes() {
  const { lang } = useContext(AppContext);
  return (
    <MainStack.Navigator
      initialRouteName="Tabs"
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.LMNT },
        headerTitleStyle: { color: COLORS.TXT },
        headerTitleAlign: "center" as "center" | "left",
        headerBackImage: () => (
          <Ionicons
            name="chevron-back-outline"
            size={24}
            color={COLORS.TXT}
            style={{ marginLeft: 8 }}
          />
        ),
      }}
    >
      <MainStack.Screen
        name="Tabs"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="PaletteDetails"
        component={PaletteDetails}
        options={({ route }: any) => ({ title: route.params.paletteName })}
      />
      <MainStack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{
          headerTitle: trad[lang].aboutUs.title,
          headerTitleStyle: { fontSize: 16, color: COLORS.TXT },
        }}
      />
    </MainStack.Navigator>
  );
}

function BottomTabs() {
  const { lang } = useContext(AppContext);
  const [settingsModal, setSettingsModal] = React.useState(false);
  const [clearDataModal, setClearDataModal] = React.useState(false);

  const handleClearDataModal = () => {
    setSettingsModal(false);
    setClearDataModal(true);
  };

  const screenOptions = ({ route }) => {
    return {
      tabBarIcon: ({ focused, color, size }) => {
        let iconName = "";
        if (route.name === "Home") {
          iconName = focused ? "home" : "home-outline";
        } else if (route.name === "PalettesList") {
          iconName = focused ? "list" : "list-outline";
        } else if (route.name === "PaletteCreator") {
          iconName = focused ? "color-palette" : "color-palette-outline";
        } else if (route.name === "ContrastChecker") {
          iconName = focused ? "contrast" : "contrast-outline";
        } else if (route.name === "Visualizer") {
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

      tabBarStyle: { backgroundColor: COLORS.LMNT, borderColor: COLORS.LMNT },
      headerStyle: {
        backgroundColor: COLORS.LMNT,
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTitleStyle: { color: COLORS.TXT },
      tabBarActiveTintColor: COLORS.ACCENT,
      headerTitleAlign: "center" as "center" | "left",
      tabBarShowLabel: false,
      tabBarHideOnKeyboard: true,
    };
  };

  return (
    <>
      <Tab.Navigator initialRouteName="Home" screenOptions={screenOptions}>
        <Tab.Screen
          name="Home"
          options={{
            headerTitle: trad[lang].screens.home,
            headerRight: () => (
              <IconBnt
                icon={"settings"}
                size={20}
                onClick={() => setSettingsModal(true)}
              />
            ),
          }}
          component={Home}
        />
        <Tab.Screen
          name="PalettesList"
          options={{ headerTitle: trad[lang].screens.palettesList }}
          component={PalettesList}
        />
        <Tab.Screen
          name="PaletteCreator"
          options={{ headerTitle: trad[lang].screens.paletteCreator }}
          component={PaletteCreator}
        />
        <Tab.Screen
          name="ContrastChecker"
          options={{ headerTitle: trad[lang].screens.contrastChecker }}
          component={ContrastChecker}
        />
        <Tab.Screen
          name="Visualizer"
          options={{ headerTitle: trad[lang].screens.visualizer }}
          component={Visualizer}
        />
      </Tab.Navigator>

      {settingsModal && (
        <Settings
          setModalVisible={setSettingsModal}
          clearData={handleClearDataModal}
        />
      )}

      {clearDataModal && (
        <ClearDataModal setModalVisible={setClearDataModal} lang={lang} />
      )}
    </>
  );
}

export default Routes;
