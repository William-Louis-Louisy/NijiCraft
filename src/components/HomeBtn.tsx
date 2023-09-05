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
        <Ionicons name={icon} size={24} color={COLORS.TXT} />
        <Text style={styles.buttonText}>{label}</Text>
      </TouchableOpacity>
      <Text>HomeBtn</Text>
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
    width: 104,
    height: 104,
    padding: 8,
    borderRadius: 6,
  },

  buttonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.TXT,
  },
});
