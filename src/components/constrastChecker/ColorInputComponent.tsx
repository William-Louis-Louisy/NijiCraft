import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { trad } from "../../lang/traduction";
import { COLORS } from "../../constants/Colors";

const ColorInputComponent: React.FC<{
  labelKey: string;
  color: string;
  tempColor: string;
  setTempColor: React.Dispatch<React.SetStateAction<string>>;
  onPress: () => void;
  handleChange: (e: any) => void;
  lang: string;
}> = ({
  labelKey,
  color,
  tempColor,
  setTempColor,
  handleChange,
  lang,
  onPress,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>
        {trad[lang].constrastChecker[labelKey]}
      </Text>
      <View style={styles.inputBlock}>
        <TouchableOpacity
          onPress={onPress}
          style={{ backgroundColor: color, ...styles.colorPreview }}
        />
        <TextInput
          style={[styles.input]}
          maxLength={9}
          autoCapitalize="characters"
          value={tempColor}
          onChangeText={setTempColor}
          onEndEditing={handleChange}
        />
      </View>
    </View>
  );
};

export default ColorInputComponent;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "48%",
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.TXT,
  },
  inputBlock: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 8,
    width: "100%",
  },
  colorPreview: {
    width: 56,
    height: 40,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.TXT,
    marginRight: -1,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.TXT,
    paddingHorizontal: 16,
    color: COLORS.TXT,
    width: 96,
  },
});
