type SearchParams = Record<string, string>;

const paramsToObject = (entries: any) => {
  const result = {};
  for (const [key, value] of entries) {
    // each 'entry' is a [key, value] tupple
    // @ts-ignore
    result[key] = value;
  }
  return result;
};

const getSearchParams = (): SearchParams =>
  paramsToObject(new URLSearchParams(window.location.search).entries());

const setSearchParams = (searchParamsObject: SearchParams) => {
  const url = new URL(window.location.href);
  Object.keys(url.searchParams).forEach((objKey) => {
    url.searchParams.delete(objKey);
  });
  Object.keys(searchParamsObject).forEach((objKey) => {
    url.searchParams.set(objKey, searchParamsObject[objKey]);
  });
  window.history.pushState({}, "", url.toString());
};

export default { getSearchParams, setSearchParams };
