import Hero from "../components/hero";
import HomeCards from "../components/home-cards";
import JobListing from "../components/job-listing/job-listing";
import ViewAllJobs from "../components/view-all-jobs";

const HomePage = () => {
  return (
    <div className="w-full flex-1 overflow-y-auto">
      <Hero />
      <HomeCards />
      <JobListing />
      <ViewAllJobs />
    </div>
  );
};

export default HomePage;
