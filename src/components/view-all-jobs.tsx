import { Link } from "react-router-dom";

const ViewAllJobs = () => {
  return (
    <section className="m-auto my-10 max-w-lg px-6">
      <Link
        to="jobs"
        className="block rounded-xl bg-black px-6 py-4 text-center text-white hover:bg-gray-700"
      >
        View All Jobs
      </Link>
    </section>
  );
};

export default ViewAllJobs;
