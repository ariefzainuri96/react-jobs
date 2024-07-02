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
import { AuthProvider } from "./hooks/use-auth";
import { LoginPage } from "./pages/login/login-page";
import { ProtectedRoute } from "./pages/protected-pages";
import RegisterPage from "./pages/register/register-page";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<MainLayout />}>
        <Route
          index
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <JobsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/:id"
          element={
            <ProtectedRoute>
              <JobPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-job"
          element={
            <ProtectedRoute>
              <AddJobPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-job/:id"
          element={
            <ProtectedRoute>
              <EditJobPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <NotFoundPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Route>,
  ),
  {
    basename: import.meta.env.BASE_URL,
  },
);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
