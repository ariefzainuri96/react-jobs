import useAddJob from "./use-add-job";
import AddJobForm from "@/components/add-job-form";

const AddJobPage = () => {
  const addJob = useAddJob();

  return (
    // scroll parent
    <div className="w-full flex-1 overflow-y-auto bg-blue-50">
      {/* column */}
      <div className="flex flex-col items-center px-4 py-4">
        {/* form */}
        <AddJobForm addJob={addJob} />
      </div>
    </div>
  );
};

export default AddJobPage;
