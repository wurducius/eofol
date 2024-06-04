import { Language } from "@eofol/eofol-types";
import forceRerender from "../core/force-rerender";
import { getTranslationsEnabled } from "../config/env";

const translationsEnabled = getTranslationsEnabled();

const TRANSLATION_LOCAL_STORAGE_NAME = "eofol-app-locale";

const defaultData = { language: "en" };

const getLocaleFromStorage = () => {
  const storageData = localStorage.getItem(TRANSLATION_LOCAL_STORAGE_NAME);
  const locale = storageData ? JSON.parse(storageData) : defaultData;
  return setLanguage(locale.language, true);
};

export let language = defaultData.language;

export const getLanguage = () => language;

export const setLanguage = (
  nextLanguage: string,
  disableSaveToStorage?: boolean
) => {
  if (!disableSaveToStorage) {
    localStorage.setItem(
      TRANSLATION_LOCAL_STORAGE_NAME,
      JSON.stringify({ language: nextLanguage })
    );
  }
  language = nextLanguage;
  return getTranslation(nextLanguage)
    .then((val) => {
      translation = val;
    })
    .then(() => {
      forceRerender();
    });
};

export let languages = [{ title: "English", id: "en" }];

export const getLanguages = () => languages;

const initTranslation = (nextLanguages: Language[]) => {
  languages = nextLanguages;
  languageCodeList = nextLanguages.map((item) => item.id);
  getLocaleFromStorage();
};

let languageCodeList = languages.map((item) => item.id);

function getTranslation(language: string) {
  const target = languageCodeList.includes(language)
    ? language
    : defaultData.language;
  const result = fetch(`/translation/${target}.json`).then((res) => res.json());
  return result;
}

// @ts-ignore
let translation = undefined;

if (translationsEnabled) {
  getTranslation(language).then((val) => {
    translation = val;
  });
}

export const t = (key: string, defaultValue: string) => {
  // @ts-ignore
  let path = translation;
  if (!path) {
    return defaultValue;
  }
  let val;
  try {
    key.split(".").forEach((part) => {
      path = path[part];
    });
    val = path ?? defaultValue;
  } catch (ex) {
    val = defaultValue;
  }
  return val;
};

export default { t, getLanguage, setLanguage, getLanguages, initTranslation };
