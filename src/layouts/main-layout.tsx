import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import { Toaster } from "@/components/ui/toaster";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Toaster />
    </>
  );
};

export default MainLayout;
