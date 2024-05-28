import { setTheme, registerServiceWorker } from "@eofol/eofol";
import { cyanTheme } from "../styles";

export const init = () => {
  setTheme(cyanTheme);
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
