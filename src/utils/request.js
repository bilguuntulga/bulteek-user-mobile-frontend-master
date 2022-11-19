/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-anonymous-default-export */
import qs from "qs";
import { store } from "..";

const statusHandler = async (response) => {
  if (response.status >= 200 && response.status < 400) {
    return response;
  }

  const error = new Error(response.statusText);
  error.status = response.status;
  error.response = response;

  throw error;
};

const nonJsonErrorHandler = {
  type: "Error",
  payload: "Сервертэй холбогдоход алдаа гарлаа",
};

const errorHandler = async (error) => {
  if (error.response && error.response.status === 401) {
    store.dispatch({
      type: "auth/logout",
    });
    return {
      type: "Error",
      payload: "CREDINTIAL_ERROR",
      message: "Хэрэглэгчээр нэвтрэх шаардлагатай",
    };
  }

  if (error.response) {
    try {
      const json = await error.response.json();

      return json.error;
    } catch (jsonParseError) {
      return nonJsonErrorHandler;
    }
  } else {
    return nonJsonErrorHandler;
  }
};

// const api_host = process.env.NODE_ENV === "production" ? process.env.API_HOST || "" : "";

const request = async (url, data, options) => {
  const defaultOptions = {
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(data),
    ...options,
  };

  let queryString = "";

  if (options.method === "GET") {
    delete defaultOptions.body;

    queryString = `?${qs.stringify(data)}`;
  }

  const { token } = store.getState().auth;

  if (token) {
    defaultOptions.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${url}${queryString}`, defaultOptions);

    await statusHandler(res);

    const json = await res.json();

    return json;
  } catch (err) {
    throw await errorHandler(err);
  }
};

const httpMethod = (signal) => ({
  get: (url, data, options) => {
    if (signal) options.signal = signal;

    return request(url, data, { ...options, method: "GET" });
  },
  post: (url, data, options) => {
    if (signal) options.signal = signal;

    return request(url, data, { ...options, method: "POST" });
  },
  put: (url, data, options) => {
    if (signal) options.signal = signal;

    return request(url, data, { ...options, method: "PUT" });
  },
  del: (url, data, options) => {
    if (signal) options.signal = signal;

    return request(url, data, { ...options, method: "DELETE" });
  },
});

export default {
  ...httpMethod(),
  signal: (signal) => httpMethod(signal),
};
