import { NEXT_PUBLIC_API_URL } from "@/env/env";
import { getAuthOptions } from "@/utilities/utils";
import axios from "axios";

export function post<T>(path: string, payload: T) {
  return axios.post(`${NEXT_PUBLIC_API_URL}${path}`, payload, getAuthOptions());
}
