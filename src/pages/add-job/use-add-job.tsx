import { SelectItem } from "@/components/custom-select";
import { JobItem } from "@/model/job-item";
import { ValidationMessage } from "@/model/validation-message";
import { useState } from "react";
import { z } from "zod";

export default function useAddJob() {
  const [job, setJob] = useState<JobItem | undefined>();
  const [jobErrorMessage, setJobErrorMessage] = useState<ValidationMessage[]>();

  const addJobSchema = z
    .object({
      title: z
        .string()
        .min(1, {
          message: "Please fill Job Listing Name form!",
        })
        .default(""),
      type: z
        .string()
        .min(1, {
          message: "Please select Job Type!",
        })
        .default(""),
      description: z
        .string()
        .min(1, {
          message: "Please fill Description form!",
        })
        .default(""),
      location: z
        .string()
        .min(1, {
          message: "Please fill Location form!",
        })
        .default(""),
      salary: z
        .string()
        .min(1, {
          message: "Please fill Description form!",
        })
        .default(""),
      company: z
        .object({
          name: z
            .string()
            .min(1, {
              message: "Please fill Company Name form!",
            })
            .default(""),
          description: z
            .string()
            .min(1, {
              message: "Please fill Company Description form!",
            })
            .default(""),
          contactEmail: z
            .string()
            .min(1, {
              message: "Please fill Company Email form!",
            })
            .email()
            .default(""),
          contactPhone: z
            .string()
            .min(1, {
              message: "Please fill Company Phone form!",
            })
            .min(10, {
              message: "Invalid phone number!",
            })
            .default(""),
        })
        .default({}),
    })
    .default({});

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

  function addJob() {
    // clear the error
    setJobErrorMessage([]);

    const validation = addJobSchema.safeParse(job);

    if (!validation.success) {
      const { errors: err } = validation.error;

      console.log(err);

      setJobErrorMessage(
        err.map((element) => {
          return {
            message: element.message,
            name: element.path,
          };
        }),
      );

      return;
    }

    console.log(`siap dikirim ke server ${JSON.stringify(job)}`);
  }

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

  return {
    job,
    setJob,
    addJob,
    salary,
    jobErrorMessage,
    handleCompanyChange,
    handleChange,
    jobType,
  };
}
