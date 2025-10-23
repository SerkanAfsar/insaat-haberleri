import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "react-toastify";

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

      if (response.status === 401) {
        toast.error("Yetkisiz erişim. Oturumunuz süresi dolmuş olabilir.", {
          position: "top-right",
        });

        setTimeout(() => {
          router.push("/Login");
        }, 3000);

        throw new Error(
          "Yetkisiz erişim. Oturumunuz süresi dolmuş olabilir.111",
        );
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Bilinmeyen hata");
      }

      const result = (await response.json()) as T;
      return result;
    },
    [url, router, method],
  );

  return {
    fetchProcess,
  };
}
