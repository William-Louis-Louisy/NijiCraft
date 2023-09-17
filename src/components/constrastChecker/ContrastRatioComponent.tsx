import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { trad } from "../../lang/traduction";
import { COLORS } from "../../constants/Colors";
import { getStars } from "../../utils/ContrastFunctions";
import { Ionicons } from "@expo/vector-icons";

function renderStars(contrastResult: any, contrastColor: any) {
  const stars = getStars(contrastResult.contrastRating);
  return (
    <View style={styles.starsContainer}>
      {Object.keys(stars).map((key) => (
        <Ionicons
          key={key}
          name={stars[key]}
          size={20}
          color={contrastColor.textColor}
        />
      ))}
    </View>
  );
}

const ContrastRatioComponent: React.FC<{
  contrastResult: any;
  contrastColor: any;
  lang: string;
}> = ({ contrastResult, contrastColor, lang }) => {
  return (
    <View style={styles.contrastRatioContainer}>
      <Text style={styles.inputLabel}>
        {trad[lang].constrastChecker.constrast}
      </Text>
      <View
        style={{
          backgroundColor: contrastColor.bgColor,
          ...styles.contrastRatioBlock,
        }}
      >
        <Text
          style={{
            ...styles.contrastRatioText,
            color: contrastColor.textColor,
          }}
        >
          {contrastResult.contrastRatio}
        </Text>

        <View style={styles.ratingBlock}>
          <Text
            style={[styles.ratingLabel, { color: contrastColor.textColor }]}
          >
            {trad[lang].constrastChecker[contrastColor.valueKey]}
          </Text>
          {renderStars(contrastResult, contrastColor)}
        </View>
      </View>
    </View>
  );
};

export default ContrastRatioComponent;

const styles = StyleSheet.create({
  inputLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.TXT,
  },
  contrastRatioContainer: {
    width: "100%",
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  contrastRatioBlock: {
    width: "100%",
    padding: 16,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  contrastRatioText: {
    fontWeight: "bold",
    fontSize: 32,
  },
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  ratingBlock: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  ratingLabel: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
