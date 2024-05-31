import CustomSelect from "@/components/custom-select";
import useAddJob from "./use-add-job";
import CustomInput from "@/components/custom-input";
import CustomArea from "@/components/custom-area";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/loading-spinner";

const AddJobPage = () => {
  const {
    jobType,
    jobErrorMessage,
    addJob,
    salary,
    job,
    loading,
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
        <form
          className="w-full md:max-w-[500px]"
          onSubmit={(e) => {
            e.preventDefault();

            addJob();
          }}
        >
          <div className="mt-2 flex flex-col rounded-md bg-white p-4">
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
                jobErrorMessage?.find((element) =>
                  element.name.includes("type"),
                )?.message
              }
            />
            <CustomInput
              name="title"
              className="mt-2"
              label="Job Listing Name"
              value={job?.title ?? ""}
              onChange={handleChange}
              placeholder="eg. Beatiful Apartment in Miami"
              message={
                jobErrorMessage?.find((element) =>
                  element.name.includes("title"),
                )?.message
              }
            />
            <CustomArea
              name="description"
              className="mt-2"
              value={job?.description ?? ""}
              label="Description"
              placeholder="Add any job duties, expectations, requirements, etc"
              onChange={handleChange}
              message={
                jobErrorMessage?.find((element) => {
                  if ((element.name ?? []).length == 1) {
                    return element.name?.includes("description");
                  }
                  return false;
                })?.message
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
              value={job?.location ?? ""}
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
              value={job?.company?.name ?? ""}
              label="Company Name"
              onChange={handleCompanyChange}
              placeholder="Company Name"
              message={
                jobErrorMessage?.find((element) =>
                  element.name.includes("name"),
                )?.message
              }
            />
            <CustomArea
              name="description"
              className="mt-2"
              label="Company Description"
              value={job?.company?.description ?? ""}
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
              value={job?.company?.contactEmail ?? ""}
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
              value={job?.company?.contactPhone ?? ""}
              onChange={handleCompanyChange}
              placeholder="Company Phone"
              message={
                jobErrorMessage?.find((element) =>
                  element.name.includes("contactPhone"),
                )?.message
              }
            />
            <Button
              aria-disabled={loading}
              disabled={loading}
              type="submit"
              className="mt-4"
            >
              {loading ? <LoadingSpinner /> : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJobPage;
