import { useEffect, useRef } from "react";
import Hero from "../components/hero";
import HomeCards from "../components/home-cards";
import JobListing from "../components/job-listing/job-listing";
import ViewAllJobs from "../components/view-all-jobs";

const HomePage = () => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollPosition = localStorage.getItem("scrollPosition");
    if (scrollPosition && divRef.current) {
      divRef.current.scrollTop = Number(scrollPosition) ?? 0;
      localStorage.removeItem("scrollPosition");
    }
  }, []);

  return (
    <div
      className="w-full flex-1 overflow-y-auto"
      ref={divRef}
      onScroll={(event) => {
        localStorage.setItem(
          "scrollPosition",
          `${event.currentTarget.scrollTop}`,
        );
      }}
    >
      <Hero />
      <HomeCards />
      <JobListing />
      <ViewAllJobs />
    </div>
  );
};

export default HomePage;
