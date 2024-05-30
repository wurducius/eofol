const registerServiceWorker = (basePath?: string) => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register(`${basePath ?? ""}/service-worker.js`);
  }
};

export default registerServiceWorker;
