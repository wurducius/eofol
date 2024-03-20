function request(
  method: string,
  url: string,
  options?: Record<string, string>,
  data?: Object
) {
  return fetch(url, {
    method,
    headers: {
      Accept: data ? "application/json" : "*/*",
      "Content-Type": data ? "application/json" : "*/*",
      ...options,
    },
    body: data ? JSON.stringify(data) : undefined,
  })
    .then((res) => res.json())
    .catch((ex) => {
      console.log(ex);
      throw ex;
    });
}

function get(url: string, options?: Record<string, string>) {
  return request("GET", url, options);
}

function head(url: string, data?: Object, options?: Record<string, string>) {
  return request("HEAD", url, options, data);
}

function post(url: string, data?: Object, options?: Record<string, string>) {
  return request("POST", url, options, data);
}

function put(url: string, data?: Object, options?: Record<string, string>) {
  return request("PUT", url, options, data);
}

function deleteReq(
  url: string,
  data?: Object,
  options?: Record<string, string>
) {
  return request("DELETE", url, options, data);
}

function connect(url: string, data?: Object, options?: Record<string, string>) {
  return request("CONNECT", url, options, data);
}

function options(url: string, data?: Object, options?: Record<string, string>) {
  return request("OPTIONS", url, options, data);
}

function patch(url: string, data?: Object, options?: Record<string, string>) {
  return request("PATCH", url, options, data);
}

export default {
  get,
  head,
  post,
  put,
  delete: deleteReq,
  connect,
  options,
  patch,
};
