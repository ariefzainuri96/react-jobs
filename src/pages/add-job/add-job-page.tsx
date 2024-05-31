import CustomSelect from "@/components/custom-select";
import useAddJob from "./use-add-job";
import CustomInput from "@/components/custom-input";
import CustomArea from "@/components/custom-area";
import { Button } from "@/components/ui/button";

const AddJobPage = () => {
  const {
    jobType,
    jobErrorMessage,
    addJob,
    salary,
    setJob,
    handleCompanyChange,
    handleChange,
  } = useAddJob();

  return (
    /* scroll parent */
    <div className="w-full flex-1 overflow-y-auto bg-blue-50">
      {/* column */}
      <div className="flex flex-col items-center px-4 py-4">
        {/* form */}
        <div className="mt-2 flex w-full flex-col rounded-md bg-white p-4 md:max-w-[500px]">
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
            message={
              jobErrorMessage?.find((element) => element.name.includes("type"))
                ?.message
            }
          />
          <CustomInput
            name="title"
            className="mt-2"
            label="Job Listing Name"
            onChange={handleChange}
            placeholder="eg. Beatiful Apartment in Miami"
            message={
              jobErrorMessage?.find((element) => element.name.includes("title"))
                ?.message
            }
          />
          <CustomArea
            name="description"
            className="mt-2"
            label="Description"
            placeholder="Add any job duties, expectations, requirements, etc"
            onChange={handleChange}
            message={
              jobErrorMessage?.find((element) =>
                element.name?.includes("description"),
              )?.message
            }
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
            message={
              jobErrorMessage?.find((element) =>
                element.name.includes("salary"),
              )?.message
            }
          />
          <CustomInput
            name="location"
            className="mt-2"
            label="Location"
            onChange={handleChange}
            placeholder="Company Location"
            message={
              jobErrorMessage?.find((element) =>
                element.name?.includes("location"),
              )?.message
            }
          />
          <p className="mt-3 text-[18px] font-medium">Company Info</p>
          <CustomInput
            name="name"
            className="mt-2"
            label="Company Name"
            onChange={handleCompanyChange}
            placeholder="Company Name"
            message={
              jobErrorMessage?.find((element) => element.name.includes("name"))
                ?.message
            }
          />
          <CustomArea
            name="description"
            className="mt-2"
            label="Company Description"
            placeholder="Company Description"
            onChange={handleCompanyChange}
            message={
              jobErrorMessage?.find(
                (element) =>
                  element.name.includes("company") &&
                  element.name.includes("description"),
              )?.message
            }
          />
          <CustomInput
            name="contactEmail"
            type="email"
            className="mt-2"
            label="Company Email"
            onChange={handleCompanyChange}
            placeholder="Company Email"
            message={
              jobErrorMessage?.find((element) =>
                element.name.includes("contactEmail"),
              )?.message
            }
          />
          <CustomInput
            name="contactPhone"
            className="mt-2"
            label="Company Phone"
            onChange={handleCompanyChange}
            placeholder="Company Phone"
            message={
              jobErrorMessage?.find((element) =>
                element.name.includes("contactPhone"),
              )?.message
            }
          />
          <Button
            onClick={(e) => {
              e.preventDefault();
              addJob();
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
