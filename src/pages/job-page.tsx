import { Button } from "@/components/ui/button";
import { JobItem } from "@/model/job-item";
import { delay } from "@/utils/utils";
import { useParams } from "react-router-dom";
import useSWR from "swr";

const JobPage = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useSWR(`/jobs/${id}`, async () => {
    await delay(1000);
    const res = await fetch(`http://localhost:8000/jobs/${id}`);
    const data: JobItem = await res.json();

    return data;
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
        {/* job */}
        <div className="flex flex-col md:col-span-2">
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
        <div className="flex flex-col md:col-span-1">
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
              defaultValue={data?.company?.contactEmail ?? ""}
              readOnly
            />
            <p className="mt-1 text-[18px] font-medium">Contact Email:</p>
            <input
              className="mt-1 rounded-sm bg-blue-50 px-2 py-1 text-[14px] font-bold"
              defaultValue={data?.company?.contactPhone ?? ""}
              readOnly
            />
          </div>
          <div className="mt-2 flex w-full flex-col rounded-md bg-white p-4">
            <p className="text-[16px] font-bold">Manage Job</p>
            <Button className="mt-3 rounded-full bg-purple-600 hover:bg-purple-700">
              Edit Job
            </Button>
            <Button className="mt-2 rounded-full bg-red-600 hover:bg-red-700">
              Delete Job
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPage;

const JobPageSkeleton = () => {
  return <div>JobPageSkeleton</div>;
};
