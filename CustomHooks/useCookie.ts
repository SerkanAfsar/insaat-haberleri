export default function useCookie(cookieName: string) {
  if (typeof window == "undefined") return;

  const arr = document.cookie;
  console.log(arr, cookieName);
  return true;
}
