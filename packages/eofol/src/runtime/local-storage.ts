const loadLocalStorage = (localStorageName: string): Object | undefined => {
  const data = localStorage.getItem(localStorageName);
  if (data) {
    let json;
    try {
      json = JSON.parse(data);
      return json;
    } catch (ex) {
      return undefined;
    }
  } else {
    return undefined;
  }
};

const saveLocalStorage = (localStorageName: string, nextState: Object) => {
  localStorage.setItem(localStorageName, JSON.stringify(nextState));
};

const deleteLocalStorage = (localStorageName: string) => {
  localStorage.removeItem(localStorageName);
};

const clearLocalStorage = () => {
  localStorage.clear();
};

export default {
  loadLocalStorage,
  saveLocalStorage,
  deleteLocalStorage,
  clearLocalStorage,
};
