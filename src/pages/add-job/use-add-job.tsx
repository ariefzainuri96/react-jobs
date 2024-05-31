import { SelectItem } from "@/components/custom-select";
import { JobItem } from "@/model/job-item";
import { useState } from "react";

export default function useAddJob() {
  const [job, setJob] = useState<JobItem | undefined>();

  const jobType: SelectItem[] = [
    { value: "0", content: "Full Time" },
    { value: "1", content: "Contract" },
    { value: "2", content: "Freelance" },
  ];

  const salary: SelectItem[] = [
    { value: "0", content: "under $50K" },
    { value: "1", content: "$50-70K" },
    { value: "2", content: "$70-90K" },
  ];

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;

    setJob((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleCompanyChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;

    setJob((prev) => {
      return {
        ...prev,
        company: {
          ...prev?.company,
          [name]: value,
        },
      };
    });
  }

  return { job, setJob, salary, handleCompanyChange, handleChange, jobType };
}
