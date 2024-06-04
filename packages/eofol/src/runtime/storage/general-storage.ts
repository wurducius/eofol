const getGeneralStorageName = (
  defaultGeneralStorageName: string,
  generalStorageName?: string
) => generalStorageName ?? defaultGeneralStorageName;

export const loadGeneralStorage =
  (storage: any, defaultStorageName: string) =>
  (storageName?: string): Object | undefined => {
    const data = storage.getItem(
      getGeneralStorageName(defaultStorageName, storageName)
    );
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

export const saveGeneralStorage =
  (storage: any, defaultStorageName: string) =>
  (nextState: Object, storageName?: string) => {
    storage.setItem(
      getGeneralStorageName(defaultStorageName, storageName),
      JSON.stringify(nextState)
    );
  };

export const deleteGeneralStorage =
  (storage: any, defaultStorageName: string) => (storageName?: string) => {
    storage.removeItem(getGeneralStorageName(defaultStorageName, storageName));
  };

export const clearGeneralStorage = (storage: any) => () => {
  storage.clear();
};
