"use client";

import EmailPassword, { EmailPasswordForm } from "../components/email-password";
import useAPI from "@/app/common/hooks/use-api";
import { APIHandlerProvider } from "@/app/common/context/APIContext";
import { post } from "@/app/common/hooks/fetcher";

function Signup() {
  const { callAPI, isAPIRunning } = useAPI(
    async ({ email, password }: EmailPasswordForm) => {
      return post("/auth/signup", { username: email, password });
    }
  );
  const onValid = (formData: EmailPasswordForm) => {
    callAPI(formData, () => {
      alert("Success!");
    });
  };
  return (
    <EmailPassword
      onValid={onValid}
      title={"Sign Up"}
      isProcessing={isAPIRunning}
    />
  );
}

export default function LoginWithWrapper() {
  return (
    <APIHandlerProvider>
      <Signup />
    </APIHandlerProvider>
  );
}
