import { NEXT_PUBLIC_API_URL } from "@/env/env";
import { getAuthOptions } from "@/utilities/utils";
import axios from "axios";

export function post<T>(path: string, payload: T) {
  return axios.post(`${NEXT_PUBLIC_API_URL}${path}`, payload, getAuthOptions());
}

export function postForm<T extends { [P in string]: string | File }>(
  path: string,
  payload: T
) {
  const formData = new FormData();
  Object.keys(payload).forEach((key) => {
    formData.append(key, payload[key]);
  });
  return axios.post(
    `${NEXT_PUBLIC_API_URL}${path}`,
    formData,
    getAuthOptions()
  );
}
