import axios from "axios";
// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

const API = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
