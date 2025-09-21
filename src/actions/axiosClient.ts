import { LOCAL_STORAGE_ACCESS_TOKEN } from "@/lib/constants";
import axios from "axios";
import { logOut } from "./auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const defaultHeaders = {
  "Content-Type": "application/json",
};

export const plainAxios = axios.create({
  baseURL: API_URL,
  headers: defaultHeaders,
});

export const authAxios = axios.create({
  baseURL: API_URL,
  headers: defaultHeaders,
});

authAxios.interceptors.request.use(
  async (config) => {
    const jwt = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);
    if (jwt) {
      config.headers["Authorization"] = `Bearer ${jwt}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

authAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Call your logout logic — clear localStorage, cookies, etc.
      logOut();

      // Redirect to login page (replace "/login" with your login route)
      window.location.href = "/auth/login";

      // Optionally: return a rejected promise
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
