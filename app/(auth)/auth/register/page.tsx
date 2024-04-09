import type { Metadata } from "next";

import RegisterForm from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Sign up",
};

const RegisterPage = () => {
  return <RegisterForm />;
};

export default RegisterPage;
