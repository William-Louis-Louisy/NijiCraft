import { createContext, useState } from "react";
import { IAppContextType } from "../types/AppContext.types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppContext = createContext<IAppContextType>({} as any);

const AppProvider = ({ children }: any) => {
  const [lang, setLang] = useState<string>("fr");

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

  return (
    <AppContext.Provider value={{ lang, setLang, storeLang }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
