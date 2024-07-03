import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { useAuth } from "@/hooks/use-auth";
// import { useToast } from "./ui/use-toast";

const Navbar = () => {
  // const { toast } = useToast();
  const auth = useAuth();
  const navigate = useNavigate();
  const linkClassName = (isActive: boolean) =>
    isActive
      ? "rounded-md bg-black px-3 py-2 text-white hover:bg-gray-900 hover:text-white"
      : "rounded-md px-3 py-2 text-white hover:bg-gray-900 hover:text-white";

  return (
    <nav className="border-b border-indigo-500 bg-indigo-700">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            {/* <!-- Logo --> */}
            <Link className="mr-4 flex flex-shrink-0 items-center" to="/">
              <img className="h-10 w-auto" src={logo} alt="React Jobs" />
              <span className="ml-2 hidden text-2xl font-bold text-white md:block">
                React Jobs
              </span>
            </Link>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <NavLink
                  to="/"
                  className={({ isActive }) => linkClassName(isActive)}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/jobs"
                  className={({ isActive }) => linkClassName(isActive)}
                >
                  Jobs
                </NavLink>
                <NavLink
                  to="/add-job"
                  className={({ isActive }) => linkClassName(isActive)}
                >
                  Add Job
                </NavLink>
                <NavLink
                  to=""
                  onClick={(e) => {
                    e.preventDefault();

                    console.log("logout");

                    auth.setUser(null);
                    navigate("/", { replace: true });
                  }}
                  className={linkClassName(false)}
                >
                  Logout
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
