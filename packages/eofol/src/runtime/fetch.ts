function get(url: string) {
  return fetch(url)
    .then((res) => res.json())
    .catch((ex) => {
      console.log(ex);
      throw ex;
    });
}

function post(url: string, data?: Object) {
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  })
    .then((res) => res.json())
    .catch((ex) => {
      console.log(ex);
      throw ex;
    });
}

export default { get, post };
