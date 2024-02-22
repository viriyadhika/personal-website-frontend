import { NEXT_PUBLIC_API_URL } from "@/env/env";
import axios from "axios";

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

export function post<T>(path: string, payload: T) {
  return axios.post(`${NEXT_PUBLIC_API_URL}${path}`, payload, {
    withCredentials: true,
    headers: {
      "x-csrf-token": getCookie("csrf_access_token"),
    },
  });
}
