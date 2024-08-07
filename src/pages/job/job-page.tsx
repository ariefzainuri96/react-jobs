import BackButton from "@/components/back-button";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "react-router-dom";
import { useJob } from "./use-job";
import { LoadingSpinner } from "@/components/loading-spinner";
import { useQuery } from "@tanstack/react-query";
import { JobsDetailResponse } from "@/model/response/jobs-detail-response";
import { useAxios } from "@/data/axios";

const JobPage = () => {
  const axiosInstance = useAxios();
  const { id } = useParams();

  const { status, mutate } = useJob();

  const { data, error, isLoading } = useQuery({
    queryKey: ["/jobs", id],
    queryFn: async () => {
      return (await axiosInstance.get<JobsDetailResponse>(`/jobs/${id}`)).data
        .data;
    },
  });

  if (isLoading) {
    return <JobPageSkeleton />;
  }

  if (error) {
    return <>Error...</>;
  }

  return (
    <div className="w-full flex-1 overflow-y-auto bg-blue-50 p-4">
      <div className="flex flex-col md:grid md:grid-cols-3 md:gap-2">
        <BackButton />
        {/* job */}
        <div className="mt-2 flex flex-col md:col-span-2 md:mt-0">
          <div className="w-full rounded-md bg-white p-4">
            <p className="text-[12px] text-slate-500">{data?.type ?? ""}</p>
            <p className="mt-2 text-2xl font-bold">{data?.title ?? ""}</p>
            <p className="mt-2 text-[12px] font-medium text-red-500">
              {data?.location ?? ""}
            </p>
          </div>
          <div className="mt-2 w-full rounded-md bg-white p-4">
            <p className="text-[14px] font-bold text-purple-600">
              Job Description
            </p>
            <p className="mt-2 text-[12px]">{data?.description ?? ""}</p>
            <p className="mt-2 text-[14px] font-bold text-purple-600">Salary</p>
            <p className="mt-2 text-[12px]">{data?.salary ?? ""}</p>
          </div>
        </div>
        {/* company */}
        <div className="mt-2 flex flex-col md:col-span-1 md:mt-0">
          <div className="flex w-full flex-col rounded-md bg-white p-4">
            <p className="text-[16px] font-bold">Company Info</p>
            <p className="mt-3 text-[18px] font-medium">
              {data?.company?.name ?? ""}
            </p>
            <p className="mt-1 text-[14px]">
              {data?.company?.description ?? ""}
            </p>
            <div className="mt-2 h-[1px] w-full bg-slate-200" />
            <p className="mt-2 text-[18px] font-medium">Contact Email:</p>
            <input
              className="mt-1 rounded-sm bg-blue-50 px-2 py-1 text-[14px] font-bold"
              value={data?.company?.contactEmail ?? ""}
              readOnly
            />
            <p className="mt-1 text-[18px] font-medium">Contact Email:</p>
            <input
              className="mt-1 rounded-sm bg-blue-50 px-2 py-1 text-[14px] font-bold"
              value={data?.company?.contactPhone ?? ""}
              readOnly
            />
          </div>
          <div className="mt-2 flex w-full flex-col rounded-md bg-white p-4">
            <p className="text-[16px] font-bold">Manage Job</p>
            <Link
              className="mt-3 rounded-full bg-purple-600 py-2 text-center text-white hover:bg-purple-700"
              to={`/edit-job/${data?._id}`}
            >
              Edit Job
            </Link>
            <Button
              aria-disabled={status == "pending" || isLoading}
              disabled={status == "pending" || isLoading}
              onClick={() => {
                const confirm = window.confirm(
                  "Are you sure want to delete this job?",
                );

                if (!confirm) return;

                mutate(data?._id ?? "");
              }}
              className="mt-2 rounded-full bg-red-600 hover:bg-red-700"
            >
              {status == "pending" ? <LoadingSpinner /> : "Delete Job"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPage;

const JobPageSkeleton = () => {
  return (
    <div className="w-full flex-1 overflow-y-auto bg-blue-50 p-4">
      <div className="flex flex-col md:grid md:grid-cols-3 md:gap-2">
        {/* job */}
        <div className="flex flex-col md:col-span-2">
          <div className="w-full rounded-md bg-white p-4">
            <Skeleton className="h-2 w-[150px]" />
            <Skeleton className="mt-2 h-4 w-[175px]" />
            <Skeleton className="mt-2 h-2 w-[135px]" />
          </div>
          <div className="mt-2 w-full rounded-md bg-white p-4">
            <Skeleton className="h-3 w-[150px]" />
            <Skeleton className="mt-2 h-2 w-full" />
            <Skeleton className="mt-[3px] h-2 w-[90%]" />
            <Skeleton className="mt-[3px] h-2 w-[65%]" />
            <Skeleton className="mt-2 h-3 w-[150px]" />
            <Skeleton className="mt-2 h-2 w-[20%]" />
          </div>
        </div>
        {/* company */}
        <div className="mt-2 flex flex-col md:col-span-1 md:mt-0">
          <div className="flex w-full flex-col rounded-md bg-white p-4">
            <Skeleton className="h-3 w-[20%]" />
            <Skeleton className="mt-3 h-4 w-[30%]" />
            <Skeleton className="mt-1 h-2 w-[95%]" />
            <Skeleton className="mt-[3px] h-2 w-[90%]" />
            <Skeleton className="mt-[3px] h-2 w-[71%]" />
            <div className="mt-2 h-[1px] w-full bg-slate-200" />
            <Skeleton className="mt-2 h-4 w-[31%]" />
            <Skeleton className="mt-1 h-5 w-full" />
            <Skeleton className="mt-2 h-4 w-[31%]" />
            <Skeleton className="mt-1 h-5 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
