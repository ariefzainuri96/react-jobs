import { toast } from "@/components/ui/use-toast";

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type TSimpleToast = {
  title: string;
  description: string;
};

export const showSimpleToast = ({ title, description }: TSimpleToast) => {
  const { dismiss } = toast({
    title: title,
    description: description,
  });

  setTimeout(() => dismiss(), 2000);
};
