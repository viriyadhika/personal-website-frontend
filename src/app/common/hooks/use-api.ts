import { APIContext } from "../context/APIContext";
import { useContext, useState } from "react";

function useAPI<Request, Response>(
  fetcher: (request: Request) => Promise<Response>
) {
  const { isAPIRunning, onErrorAPI, onLoadAPI, onAPIReset } =
    useContext(APIContext);
  const [result, setResult] = useState<Response | null>(null);
  async function callAPI(
    request: Request,
    onSuccess: (response: Response) => void
  ) {
    onLoadAPI();
    try {
      const response = await fetcher(request);
      onAPIReset();
      onSuccess(response);
      setResult(response);
    } catch (e: any) {
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
