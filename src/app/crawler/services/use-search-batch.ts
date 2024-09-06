import { post } from "@/app/common/hooks/fetcher";
import useAPI from "@/app/common/hooks/use-api";
import usePushLogin from "@/app/common/hooks/use-push-login";

export enum BatchField {
  LOCATION = "location",
  ROLE = "role",
}

export type BatchForm = {
  [key in BatchField]: string;
};

export function useSearchBatch() {
  const { handleError } = usePushLogin();

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
        handleError(e);
      }
    );
  };

  return {
    search,
    isAPIRunning,
  };
}
