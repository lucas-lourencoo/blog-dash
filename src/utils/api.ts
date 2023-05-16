import axios from "axios";

export const api = axios.create({
  baseURL: "https://blog-dash.vercel.app/api",
});
