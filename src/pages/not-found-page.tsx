import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <section className="flex h-96 flex-col items-center justify-center text-center">
      <FaExclamationTriangle className="mb-4 text-6xl text-yellow-400" />
      <h1 className="mb-4 text-6xl font-bold">404 Not Found</h1>
      <p className="mb-5 text-xl">This page does not exist</p>
      <Link
        to="/"
        className="mt-4 rounded-md bg-indigo-700 px-3 py-2 text-white hover:bg-indigo-900"
      >
        Go Back
      </Link>
    </section>
  );
};

export default NotFoundPage;
