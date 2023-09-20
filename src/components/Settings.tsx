import { useContext } from "react";
import { trad } from "../lang/traduction";
import { COLORS } from "../constants/Colors";
import { languages } from "../utils/Languages";
import { AppContext } from "../contexts/AppContext";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Settings = ({ setModalVisible }) => {
  const { lang, storeLang } = useContext(AppContext);

  return (
    <>
      <View
        style={styles.pickerOverlay}
        onStartShouldSetResponder={() => true}
        onResponderRelease={() => setModalVisible(false)}
      />
      <View style={styles.container}>
        <View style={styles.modalHeader}>
          {/* CHEAT */}
          <View style={styles.cheat} />

          {/* TITLE */}
          <Text style={styles.title}>{trad[lang].common.settings}</Text>

          {/* CLOSE MODAL BUTTON */}
          <MaterialCommunityIcons
            name="close"
            size={20}
            color={COLORS.TXT}
            style={{ marginBottom: 16, marginRight: 16 }}
            onPress={() => setModalVisible(false)}
          />
        </View>

        <View style={styles.settingBox}>
          <Text style={{ marginBottom: 6, color: COLORS.TXT }}>
            {trad[lang].common.chooseLanguage}:
          </Text>
          <View style={styles.langField}>
            <View style={styles.flagRow}>
              {languages.map((language, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => storeLang(language.code)}
                    style={
                      lang === language.code
                        ? { backgroundColor: COLORS.ACCENT, borderRadius: 6 }
                        : null
                    }
                  >
                    <Image style={styles.flag} source={language?.flag} />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default Settings;

const styles = StyleSheet.create({
  pickerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
  },

  container: {
    right: 0,
    bottom: 0,
    width: "100%",
    display: "flex",
    maxHeight: "80%",
    alignItems: "center",
    position: "absolute",
    flexDirection: "column",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: COLORS.LMNT,
    paddingTop: 16,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.TXT,
  },

  cheat: {
    width: 20,
    height: 20,
    marginLeft: 16,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.TXT,
    marginBottom: 16,
  },

  settingBox: {
    width: "100%",
    padding: 16,
    marginTop: 8,
    marginBottom: 64,
  },

  flag: {
    width: 40,
    height: 24,
    margin: 8,
  },

  langField: {
    width: "100%",
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
  },

  flagRow: {
    flexDirection: "row",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    width: "100%",
    marginHorizontal: 8,
  },
});
