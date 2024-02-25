import { APIContext } from "../context/APIContext";
import { useContext, useState } from "react";
import { noop } from "@/utilities/utils";

function useAPI<Request, Response>(
  fetcher: (request: Request) => Promise<Response>
) {
  const { isAPIRunning, onErrorAPI, onLoadAPI, onAPIReset } =
    useContext(APIContext);
  const [result, setResult] = useState<Response | null>(null);
  async function callAPI(
    request: Request,
    onSuccess: (response: Response) => void,
    onError?: (e: any) => void
  ) {
    const finalOnError = onError || noop;
    onLoadAPI();
    try {
      const response = await fetcher(request);
      onAPIReset();
      onSuccess(response);
      setResult(response);
    } catch (e: any) {
      finalOnError(e);
      if (e?.response?.data?.message) {
        onErrorAPI(e.response.data.message);
      } else if (e?.message) {
        onErrorAPI(e.message);
      } else {
        onErrorAPI("Unknown error");
      }
    }
  }

  return {
    callAPI,
    isAPIRunning,
    result,
  };
}

export default useAPI;
