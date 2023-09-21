import { StyleSheet, Text, View } from "react-native";
import { FC } from "react";
import { trad } from "../../lang/traduction";
import { COLORS } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import HomeBtn from "../HomeBtn";

interface IEmptyPalettesListProps {
  lang: string;
}

const EmptyPalettesList: FC<IEmptyPalettesListProps> = ({ lang }) => {
  return (
    <View style={styles.container}>
      {/* HEAD */}
      <View style={styles.head}>
        <Ionicons
          name="ios-alert-circle-outline"
          size={48}
          color={COLORS.ACCENT}
        />
        <Text style={styles.mainText}>{trad[lang].palettesList.empty}</Text>
      </View>

      {/* DESCRIPTION */}
      <Text style={styles.subText}>
        {trad[lang].palettesList.emptyDescription}
      </Text>

      {/* BUTTON */}
      <HomeBtn target="PaletteCreator" icon="color-palette" />
    </View>
  );
};

export default EmptyPalettesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 16,
  },

  head: {
    justifyContent: "center",
    alignItems: "center",
  },

  mainText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.ACCENT,
  },

  subText: {
    paddingHorizontal: 16,
    fontSize: 16,
    textAlign: "center",
    color: COLORS.TXT,
  },
});
