import { useAxios } from "@/data/axios";
import { useAuth } from "@/hooks/use-auth";
import { showSimpleToast } from "@/utils/utils";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TLogin } from "../login/use-login";
import { RegisterResponse } from "@/model/response/register-response";
import { AxiosError } from "axios";

export const useRegister = () => {
  const [form, setForm] = useState<TLogin | null>(null);
  const auth = useAuth();
  const axiosInstance = useAxios(false);
  const navigate = useNavigate();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;

    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  }

  // call this function when you want to authenticate the user
  const { mutate: register, isPending: isRegisterPending } = useMutation({
    mutationFn: async () => {
      const response = (
        await axiosInstance.post<RegisterResponse>(
          "/users/register",
          JSON.stringify(form),
          {
            method: "POST",
          },
        )
      ).data;

      return response;
    },
    onSuccess: (data) => {
      if (!auth) return;
      showSimpleToast({
        title: "Success!",
        description: `You have successfully registered with email: ${data.data.email}`,
      });
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      let errorMessage = "Something went wrong!";

      if (error instanceof AxiosError) {
        errorMessage = error.response?.data.message;
      }

      showSimpleToast({
        title: "Error!",
        description: errorMessage,
      });
    },
  });

  return { register, handleChange, isRegisterPending };
};
