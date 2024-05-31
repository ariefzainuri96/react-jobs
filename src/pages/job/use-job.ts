import { useToast } from "@/components/ui/use-toast";
import { delay } from "@/utils/utils";
import { useNavigate } from "react-router-dom";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

export const useJob = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { trigger, isMutating } = useSWRMutation(
    "/jobs",
    async (_, { arg }: { arg: string }) => {
      try {
        await delay(1000);
        const res = await fetch(`http://localhost:8000/jobs/${arg}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          throw new Error("Failed to delete job!");
        }

        await mutate("/jobs");
        navigate("/jobs");
      } catch (error) {
        console.log(error);

        const { dismiss } = toast({
          title: "Error!",
          description: `${error}`,
        });

        setTimeout(() => dismiss(), 2000);
      }
    },
  );

  return { isMutating, trigger };
};
