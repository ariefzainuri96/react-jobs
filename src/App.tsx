import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/home-page";
import MainLayout from "./layouts/main-layout";
import JobsPage from "./pages/jobs-page";
import NotFoundPage from "./pages/not-found-page";
import JobPage from "./pages/job/job-page";
import AddJobPage from "./pages/add-job/add-job-page";
import EditJobPage from "./pages/edit-job-page";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/jobs" element={<JobsPage />} />
      <Route path="/jobs/:id" element={<JobPage />} />
      <Route path="/add-job" element={<AddJobPage />} />
      <Route path="/edit-job/:id" element={<EditJobPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ),
  {
    basename: import.meta.env.BASE_URL,
  },
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
