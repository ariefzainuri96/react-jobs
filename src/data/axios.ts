import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://backend-frontend-jobs.vercel.app/react",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});
