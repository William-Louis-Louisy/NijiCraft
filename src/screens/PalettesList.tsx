import { getPalettes } from "../utils/CRUD";
import { COLORS } from "../constants/Colors";
import { IPalette } from "../types/Palette.types";
import { AppContext } from "../contexts/AppContext";
import { ScrollView, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useState, useCallback, useContext } from "react";
import PalettesListItem from "../components/palettesList/PalettesListItem";
import PalettesListModal from "../components/palettesList/PalettesListModal";
import EmptyPalettesList from "../components/palettesList/EmptyPalettesList";

export interface ISelectedPalette {
  id: string;
  name: string;
}

const PalettesList = ({ navigation: { navigate } }) => {
  const { lang } = useContext(AppContext);
  const [modal, setModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [palettesList, setPalettesList] = useState<IPalette[]>([]);
  const [selectedPalette, setSelectedPalette] = useState<ISelectedPalette>({
    id: "",
    name: "",
  });

  // Handle dropdown menu opening depending on the palette ID
  const handleDropdown = (palette) => {
    setSelectedPalette({
      id: palette.id,
      name: palette.name,
    });
    setIsOpen(!isOpen);
  };

  useFocusEffect(
    useCallback(() => {
      getPalettes(lang, palettesList, setPalettesList);
    }, [])
  );

  return (
    <ScrollView style={styles.listContainer}>
      {/* PALETTES LIST */}
      {palettesList.length > 0 ? (
        palettesList.map((palette) => {
          return (
            <PalettesListItem
              key={palette.id}
              palette={palette}
              isOpen={isOpen}
              navigate={navigate}
              setModal={setModal}
              setIsOpen={setIsOpen}
              selectedPalette={selectedPalette}
              handleDropdown={handleDropdown}
            />
          );
        })
      ) : (
        <EmptyPalettesList lang={lang} />
      )}

      {/* DELETE MODAL */}
      {modal && (
        <PalettesListModal
          setModal={setModal}
          selectedPalette={selectedPalette}
          lang={lang}
          list={palettesList}
          setList={setPalettesList}
        />
      )}
    </ScrollView>
  );
};

export default PalettesList;

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: COLORS.BG,
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    paddingVertical: 16,
  },
});
