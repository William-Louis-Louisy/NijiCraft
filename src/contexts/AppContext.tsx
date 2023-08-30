import { createContext, useState } from "react";
import { IAppContextType } from "../types/AppContext.types";

export const AppContext = createContext<IAppContextType>({} as any);

const AppProvider = ({ children }: any) => {
  const [lang, setLang] = useState<string>("fr");

  return (
    <AppContext.Provider value={{ lang, setLang }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
