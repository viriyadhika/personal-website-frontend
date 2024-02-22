"use client";

import EmailPassword, { EmailPasswordForm } from "../components/email-password";
import useAPI from "@/app/common/hooks/use-api";
import { withAPIHandler } from "@/app/common/context/APIContext";
import { post } from "@/app/common/hooks/fetcher";

function Login() {
  const { callAPI, isAPIRunning } = useAPI(
    async ({ email, password }: EmailPasswordForm) => {
      return post("/auth/login", { username: email, password });
    }
  );

  const onValid = (formData: EmailPasswordForm) => {
    callAPI(formData, (result) => {});
  };

  return (
    <EmailPassword
      onValid={onValid}
      title={"Log In"}
      isProcessing={isAPIRunning}
    />
  );
}

export default withAPIHandler(Login);
