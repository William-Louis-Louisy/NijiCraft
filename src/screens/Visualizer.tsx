import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { COLORS } from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { IPalette } from "../types/Palette.types";
import { AppContext } from "../contexts/AppContext";
import { useFocusEffect } from "@react-navigation/native";
import { useState, useContext, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import VisualizerSetupModal from "../components/visualizer/VisualizerSetupModal";
import IconBnt from "../components/IconBnt";

const Visualizer = ({ navigation }) => {
  const { lang } = useContext(AppContext);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [userPalettes, setUserPalettes] = useState();
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
  }, [navigation]);

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
      {/* Title */}
      <Text
        style={{
          color: mockup.textColor,
          fontSize: 24,
          marginTop: 24,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Lorem ipsum
      </Text>

      {/* Paragraph */}
      <Text
        style={{
          color: mockup.textColor,
          fontSize: 16,
          textAlign: "center",
          paddingHorizontal: 16,
          paddingVertical: 16,
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Text>

      {/* Text input */}
      <View
        style={{ width: "100%", paddingHorizontal: 16, position: "relative" }}
      >
        <TextInput
          style={{
            width: "100%",
            height: 40,
            backgroundColor: mockup.inputBgColor,
            color: mockup.inputTxtColor,
            paddingHorizontal: 16,
            borderRadius: 8,
            borderWidth: 0.5,
            borderColor: mockup.inputBorderColor,
          }}
          placeholder="Lorem ipsum"
          placeholderTextColor={mockup.inputTxtColor}
        />
        <View
          style={{
            position: "absolute",
            backgroundColor: mockup.btnBgColor,
            right: 15,
            paddingHorizontal: 12,
            top: 0,
            bottom: 0,
            alignItems: "center",
            justifyContent: "center",
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
            borderWidth: 0.5,
            borderColor: mockup.inputBorderColor,
          }}
        >
          <Ionicons name="search-sharp" size={24} color={mockup.btnTxtColor} />
        </View>
      </View>

      <View
        style={{
          padding: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          gap: 16,
        }}
      >
        <View style={[styles.button, { backgroundColor: mockup.btnBgColor }]}>
          <Text style={{ color: mockup.btnTxtColor }}>Button</Text>
        </View>
        <View
          style={[
            styles.button,
            { borderWidth: 1, borderColor: mockup.outlineBtnColor },
          ]}
        >
          <Text style={{ color: mockup.outlineBtnColor }}>Button</Text>
        </View>
        <View style={[styles.button, { backgroundColor: mockup.btnBgColor }]}>
          <Ionicons name="add-outline" size={18} color={mockup.btnTxtColor} />
          <Text style={{ color: mockup.btnTxtColor }}>Button</Text>
        </View>
        <View style={[styles.button, { backgroundColor: mockup.btnBgColor }]}>
          <Ionicons name="add-outline" size={18} color={mockup.btnTxtColor} />
        </View>
      </View>

      {/* Cards slider */}
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: 16,
        }}
      >
        {/* Card 1 */}
        <View style={[styles.card1, { backgroundColor: mockup.cardBgColor }]}>
          <Image
            style={styles.image}
            source={require("../assets/unsplash/simone-mascellari-SKnfgtlnsdU-unsplash.jpg")}
          />
          <View
            style={[
              styles.cardOverlay,
              { backgroundColor: mockup.cardBgColor },
            ]}
          >
            <Text
              style={{
                color: mockup.cardTxtColor,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Lorem ipsum
            </Text>
          </View>
        </View>

        {/* Card 2 */}
        <View style={[styles.card2, { backgroundColor: mockup.cardBgColor }]}>
          <Image
            style={styles.image2}
            source={require("../assets/unsplash/sonia-sanmartin-noNNvkquBZQ-unsplash.jpg")}
          />
          <View
            style={{
              width: "60%",
              height: "100%",
              padding: 16,
              justifyContent: "space-between",
            }}
          >
            <Ionicons
              name="play-circle-outline"
              size={32}
              color={mockup.cardAccentColor}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: mockup.cardTxtColor,
              }}
            >
              Maecenas sed erat
            </Text>
            <View
              style={{
                gap: 6,
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Ionicons
                name="ios-eye-sharp"
                size={12}
                color={mockup.cardTxtColor}
              />
              <Text style={{ color: mockup.cardTxtColor, fontSize: 12 }}>
                80,989
              </Text>
            </View>
          </View>
        </View>

        {/* Card 3 */}
        <View style={[styles.card3, { backgroundColor: mockup.cardBgColor }]}>
          <View
            style={{
              width: 96,
              borderRadius: 6,
            }}
          >
            <Image
              style={{
                height: "100%",
                width: "100%",
                borderRadius: 6,
              }}
              source={require("../assets/unsplash/tyler-nix-PQeoQdkU9jQ-unsplash.jpg")}
            />
          </View>

          <View
            style={{
              width: "100%",
              height: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={{ color: mockup.cardTxtColor, fontWeight: "bold" }}>
                Marcus Davis
              </Text>
              <Text style={{ color: mockup.cardTxtColor, fontSize: 12 }}>
                Senior Journalist
              </Text>
            </View>

            <View
              style={{
                borderRadius: 6,
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: mockup.cardSecondaryColor,
                padding: 4,
              }}
            >
              <View style={{ padding: 4 }}>
                <Text style={{ color: mockup.cardTxtColor, fontSize: 12 }}>
                  Articles
                </Text>
                <Text
                  style={{
                    color: mockup.cardAccentColor,
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  77
                </Text>
              </View>
              <View style={{ padding: 4 }}>
                <Text style={{ color: mockup.cardTxtColor, fontSize: 12 }}>
                  Followers
                </Text>
                <Text
                  style={{
                    color: mockup.cardAccentColor,
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  972
                </Text>
              </View>
              <View style={{ padding: 4 }}>
                <Text style={{ color: mockup.cardTxtColor, fontSize: 12 }}>
                  Rating
                </Text>
                <Text
                  style={{
                    color: mockup.cardAccentColor,
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  9.6
                </Text>
              </View>
            </View>

            <View
              style={{
                width: "60%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 24,
                paddingHorizontal: 8,
              }}
            >
              <Ionicons name="chatbox" size={20} color={mockup.cardTxtColor} />
              <Ionicons name="heart" size={20} color={mockup.cardTxtColor} />
            </View>
          </View>
        </View>
      </ScrollView>

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

  card1: {
    height: 160,
    width: 120,
    backgroundColor: COLORS.LMNT,
    borderRadius: 6,
    marginLeft: 16,
  },

  cardOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 48,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },

  card2: {
    height: 160,
    width: 240,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
  },

  card3: {
    height: 160,
    width: Dimensions.get("window").width * 0.85,
    borderRadius: 6,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    marginRight: 16,
  },

  image: {
    objectFit: "cover",
    height: "100%",
    width: "100%",
    borderRadius: 6,
  },

  image2: {
    height: "100%",
    width: "40%",
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },

  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 6,
    gap: 8,
  },
});
