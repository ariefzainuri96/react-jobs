import JobListItem from "./job-list-item";
import { Skeleton } from "../ui/skeleton";
import { twMerge } from "tailwind-merge";
import { useQuery } from "@tanstack/react-query";
import { JobsResponse } from "@/model/response/jobs-response";
import { useAxios } from "@/data/axios";

const JobListing = ({
  showAll = false,
  className,
}: {
  showAll?: boolean;
  className?: string;
}) => {
  const axiosInstance = useAxios();

  const { data, error, isLoading } = useQuery({
    queryKey: ["/jobs"],
    queryFn: async () => {
      return (await axiosInstance.get<JobsResponse>("/jobs")).data.data;
    },
  });

  if (error) {
    return <p>Error...</p>;
  }

  return (
    <section className={twMerge("bg-blue-50 px-4 py-10", className)}>
      <div className="container-xl m-auto lg:container">
        <h2 className="mb-6 text-center text-3xl font-bold text-indigo-500">
          {showAll ? "Browse Jobs" : "Recent Jobs"}
        </h2>

        {isLoading && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[1, 1, 1].map((_, index) => {
              return <JobListingSkeleton key={index} />;
            })}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {(showAll
            ? data ?? []
            : (data ?? []).slice(
                (data ?? []).length < 3 ? 0 : (data ?? []).length - 3,
                (data ?? []).length,
              )
          ).map((element, index) => {
            return <JobListItem element={element} key={index} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default JobListing;

export const JobListingSkeleton = () => {
  return (
    <div className="flex flex-col rounded-xl bg-white shadow-md">
      <div className="p-4">
        <div className="mb-6">
          <Skeleton className="my-2 h-3 w-[150px]" />
          <Skeleton className="h-3 w-[150px] text-xl" />
        </div>

        <Skeleton className="mb-1 h-3 w-full" />
        <Skeleton className="h-3 w-[230px]" />

        <Skeleton className="mb-2 mt-4 h-3 w-[170px] text-indigo-500" />

        <div className="mb-5 border border-gray-100"></div>

        <Skeleton className="mb-4 h-3 w-[120px]" />
        <Skeleton className="mb-4 h-[36px] w-full py-2" />
      </div>
    </div>
  );
};
