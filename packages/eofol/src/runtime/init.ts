import { setTheme } from "../styles/theme";
import { getServiceworkerEnabled } from "../config/env";
import { defaultTheme } from "../styles/default-theme";
import registerServiceWorker from "./service-worker";

export const init = () => {
  setTheme(defaultTheme);

  const serviceworkerEnabled = getServiceworkerEnabled();
  if (serviceworkerEnabled) {
    registerServiceWorker();
  }
};
