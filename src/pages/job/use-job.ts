import { axiosInstance } from "@/data/axios";
import { JobItem } from "@/model/job-item";
import { showSimpleToast } from "@/utils/utils";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useJob = () => {
  const navigate = useNavigate();

  const { status, mutate } = useMutation({
    mutationKey: ["/jobs"],
    mutationFn: async (id: string) => {
      try {
        const data = (
          await axiosInstance.delete<JobItem>(`jobs/${id}`, {
            method: "DELETE",
          })
        ).data;

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
