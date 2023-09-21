import { createContext, useState, useEffect } from "react";
import { IAppContextType } from "../types/AppContext.types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppContext = createContext<IAppContextType>({} as any);

const AppProvider = ({ children }: any) => {
  const [lang, setLang] = useState<string>("fr");
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // GET LANG FROM ASYNC STORAGE
  const getLang = async () => {
    try {
      const data = await AsyncStorage.getItem("lang");
      data && setLang(data || "fr");
    } catch (error) {
      console.error("Erreur lors de la récupération de la langue :", error);
    }
  };

  // STORE LANG IN ASYNC STORAGE
  const storeLang = async (lang: string) => {
    try {
      await AsyncStorage.setItem("lang", lang);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de la langue :", error);
    } finally {
      getLang();
    }
  };

  // STOCK DARK MODE IN ASYNC STORAGE
  const storeDarkMode = async (value: boolean) => {
    try {
      await AsyncStorage.setItem("darkMode", JSON.stringify(value));
      setDarkMode(value);
    } catch (error) {
      console.error(error);
    }
  };

  // GET DARK MODE FROM ASYNC STORAGE
  useEffect(() => {
    const getDarkMode = async () => {
      try {
        const storedDarkMode = await AsyncStorage.getItem("darkMode");
        storedDarkMode && setDarkMode(JSON.parse(storedDarkMode));
      } catch (error) {
        console.error(error);
      }
    };
    getDarkMode();
  }, []);

  return (
    <AppContext.Provider
      value={{ lang, setLang, storeLang, darkMode, setDarkMode, storeDarkMode }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
