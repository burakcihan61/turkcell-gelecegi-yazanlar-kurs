import axios from "axios";

axios.interceptors.request.use(
  function (config) {
    const { origin } = new URL(config.url);

    const allowedOrigin = "http://localhost:4000";

    const token = localStorage.getItem("access-token");

    if (allowedOrigin.includes(origin)) {
      config.headers.authorization = token;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export const fetchProductList = async ({ pageParam = 0 }) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_ENDPOINT}/product?pages=${pageParam}`
  );
  return data;
};

export const fetchProduct = async (id) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_ENDPOINT}/product/${id}`
  );
  return data;
};

export const postProduct = async (input) => {
  const { data } = await axios.post(`http://localhost:4000/product`, input);
  return data;
};

export const fetchRegister = async (input) => {
  const { data } = await axios.post(
    `http://localhost:4000/auth/register`,
    input
  );
  return data;
};

export const fetchLogin = async (input) => {
  const { data } = await axios.post(`http://localhost:4000/auth/login`, input);
  return data;
};

export const fetchMe = async () => {
  const { data } = await axios.get(`http://localhost:4000/auth/me`);
  return data;
};

export const fetchLogout = async () => {
  const { data } = await axios.post(`http://localhost:4000/auth/logout`, {
    refresh_token: localStorage.getItem("refresh-token"),
  });
  return data;
};

export const postOrder = async (input) => {
  const { data } = await axios.post(`http://localhost:4000/order`, input);
  return data;
};
