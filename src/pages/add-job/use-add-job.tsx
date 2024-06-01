import { SelectItem } from "@/components/custom-select";
import { axiosInstance } from "@/data/axios";
import { JobItem } from "@/model/job-item";
import { TAddJob } from "@/model/t-add-job";
import { ValidationMessage } from "@/model/validation-message";
import { showSimpleToast } from "@/utils/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { z } from "zod";

export default function useAddJob() {
  const navigate = useNavigate();

  const [job, setJob] = useState<JobItem | undefined>();
  const [jobErrorMessage, setJobErrorMessage] = useState<ValidationMessage[]>();

  const { trigger: _addJob, isMutating: addJobLoading } = useSWRMutation(
    "/jobs",
    async (url) => {
      try {
        const res = await axiosInstance.post(url, JSON.stringify(job));
        const data: JobItem = res.data;

        if (res.status > 400) {
          throw new Error("Failed to post job, please retry!");
        }

        navigate("/jobs");

        showSimpleToast({
          title: "Success!",
          description: `Berhasil membuat job ${data.title}`,
        });
      } catch (error) {
        showSimpleToast({
          title: "Error!",
          description: `${error}`,
        });
      }
    },
  );

  const { trigger: _updateJob, isMutating: updateJobLoading } = useSWRMutation(
    "/jobs",
    async (url, { arg }: { arg: string }) => {
      try {
        const res = await axiosInstance.put(
          `${url}/${arg}`,
          JSON.stringify(job),
        );
        const data: JobItem = res.data;

        if (res.status > 400) {
          throw new Error("Failed to post job, please retry!");
        }

        // await mutate(`/jobs/${arg}`);
        navigate(-1);

        showSimpleToast({
          title: "Success!",
          description: `Berhasil memperbarui job ${data.title}`,
        });
      } catch (error) {
        showSimpleToast({
          title: "Error!",
          description: `${error}`,
        });
      }
    },
  );

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
    { value: "0", content: "Full-Time" },
    { value: "1", content: "Contract" },
    { value: "2", content: "Freelance" },
    { value: "3", content: "Part-Time" },
  ];

  const salary: SelectItem[] = [
    { value: "0", content: "under $50K" },
    { value: "1", content: "$60K - $70K" },
    { value: "2", content: "$70K - $80K" },
    { value: "3", content: "$90K - $100K" },
  ];

  async function addJob() {
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

    _addJob();
  }

  async function updateJob() {
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

    _updateJob(job?.id ?? "");
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

  const data: TAddJob = {
    job,
    setJob,
    addJob,
    updateJob,
    salary,
    jobErrorMessage,
    handleCompanyChange,
    handleChange,
    jobType,
    addJobLoading,
    updateJobLoading,
  };

  return data;
}
