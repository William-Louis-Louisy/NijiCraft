export interface IAppContextType {
  lang: string;
  setLang: (lang: string) => void;
  storeLang: (lang: string) => void;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  storeDarkMode: (darkMode: boolean) => void;
}
