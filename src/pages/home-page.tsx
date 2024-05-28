import Hero from "../components/hero";
import HomeCards from "../components/home-cards";
import JobListing from "../components/job-listing/job-listing";
import ViewAllJobs from "../components/view-all-jobs";

const HomePage = () => {
  return (
    <>
      <Hero />
      <HomeCards />
      <JobListing />
      <ViewAllJobs />
    </>
  );
};

export default HomePage;
