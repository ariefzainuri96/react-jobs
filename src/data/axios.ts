import { useAuth } from "@/hooks/use-auth";
import axios from "axios";

export const useAxios = (useReactPrefix = true) => {
  const auth = useAuth();

  const axiosInstance = axios.create({
    baseURL: `https://zain-api.xyz:3001/${useReactPrefix ? "react" : ""}`,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      ...(auth.user ? { Authorization: `Bearer ${auth.user.token}` } : {}),
    },
  });

  return axiosInstance;
};
