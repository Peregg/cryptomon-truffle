import axios from 'axios';

const requestResolver = (baseURL: string, headers: { [key: string]: string }) => {
  let config = {
    baseURL,
    timeout: 1000,
  };

  if (headers) {
    config = {
      ...config,
      headers,
    };
  };

  const instance = axios.create(config);

  const get = (url: string) => {
    return instance.get(url);
  };

  const post = (url: string, body: Object) => {
    return instance.post(url, body);
  };

  const put = (url: string, body: Object) => {
    return instance.put(url, body);
  };

  const patch = (url: string, body: Object) => {
    return instance.patch(url, body);
  };

  const del = (url: string, body: Object) => {
    return instance.delete(url, body);
  };

  return {
    get,
    post,
    put,
    patch,
    del,
  };
};

export default requestResolver;
