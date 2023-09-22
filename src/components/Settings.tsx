import { useContext } from "react";
import { trad } from "../lang/traduction";
import { COLORS } from "../constants/Colors";
import { languages } from "../utils/Languages";
import { AppContext } from "../contexts/AppContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import IconBnt from "./IconBnt";

const Settings = ({ setModalVisible, clearData }) => {
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
          {/* LANGUAGES */}
          <Text style={{ marginBottom: 6, color: COLORS.TXT }}>
            {trad[lang].common.chooseLanguage}:
          </Text>
          <View style={styles.langField}>
            <FlatList
              horizontal={true}
              data={languages}
              contentContainerStyle={styles.flagRow}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => storeLang(item.code)}
                  style={
                    lang === item.code
                      ? { backgroundColor: COLORS.ACCENT, borderRadius: 6 }
                      : null
                  }
                >
                  <Image style={styles.flag} source={item?.flag} />
                </TouchableOpacity>
              )}
            />
          </View>

          {/* CLEAR DATA */}
          <Text style={{ marginTop: 16, marginBottom: 6, color: COLORS.TXT }}>
            Clear all saved palette data:
          </Text>
          <View style={styles.clearField}>
            <Text
              style={{
                color: COLORS.WARNING,
                fontWeight: "bold",
                fontSize: 12,
              }}
            >
              This action cannot be reversed!
            </Text>

            <IconBnt
              icon="trash"
              color={COLORS.TXT}
              bgColor={COLORS.WARNING}
              label="Clear data"
              size={12}
              onClick={() => clearData()}
            />
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
    marginBottom: 96,
  },

  flag: {
    width: 30,
    height: 18,
    margin: 8,
  },

  langField: {
    width: "100%",
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    backgroundColor: COLORS.BG,
    padding: 4,
    borderRadius: 8,
  },

  clearField: {
    width: "100%",
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.BG,
    padding: 4,
    paddingLeft: 12,
    borderRadius: 8,
  },

  flagRow: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
});
