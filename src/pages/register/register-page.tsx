import { useAuth } from "@/hooks/use-auth";
import { Navigate } from "react-router-dom";

const RegisterPage = () => {
  const auth = useAuth();

  if (auth?.user) return <Navigate to="/" />;

  return <div>RegisterPage</div>;
};

export default RegisterPage;
