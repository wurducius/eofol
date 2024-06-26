const ENV = process.env;

const envBoolean = (property: string | undefined) => property !== "false";

export const getTranslationsEnabled = () =>
  envBoolean(ENV.TRANSLATIONS_ENABLED);

export const getServiceworkerEnabled = () =>
  envBoolean(ENV.SERVICEWORKER_ENABLED);

export const getBasePath = () => ENV.BASE_PATH ?? "./";
