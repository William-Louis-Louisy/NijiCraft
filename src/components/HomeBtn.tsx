import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/Colors";

const HomeBtn = ({ target, icon, label }: any) => {
  const navigation: any = useNavigation();

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate(target, {})}
        style={styles.button}
      >
        <Ionicons name={icon} size={20} color={COLORS.TXT} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeBtn;

const styles = StyleSheet.create({
  button: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.LMNT,
    width: 40,
    height: 40,
    padding: 8,
    borderRadius: 6,
  },

  buttonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.TXT,
  },
});
