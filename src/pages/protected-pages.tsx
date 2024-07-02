import { useAuth } from "@/hooks/use-auth";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();

  if (!auth?.user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }

  return children;
};
