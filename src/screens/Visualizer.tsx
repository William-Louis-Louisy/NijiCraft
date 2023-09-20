import IconBnt from "../components/IconBnt";
import { COLORS } from "../constants/Colors";
import { View, StyleSheet } from "react-native";
import { IPalette } from "../types/Palette.types";
import { AppContext } from "../contexts/AppContext";
import Mockup from "../components/visualizer/Mockup";
import { useFocusEffect } from "@react-navigation/native";
import { useState, useContext, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import VisualizerSetupModal from "../components/visualizer/VisualizerSetupModal";

const Visualizer = ({ navigation }) => {
  const { lang } = useContext(AppContext);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [userPalettes, setUserPalettes] = useState<IPalette[]>();
  const [selectedPalette, setSelectedPalette] = useState<IPalette>({
    id: "",
    name: "",
    colors: [],
  });
  const [mockup, setMockup] = useState({
    bgColor: COLORS.BG,
    headerColor: COLORS.LMNT,
    textColor: COLORS.TXT,
    btnBgColor: COLORS.LMNT,
    btnTxtColor: COLORS.TXT,
    outlineBtnColor: COLORS.TXT,
    inputBgColor: COLORS.BG,
    inputTxtColor: COLORS.TXT,
    inputBorderColor: COLORS.TXT,
    cardBgColor: COLORS.LMNT,
    cardTxtColor: COLORS.TXT,
    cardAccentColor: COLORS.ACCENT,
    cardSecondaryColor: COLORS.BG,
  });

  const handleModal = () => {
    setIsModalVisible((prevState) => !prevState);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconBnt
          icon={"options-sharp"}
          size={24}
          onClick={handleModal}
          color={mockup.textColor}
        />
      ),
    });
  }, [navigation, mockup]);

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: mockup.headerColor,
      },
      headerTitleStyle: { color: mockup.textColor },
    });
  }, [mockup]);

  const getUserPalettes = async () => {
    try {
      const palettes = await AsyncStorage.getItem("palettes");
      if (palettes) {
        const retrievedPalettes = JSON.parse(palettes);
        if (
          JSON.stringify(retrievedPalettes) !== JSON.stringify(userPalettes)
        ) {
          setUserPalettes(retrievedPalettes);
        }
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des palettes :", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUserPalettes();
    }, [])
  );

  return (
    <View style={[styles.container, { backgroundColor: mockup.bgColor }]}>
      <Mockup mockup={mockup} />

      {isModalVisible && (
        <VisualizerSetupModal
          lang={lang}
          mockup={mockup}
          setMockup={setMockup}
          palettes={userPalettes}
          setModal={setIsModalVisible}
          selectedPalette={selectedPalette}
          setSelectedPalette={setSelectedPalette}
        />
      )}
    </View>
  );
};

export default Visualizer;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    position: "relative",
    alignItems: "center",
  },
});
