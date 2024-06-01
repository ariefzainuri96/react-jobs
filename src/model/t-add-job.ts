import { SelectItem } from "@/components/custom-select";
import { JobItem } from "./job-item";
import { ValidationMessage } from "./validation-message";

export type TAddJob = {
  jobType: SelectItem[];
  jobErrorMessage: ValidationMessage[] | undefined;
  addJob: () => Promise<void>;
  updateJob: () => Promise<void>;
  salary: SelectItem[];
  job: JobItem | undefined;
  jobStatus: "error" | "idle" | "pending" | "success";
  updateJobStatus: "error" | "idle" | "pending" | "success";
  setJob: React.Dispatch<React.SetStateAction<JobItem | undefined>>;
  handleCompanyChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
};
