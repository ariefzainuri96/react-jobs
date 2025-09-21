import { useAuth } from "@/hooks/use-auth";
import axios from "axios";

export const useAxios = (useReactPrefix = true) => {
  const auth = useAuth();

  const axiosInstance = axios.create({
    baseURL: `http://205.198.87.68:3001/${useReactPrefix ? "react" : ""}`,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      ...(auth.user ? { Authorization: `Bearer ${auth.user.token}` } : {}),
    },
  });

  return axiosInstance;
};
