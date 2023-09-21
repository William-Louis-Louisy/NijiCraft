import { StyleSheet, Text, View } from "react-native";
import React, { FC, Dispatch, SetStateAction } from "react";
import { COLORS } from "../../constants/Colors";
import IconBnt from "../IconBnt";
import { trad } from "../../lang/traduction";
import { ISelectedPalette } from "../../screens/PalettesList";
import { IPalette } from "../../types/Palette.types";
import { deletePalette } from "../../utils/CRUD";

interface IPalettesListModalProps {
  setModal: Dispatch<SetStateAction<boolean>>;
  selectedPalette: ISelectedPalette;
  lang: string;
  list: IPalette[];
  setList: Dispatch<SetStateAction<IPalette[]>>;
}

const PalettesListModal: FC<IPalettesListModalProps> = ({
  setModal,
  selectedPalette,
  lang,
  list,
  setList,
}) => {
  return (
    <>
      <View
        style={styles.pickerOverlay}
        onStartShouldSetResponder={() => true}
        onResponderRelease={() => setModal(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            {trad[lang].common.delete} {selectedPalette.name}
          </Text>

          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              {trad[lang].common.deleteWarning}
            </Text>
            <View style={styles.modalButtons}>
              <IconBnt
                size={14}
                icon="md-close-sharp"
                bgColor={COLORS.BG}
                label={trad[lang].common.cancel}
                onClick={() => setModal(false)}
              />
              <IconBnt
                size={14}
                icon="trash"
                bgColor={COLORS.WARNING}
                label={trad[lang].common.delete}
                onClick={() =>
                  deletePalette(
                    selectedPalette.id,
                    lang,
                    list,
                    setList,
                    setModal
                  )
                }
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default PalettesListModal;

const styles = StyleSheet.create({
  pickerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(23, 23, 23, 0.7)",
    alignItems: "center",
    justifyContent: "center",
  },

  modalContainer: {
    width: "80%",
    padding: 16,
    borderRadius: 6,
    backgroundColor: COLORS.LMNT,
    justifyContent: "space-between",
  },

  modalTitle: {
    fontSize: 16,
    color: COLORS.TXT,
    fontWeight: "bold",
    marginBottom: 32,
  },

  modalText: {
    color: COLORS.TXT,
  },

  modalContent: {
    width: "100%",
    gap: 16,
  },

  modalButtons: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 16,
  },
});
