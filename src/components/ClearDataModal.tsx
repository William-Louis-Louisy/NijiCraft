import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../constants/Colors";
import { trad } from "../lang/traduction";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import IconBnt from "./IconBnt";

const ClearDataModal = ({ setModalVisible, lang }) => {
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
          <View style={styles.titleRow}>
            <MaterialCommunityIcons
              name="alert-circle"
              size={24}
              color={COLORS.WARNING}
            />
            <Text style={styles.title}>{trad[lang].common.warning}</Text>
          </View>

          {/* CLOSE MODAL BUTTON */}
          <MaterialCommunityIcons
            name="close"
            size={20}
            color={COLORS.TXT}
            style={{ marginBottom: 16, marginRight: 16 }}
            onPress={() => setModalVisible(false)}
          />
        </View>

        <View style={styles.content}>
          <Text style={{ color: COLORS.TXT, marginBottom: 16 }}>
            {trad[lang].common.clearDataWarning}
          </Text>

          <View>
            <IconBnt
              icon="trash"
              bgColor={COLORS.WARNING}
              color={COLORS.TXT}
              label={trad[lang].common.confirm}
              onClick={() => console.log("Clear data confirmed")}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default ClearDataModal;

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

  titleRow: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.TXT,
  },

  content: {
    width: "100%",
    padding: 16,
    marginTop: 8,
    marginBottom: 96,
  },
});
