import { trad } from "../lang/traduction";
import Toast from "react-native-toast-message";
import { Dispatch, SetStateAction } from "react";
import { IPalette } from "../types/Palette.types";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ON CHANGE SAVE PALETTE
export const onChangeSavePalette = async (lang, currentPalette) => {
  try {
    if (currentPalette.colors.length === 0) return;

    const palettes = await AsyncStorage.getItem("palettes");
    const parsedPalettes = palettes ? JSON.parse(palettes) : [];
    const palettesList = Array.isArray(parsedPalettes) ? parsedPalettes : [];

    // Check if current palette already exists
    const existingIndex = palettesList.findIndex(
      (p) => p.id === currentPalette.id
    );

    // If it exists, replace it, otherwise add it to the list
    if (existingIndex !== -1) {
      palettesList[existingIndex] = currentPalette;
    } else {
      palettesList.push(currentPalette);
    }

    await AsyncStorage.setItem("palettes", JSON.stringify(palettesList));
  } catch (e) {
    Toast.show({
      type: "error",
      text1: trad[lang].toasts.saveError,
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 60,
    });
  }
};

// RETRIEVE PALETTE
export const getPalettes = async (
  lang: string,
  list: IPalette[],
  setList: Dispatch<SetStateAction<IPalette[]>>
) => {
  try {
    const palettes = await AsyncStorage.getItem("palettes");
    if (palettes) {
      const retrievedPalettes = JSON.parse(palettes);
      if (JSON.stringify(retrievedPalettes) !== JSON.stringify(list)) {
        setList(retrievedPalettes);
      }
    }
  } catch (e) {
    Toast.show({
      type: "error",
      text1: trad[lang].toasts.retriveError,
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 60,
    });
  }
};

// DELETE PALETTE
export const deletePalette = async (
  id: string,
  lang: string,
  list: IPalette[],
  setList: Dispatch<SetStateAction<IPalette[]>>,
  setModal: Dispatch<SetStateAction<boolean>>
) => {
  try {
    const newList = list.filter((palette) => palette.id !== id);
    setList(newList);
    await AsyncStorage.setItem("palettes", JSON.stringify(newList));
    setModal(false);
  } catch (e) {
    Toast.show({
      type: "error",
      text1: trad[lang].toasts.deleteError,
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 60,
    });
  }
};
