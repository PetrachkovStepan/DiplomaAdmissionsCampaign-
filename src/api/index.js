import axios from "axios";

export const API_URL = "http://127.0.0.1:8090/api/";

export const getConfig = (token) => {
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

export const getPayloadConfig = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };
};

export const axiosInstance = (token) =>
  axios.create({
    baseURL: API_URL,
    timeout: 1000,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
