import { axiosInstance } from "@/data/axios";
import { JobItem } from "@/model/job-item";
import { showSimpleToast } from "@/utils/utils";
import { useNavigate } from "react-router-dom";
import useSWRMutation from "swr/mutation";

export const useJob = () => {
  const navigate = useNavigate();

  const { trigger, isMutating } = useSWRMutation(
    "/jobs",
    async (url, { arg }: { arg: string }) => {
      try {
        const res = await axiosInstance.delete(`${url}/${arg}`, {
          method: "DELETE",
        });

        const data: JobItem = await res.data;

        if (res.status >= 400) {
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
  );

  return { isMutating, trigger };
};
