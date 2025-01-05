export const noop = () => {};

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

export function getAuthOptions() {
  return {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${getCookie("access_token_cookie")}`,
    },
  };
}
