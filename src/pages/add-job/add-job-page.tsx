import CustomSelect from "@/components/custom-select";
import useAddJob from "./use-add-job";
import CustomInput from "@/components/custom-input";
import CustomArea from "@/components/custom-area";
import { Button } from "@/components/ui/button";

const AddJobPage = () => {
  const { jobType, job, salary, setJob, handleCompanyChange, handleChange } =
    useAddJob();

  return (
    <div className="w-full flex-1 overflow-y-auto bg-blue-50">
      <div className="flex flex-col items-center py-10">
        <div className="flex min-w-[500px] max-w-[500px] flex-col rounded-md bg-white p-4">
          <p className="self-center text-2xl font-bold">Add Job</p>
          <CustomSelect
            className="mt-4"
            label="Job Type"
            data={jobType}
            onValueChange={(e) => {
              setJob((prev) => {
                return { ...prev, type: jobType[Number(e)].content };
              });
            }}
          />
          <CustomInput
            name="title"
            className="mt-2"
            label="Job Listing Name"
            onChange={handleChange}
            placeholder="eg. Beatiful Apartment in Miami"
          />
          <CustomArea
            name="description"
            className="mt-2"
            label="Description"
            placeholder="Add any job duties, expectations, requirements, etc"
            onChange={handleChange}
          />
          <CustomSelect
            className="mt-2"
            label="Salary"
            data={salary}
            onValueChange={(e) => {
              setJob((prev) => {
                return { ...prev, salary: salary[Number(e)].content };
              });
            }}
          />
          <CustomInput
            name="location"
            className="mt-2"
            label="Location"
            onChange={handleChange}
            placeholder="Company Location"
          />
          <p className="mt-3 text-[18px] font-medium">Company Info</p>
          <CustomInput
            name="name"
            className="mt-2"
            label="Company Name"
            onChange={handleCompanyChange}
            placeholder="Company Name"
          />
          <CustomArea
            name="description"
            className="mt-2"
            label="Company Description"
            placeholder="Company Description"
            onChange={handleCompanyChange}
          />
          <CustomInput
            name="contactEmail"
            type="email"
            className="mt-2"
            label="Company Email"
            onChange={handleCompanyChange}
            placeholder="Company Email"
          />
          <CustomInput
            name="contactPhone"
            className="mt-2"
            label="Company Phone"
            onChange={handleCompanyChange}
            placeholder="Company Phone"
          />
          <Button
            onClick={() => {
              console.log(job);
            }}
            className="mt-4"
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddJobPage;
