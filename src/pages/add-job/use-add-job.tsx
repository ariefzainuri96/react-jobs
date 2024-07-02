import { SelectItem } from "@/components/custom-select";
import { useAxios } from "@/data/axios";
import { JobsDetailResponse } from "@/model/response/jobs-detail-response";
import { JobItem } from "@/model/response/jobs-response";
import { TAddJob } from "@/model/t-add-job";
import { ValidationMessage } from "@/model/validation-message";
import { showSimpleToast } from "@/utils/utils";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export default function useAddJob() {
  const navigate = useNavigate();

  const axiosInstance = useAxios();
  const [job, setJob] = useState<JobItem | undefined>();
  const [jobErrorMessage, setJobErrorMessage] = useState<ValidationMessage[]>();

  const { status: jobStatus, mutate: _addJob } = useMutation({
    mutationFn: async () => {
      const data = (
        await axiosInstance.post<JobsDetailResponse>(
          "/jobs",
          JSON.stringify(job),
        )
      ).data;

      return data.data;
    },
    mutationKey: ["/jobs"],
    onSuccess: (data) => {
      navigate("/jobs");

      showSimpleToast({
        title: "Success!",
        description: `Berhasil membuat job ${data?.title}`,
      });
    },
    onError: (e) => {
      showSimpleToast({
        title: "Error!",
        description: `${e}`,
      });
    },
  });

  const { status: updateJobStatus, mutate: _updateJob } = useMutation({
    mutationKey: ["/jobs", job?._id],
    mutationFn: async () => {
      const data = (
        await axiosInstance.put<JobsDetailResponse>(
          `jobs/${job?._id}`,
          JSON.stringify(job),
        )
      ).data;

      return data.data;
    },
    onSuccess: (data) => {
      navigate(-1);

      showSimpleToast({
        title: "Success!",
        description: `Berhasil memperbarui job ${data.title}`,
      });
    },
    onError: (error) => {
      showSimpleToast({
        title: "Error!",
        description: `${error}`,
      });
    },
  });

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

    _updateJob();
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
    jobStatus,
    updateJobStatus,
  };

  return data;
}
