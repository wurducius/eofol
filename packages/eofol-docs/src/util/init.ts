import {
  setTheme,
  registerServiceWorker,
  loadLocalStorage,
  saveLocalStorage,
} from "@eofol/eofol";
import { darkTheme, lightTheme } from "../styles";
import { LOCAL_STORAGE_NAME } from "../data";

export const init = () => {
  const storage = loadLocalStorage(LOCAL_STORAGE_NAME);

  // @ts-ignore
  const themeId = storage?.theme;
  let theme;
  if (themeId === "dark") {
    theme = darkTheme;
  } else {
    theme = lightTheme;
  }
  setTheme(theme);

  saveLocalStorage(
    { theme: themeId === "dark" ? "dark" : "light" },
    LOCAL_STORAGE_NAME
  );

  // const theme = setTheme(initialTheme);
  // initStyles(theme);

  /*
initTranslation([
  { title: "English", id: "en" },
  { title: "Čeština", id: "cs" },
]);
*/

  // registerServiceWorker();
};
