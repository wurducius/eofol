import { getBasePath } from "../config/env";

const basePath = getBasePath();

const registerServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register(`${basePath}service-worker.js`);
  }
};

export default registerServiceWorker;
