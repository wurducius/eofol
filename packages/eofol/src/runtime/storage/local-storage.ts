import {
  clearGeneralStorage,
  deleteGeneralStorage,
  loadGeneralStorage,
  saveGeneralStorage,
} from "./general-storage";

const DEFAULT_LOCAL_STORAGE_NAME = "eofol-app-data";

const storage = localStorage;

const loadLocalStorage = loadGeneralStorage(
  storage,
  DEFAULT_LOCAL_STORAGE_NAME
);

const saveLocalStorage = saveGeneralStorage(
  storage,
  DEFAULT_LOCAL_STORAGE_NAME
);

const deleteLocalStorage = deleteGeneralStorage(
  storage,
  DEFAULT_LOCAL_STORAGE_NAME
);

const clearLocalStorage = clearGeneralStorage(storage);

export default {
  loadLocalStorage,
  saveLocalStorage,
  deleteLocalStorage,
  clearLocalStorage,
};
