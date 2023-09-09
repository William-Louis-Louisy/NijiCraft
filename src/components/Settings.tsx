import { useContext } from "react";
import { trad } from "../lang/traduction";
import { COLORS } from "../constants/Colors";
import { languages } from "../utils/Languages";
import { AppContext } from "../contexts/AppContext";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const Settings = ({ setModalVisible }) => {
  const { lang, storeLang } = useContext(AppContext);

  return (
    <View style={styles.container}>
      <View style={styles.bar} />
      <Text style={styles.title}>{trad[lang].common.settings}</Text>

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
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    right: 0,
    bottom: 0,
    padding: 16,
    width: "100%",
    display: "flex",
    maxHeight: "80%",
    alignItems: "center",
    position: "absolute",
    flexDirection: "column",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: COLORS.LMNT,
  },

  bar: {
    width: 80,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.TXT,
    marginBottom: 16,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.TXT,
  },

  settingBox: {
    width: "100%",
    padding: 8,
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
