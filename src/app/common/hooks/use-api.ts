import { APIContext } from "../context/APIContext";
import { useCallback, useContext, useState } from "react";
import { noop } from "@/utilities/utils";

function useAPI<Request, Response>(
  fetcher: (request: Request) => Promise<Response>
) {
  const { onErrorAPI, onAPIReset } = useContext(APIContext);
  const [result, setResult] = useState<Response | null>(null);
  const [isAPIRunning, setIsAPIRunning] = useState<boolean>(false);
  const callAPI = useCallback(
    async (
      request: Request,
      onSuccess: (response: Response) => void,
      onError?: (e: any) => void
    ) => {
      const finalOnError = onError || noop;
      setIsAPIRunning(true);
      try {
        const response = await fetcher(request);
        setIsAPIRunning(false);
        onAPIReset();
        onSuccess(response);
        setResult(response);
      } catch (e: any) {
        setIsAPIRunning(false);
        finalOnError(e);
        if (e?.response?.data?.message) {
          onErrorAPI(e.response.data.message);
        } else if (e?.message) {
          onErrorAPI(e.message);
        } else {
          onErrorAPI("Unknown error");
        }
      }
    },
    [fetcher, onErrorAPI, onAPIReset]
  );

  return {
    callAPI,
    isAPIRunning,
    result: result,
  };
}

export default useAPI;
