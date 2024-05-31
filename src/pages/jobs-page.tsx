import { useEffect, useRef } from "react";
import JobListing from "../components/job-listing/job-listing";

const JobsPage = () => {
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const scrollPosition = localStorage.getItem("scrollPositionJobs");

    if (scrollPosition && divRef.current) {
      divRef.current.scrollTop = Number(scrollPosition) ?? 0;
      localStorage.removeItem("scrollPositionJobs");
    }
  }, []);

  return (
    <div
      ref={divRef}
      className="overflow-y-auto"
      onScroll={(e) => {
        localStorage.setItem(
          "scrollPositionJobs",
          `${e.currentTarget.scrollTop}`,
        );
      }}
    >
      <JobListing showAll={true} className="py-4" />
    </div>
  );
};

export default JobsPage;
