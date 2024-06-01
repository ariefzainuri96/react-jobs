import { useState } from "react";
import { JobItem } from "../../model/job-item";
import { FaMapMarker } from "react-icons/fa";
import { Link } from "react-router-dom";

const JobListItem = ({ element }: { element: JobItem }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  let description = element.description;

  if (!showFullDescription) {
    description = (description ?? "").substring(0, 130) + "...";
  }

  return (
    <div className="relative rounded-xl bg-white shadow-md">
      <div className="p-4">
        <div className="mb-6">
          <div className="my-2 text-gray-600">{element.type}</div>
          <h3 className="text-xl font-bold">{element.title}</h3>
        </div>

        <p>
          {description}
          <span
            onClick={(e) => {
              e.preventDefault();

              setShowFullDescription((state) => !state);
            }}
            className="cursor-pointer text-slate-400"
          >
            {showFullDescription ? " Show Less" : " Show More"}
          </span>
        </p>

        <h3 className="mb-2 mt-4 text-indigo-500">{element.salary} / Year</h3>

        <div className="mb-5 border border-gray-100"></div>

        <div className="mb-4 flex flex-col justify-between lg:flex-row">
          <div className="mb-3 flex flex-row items-center gap-2 text-orange-700">
            {/* <i className="fa-solid fa-location-dot text-lg"></i> */}
            <FaMapMarker />
            {element.location}
          </div>
          <Link
            to={`/jobs/${element.id}`}
            className="h-[36px] rounded-lg bg-indigo-500 px-4 py-2 text-center text-sm text-white hover:bg-indigo-600"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobListItem;
