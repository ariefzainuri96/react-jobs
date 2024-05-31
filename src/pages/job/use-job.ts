import { JobItem } from "@/model/job-item";
import { delay, showSimpleToast } from "@/utils/utils";
import { useNavigate } from "react-router-dom";
import useSWRMutation from "swr/mutation";

export const useJob = () => {
  const navigate = useNavigate();

  const { trigger, isMutating } = useSWRMutation(
    "/jobs",
    async (_, { arg }: { arg: string }) => {
      try {
        await delay(1000);
        const res = await fetch(`http://localhost:8000/jobs/${arg}`, {
          method: "DELETE",
        });

        const data: JobItem = await res.json();

        if (!res.ok) {
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
