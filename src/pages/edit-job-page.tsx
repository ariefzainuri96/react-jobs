import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/loading-spinner";
import { useParams } from "react-router-dom";
import BackButton from "@/components/back-button";
import AddJobForm from "@/components/add-job-form";
import useAddJob from "./add-job/use-add-job";
import { axiosInstance } from "@/data/axios";
import { useQuery } from "@tanstack/react-query";
import { JobsDetailResponse } from "@/model/response/jobs-detail-response";

const EditJobPage = () => {
  const addJob = useAddJob();

  const { id } = useParams();

  const { isLoading, error, refetch } = useQuery({
    queryKey: ["/jobs", id],
    queryFn: async () => {
      const data = (await axiosInstance.get<JobsDetailResponse>(`/jobs/${id}`))
        .data.data;
      addJob.setJob(data);
      return data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Button
        onClick={(e) => {
          e.preventDefault();

          refetch();
        }}
      >
        Error, Tap to Reload?
      </Button>
    );
  }

  return (
    /* scroll parent */
    <div className="w-full flex-1 overflow-y-auto bg-blue-50">
      {/* column */}
      <div className="flex flex-col items-center px-4 py-4">
        {id && <BackButton />}
        {/* form */}
        <AddJobForm addJob={addJob} isEdit />
      </div>
    </div>
  );
};

export default EditJobPage;
