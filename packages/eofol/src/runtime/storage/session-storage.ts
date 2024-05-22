import {
  clearGeneralStorage,
  deleteGeneralStorage,
  loadGeneralStorage,
  saveGeneralStorage,
} from "./general-storage";

const DEFAULT_SESSION_STORAGE_NAME = "eofol-app-session-data";

const storage = sessionStorage;

const loadSessionStorage = loadGeneralStorage(
  storage,
  DEFAULT_SESSION_STORAGE_NAME
);

const saveSessionStorage = saveGeneralStorage(
  storage,
  DEFAULT_SESSION_STORAGE_NAME
);

const deleteSessionStorage = deleteGeneralStorage(
  storage,
  DEFAULT_SESSION_STORAGE_NAME
);

const clearSessionStorage = clearGeneralStorage(storage);

export default {
  loadSessionStorage,
  saveSessionStorage,
  deleteSessionStorage,
  clearSessionStorage,
};
