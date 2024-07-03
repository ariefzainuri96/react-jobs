import CustomInput from "@/components/custom-input";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { FormEvent } from "react";
import { Link, Navigate } from "react-router-dom";
import { useRegister } from "./use-register";
import { Toaster } from "@/components/ui/toaster";

const RegisterPage = () => {
  const { register, handleChange, isRegisterPending } = useRegister();
  const auth = useAuth();

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    register();
  };

  if (auth?.user) return <Navigate to="/" />;

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-blue-50">
      <form className="base-card" onSubmit={handleRegister}>
        <CustomInput
          className="w-full"
          label="Email"
          id="email"
          name="email"
          type="email"
          onChange={handleChange}
        />
        <CustomInput
          label="Password"
          id="password"
          name="password"
          type="password"
          onChange={handleChange}
        />
        <Button
          aria-disabled={isRegisterPending}
          disabled={isRegisterPending}
          className="mt-4 w-full"
          type="submit"
        >
          Register {isRegisterPending && <LoadingSpinner className="ml-2" />}
        </Button>
        <div className="mt-4 self-center">
          <p>
            Already have an account?{" "}
            <Link to="/login" replace className="text-blue-500">
              Login
            </Link>
          </p>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default RegisterPage;
