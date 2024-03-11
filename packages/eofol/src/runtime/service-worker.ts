const registerServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register(`/service-worker.js`);
  }
};

module.exports = registerServiceWorker;
