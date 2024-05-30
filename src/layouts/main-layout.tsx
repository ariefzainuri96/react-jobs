import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import { Toaster } from "@/components/ui/toaster";

const MainLayout = () => {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="flex h-full w-full flex-col overflow-hidden">
        <Navbar />
        <Outlet />
        <Toaster />
      </div>
    </div>
  );
};

export default MainLayout;
