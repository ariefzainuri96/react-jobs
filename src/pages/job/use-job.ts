import { useAxios } from "@/data/axios";
import { JobsDetailResponse } from "@/model/response/jobs-detail-response";
import { showSimpleToast } from "@/utils/utils";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useJob = () => {
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const { status, mutate } = useMutation({
    mutationKey: ["/jobs"],
    mutationFn: async (id: string) => {
      try {
        const data = (
          await axiosInstance.delete<JobsDetailResponse>(`jobs/${id}`, {
            method: "DELETE",
          })
        ).data.data;

        if (!data) {
          throw new Error("Failed to delete job!");
        }

        navigate("/jobs");

        showSimpleToast({
          title: "Success!",
          description: `Berhasil menghapus job ${data.title}`,
        });
      } catch (error) {
        showSimpleToast({
          title: "Failed!",
          description: `${error}`,
        });
      }
    },
  });

  return { status, mutate };
};
