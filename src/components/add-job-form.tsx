import CustomSelect from "./custom-select";
import CustomArea from "./custom-area";
import CustomInput from "./custom-input";
import { LoadingSpinner } from "./loading-spinner";
import { Button } from "./ui/button";
import { TAddJob } from "@/model/t-add-job";

const AddJobForm = ({
  addJob,
  isEdit = false,
}: {
  addJob: TAddJob;
  isEdit?: boolean;
}) => {
  return (
    <form
      className="w-full md:max-w-[500px]"
      onSubmit={(e) => {
        e.preventDefault();

        if (isEdit) {
          addJob.updateJob();
        } else {
          addJob.addJob();
        }
      }}
    >
      <div className="mt-2 flex flex-col rounded-md bg-white p-4">
        <p className="self-center text-2xl font-bold">
          {isEdit ? "Edit Job" : "Add Job"}
        </p>
        <CustomSelect
          value={
            addJob.jobType.find(
              (element) => element.content == addJob.job?.type,
            )?.value
          }
          className="mt-4"
          label="Job Type"
          data={addJob.jobType}
          onValueChange={(e) => {
            addJob.setJob((prev) => {
              return { ...prev, type: addJob.jobType[Number(e)].content };
            });
          }}
          message={
            addJob.jobErrorMessage?.find((element) =>
              element.name.includes("type"),
            )?.message
          }
        />
        <CustomInput
          name="title"
          className="mt-2"
          label="Job Listing Name"
          value={addJob.job?.title ?? ""}
          onChange={addJob.handleChange}
          placeholder="eg. Beatiful Apartment in Miami"
          message={
            addJob.jobErrorMessage?.find((element) =>
              element.name.includes("title"),
            )?.message
          }
        />
        <CustomArea
          name="description"
          className="mt-2"
          value={addJob.job?.description ?? ""}
          label="Description"
          placeholder="Add any job duties, expectations, requirements, etc"
          onChange={addJob.handleChange}
          message={
            addJob.jobErrorMessage?.find((element) => {
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
          value={
            addJob.salary.find(
              (element) => element.content == addJob.job?.salary,
            )?.value
          }
          data={addJob.salary}
          onValueChange={(e) => {
            addJob.setJob((prev) => {
              return { ...prev, salary: addJob.salary[Number(e)].content };
            });
          }}
          message={
            addJob.jobErrorMessage?.find((element) =>
              element.name.includes("salary"),
            )?.message
          }
        />
        <CustomInput
          name="location"
          className="mt-2"
          label="Location"
          value={addJob.job?.location ?? ""}
          onChange={addJob.handleChange}
          placeholder="Company Location"
          message={
            addJob.jobErrorMessage?.find((element) =>
              element.name?.includes("location"),
            )?.message
          }
        />
        <p className="mt-3 text-[18px] font-medium">Company Info</p>
        <CustomInput
          name="name"
          className="mt-2"
          value={addJob.job?.company?.name ?? ""}
          label="Company Name"
          onChange={addJob.handleCompanyChange}
          placeholder="Company Name"
          message={
            addJob.jobErrorMessage?.find((element) =>
              element.name.includes("name"),
            )?.message
          }
        />
        <CustomArea
          name="description"
          className="mt-2"
          label="Company Description"
          value={addJob.job?.company?.description ?? ""}
          placeholder="Company Description"
          onChange={addJob.handleCompanyChange}
          message={
            addJob.jobErrorMessage?.find(
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
          value={addJob.job?.company?.contactEmail ?? ""}
          label="Company Email"
          onChange={addJob.handleCompanyChange}
          placeholder="Company Email"
          message={
            addJob.jobErrorMessage?.find((element) =>
              element.name.includes("contactEmail"),
            )?.message
          }
        />
        <CustomInput
          name="contactPhone"
          className="mt-2"
          label="Company Phone"
          value={addJob.job?.company?.contactPhone ?? ""}
          onChange={addJob.handleCompanyChange}
          placeholder="Company Phone"
          message={
            addJob.jobErrorMessage?.find((element) =>
              element.name.includes("contactPhone"),
            )?.message
          }
        />
        <Button
          aria-disabled={addJob.addJobLoading}
          disabled={addJob.addJobLoading}
          type="submit"
          className="mt-4"
        >
          {(isEdit ? addJob.updateJobLoading : addJob.addJobLoading) ? (
            <LoadingSpinner />
          ) : isEdit ? (
            "Update"
          ) : (
            "Create"
          )}
        </Button>
      </div>
    </form>
  );
};

export default AddJobForm;
