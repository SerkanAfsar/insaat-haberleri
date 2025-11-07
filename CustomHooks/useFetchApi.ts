import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "react-toastify";

async function getContent(response: Response) {
  const contentHeader = response.headers.get("Content-Type");
  return contentHeader && contentHeader == "application/json"
    ? await response.json()
    : null;
}

export default function useFetchApi<T, K>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
) {
  const router = useRouter();

  const fetchProcess = useCallback(
    async (data?: K) => {
      const request: RequestInit = {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        method,
      };
      if (data && method !== "GET") {
        request.body = JSON.stringify(data);
      }

      const response = await fetch(url, request);
      const result = await getContent(response);

      if (response.status === 401) {
        setTimeout(() => {
          router.push("/Login");
        }, 3000);
      }

      if (response.ok) {
        if (method != "GET") {
          toast.success("İşlem Başarılı", { position: "top-right" });
        }
      } else {
        toast.error(result?.message || "Bilinmeyen Hata", {
          position: "top-right",
        });
      }

      return result as T;
    },
    [url, router, method],
  );

  return {
    fetchProcess,
  };
}
