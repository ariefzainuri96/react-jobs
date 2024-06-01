import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/loading-spinner";
import { useParams } from "react-router-dom";
import BackButton from "@/components/back-button";
import AddJobForm from "@/components/add-job-form";
import useAddJob from "./add-job/use-add-job";
import { axiosInstance } from "@/data/axios";
import { useEffect, useState } from "react";

const EditJobPage = () => {
  const addJob = useAddJob();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();
  const [reload, setReload] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const getDetail = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/jobs/${id}`);
        setLoading(false);
        addJob.setJob(res.data);
      } catch (error) {
        setError(`${error}`);
      }
    };

    getDetail();
  }, [reload]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Button
        onClick={(e) => {
          e.preventDefault();

          setReload((prev) => !prev);
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
