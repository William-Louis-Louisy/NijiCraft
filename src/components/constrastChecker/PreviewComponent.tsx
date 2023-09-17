import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { IColorToCompare } from "../../screens/ContrastChecker";
import { trad } from "../../lang/traduction";

const PreviewComponent: React.FC<{ colors: IColorToCompare; lang: string }> = ({
  colors,
  lang,
}) => {
  return (
    <View
      style={[styles.previewContainer, { backgroundColor: colors.bgColor }]}
    >
      <Text style={[styles.poemTitle, { color: colors.textColor }]}>
        Couleur d'orange
      </Text>
      <Text style={{ color: colors.textColor }}>
        {trad[lang].constrastChecker.poem}
      </Text>
      <Text style={[styles.poemAutor, { color: colors.textColor }]}>
        Paul Éluard
      </Text>
    </View>
  );
};

export default PreviewComponent;

const styles = StyleSheet.create({
  previewContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 32,
  },
  poemTitle: {
    fontSize: 20,
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
    marginBottom: 16,
  },
  poemAutor: {
    fontSize: 12,
    fontStyle: "italic",
    width: "100%",
    textAlign: "right",
    marginTop: 8,
  },
});
