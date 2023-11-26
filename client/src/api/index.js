import axios from "axios";
import { getLoggedUser } from "../utils/user";
export const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  const data = getLoggedUser();
  if (data?.accessToken) {
    req.headers.Authorization = `Bearer ${data.accessToken}`;
  }
  return req;
});

export const login = async (data) => API.post("/login", data);
export const signup = async (data) => API.post("/signup", data);
