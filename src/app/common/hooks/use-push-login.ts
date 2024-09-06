import { useRouter } from "next/navigation";
import { loginCallback } from "../constants";

export default function usePushLogin() {
  const router = useRouter();

  function handleError(e: any) {
    if (e?.response?.status === 401) {
      const queryParam = new URLSearchParams();
      queryParam.append(loginCallback, document.location.href);
      router.push(`/auth/login?${queryParam.toString()}`);
    }
  }
  return {
    handleError,
  };
}
