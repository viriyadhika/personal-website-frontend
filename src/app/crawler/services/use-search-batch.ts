import { post } from "@/app/common/hooks/fetcher";
import useAPI from "@/app/common/hooks/use-api";
import { useRouter } from "next/navigation";

export enum BatchField {
  LOCATION = "location",
  ROLE = "role",
}

export type BatchForm = {
  [key in BatchField]: string;
};

export function useSearchBatch() {
  const router = useRouter();

  const { callAPI, isAPIRunning } = useAPI(async (request: BatchForm) => {
    return post("/crawler/batch", {
      location: request.location,
      keywords: request.role,
    });
  });

  const search = (form: BatchForm) => {
    callAPI(
      form,
      () => {
        alert("success!");
      },
      (e) => {
        if (e?.response?.status === 401) {
          router.push("/auth/login");
        }
      }
    );
  };

  return {
    search,
    isAPIRunning,
  };
}
