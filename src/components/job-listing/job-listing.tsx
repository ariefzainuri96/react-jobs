import useSWR from "swr";
import { JobItem } from "../../model/job-item";
import JobListItem from "./job-list-item";
import { delay } from "../../utils/utils";

const JobListing = ({ showAll = false }: { showAll?: boolean }) => {
  const { data, error, isLoading } = useSWR("/jobs", async () => {
    await delay(1000);
    const res = await fetch("http://localhost:8000/jobs");
    const data: JobItem[] = await res.json();

    return data;
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error...</p>;
  }

  data?.map((element) => console.log(element));

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl m-auto lg:container">
        {!showAll && (
          <h2 className="mb-6 text-center text-3xl font-bold text-indigo-500">
            Browse Jobs
          </h2>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {(showAll ? data ?? [] : (data ?? []).slice(0, 3)).map(
            (element, index) => {
              return <JobListItem element={element} key={index} />;
            },
          )}
        </div>
      </div>
    </section>
  );
};

export default JobListing;
