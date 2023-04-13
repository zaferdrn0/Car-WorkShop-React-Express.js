export function backendFetchGET(path, callback) {
    fetch("http://localhost:4000" + path, {
      credentials: 'include'
    })
        .then((response) => callback(response))
        .catch((error) => callback(error))
}

export function backendFetchPOST(path, data, callback) {
    fetch("http://localhost:4000"+ path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      })
        .then((response) => callback(response))
        .catch((error) => {
          callback(error);
        });
}