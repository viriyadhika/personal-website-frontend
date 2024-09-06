"use client";

import EmailPassword, { EmailPasswordForm } from "../components/email-password";
import useAPI from "@/app/common/hooks/use-api";
import { APIHandlerProvider } from "@/app/common/context/APIContext";
import { post } from "@/app/common/hooks/fetcher";
import { loginCallback } from "@/app/common/constants";
import { useRouter } from "next/navigation";

function Login() {
  const { callAPI, isAPIRunning } = useAPI(
    async ({ email, password }: EmailPasswordForm) => {
      return post("/auth/login", { username: email, password });
    }
  );
  const router = useRouter();

  const onValid = (formData: EmailPasswordForm) => {
    callAPI(formData, (result) => {
      const urlParams = new URLSearchParams(window.location.search);
      const loginCallbackUrl = urlParams.get(loginCallback);
      if (loginCallbackUrl) {
        router.push(loginCallbackUrl);
      }
    });
  };

  return (
    <EmailPassword
      onValid={onValid}
      title={"Log In"}
      isProcessing={isAPIRunning}
    />
  );
}

export default function LoginWithWrapper() {
  return (
    <APIHandlerProvider>
      <Login />
    </APIHandlerProvider>
  );
}
