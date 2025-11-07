import useFetchApi from "@/CustomHooks/useFetchApi";
import { GetAllServiceType } from "@/Types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTopLoader } from "nextjs-toploader";

export function useSingleItemById<T>(
  id: number,
  url: string,
  validateKey: string,
) {
  const loader = useTopLoader();
  const { fetchProcess } = useFetchApi(url, "GET");

  const { data, error, isLoading } = useQuery({
    queryKey: [validateKey, { id }],
    queryFn: async () => {
      loader.start();
      const result = await fetchProcess();
      loader.done();
      if (result) {
        return result as T;
      }
    },

    refetchOnWindowFocus: false,
    retry: false,
  });

  return { data, error, isLoading };
}

export function useGetAllData<T>(
  url: string,
  validateKey: string,
  filter: GetAllServiceType,
) {
  const params = new URLSearchParams({
    offset: String(filter.offset),
    count: String(filter.count),
    globalFilter: filter.globalFilter ?? "",
    sorting: JSON.stringify(filter.sorting),
    filters: JSON.stringify(filter.filters),
  });

  const { fetchProcess } = useFetchApi<
    { data: T[]; rowCount: number },
    unknown
  >(`${url}?${params.toString()}`, "GET");
  const { data, error, isPending } = useQuery({
    queryKey: [validateKey, filter],
    queryFn: async () => {
      const result = await fetchProcess(filter);
      if (result) {
        return {
          data: result.data as T[],
          rowCount: result.rowCount,
        };
      }
    },

    refetchOnWindowFocus: true,
    retry: false,
  });
  return { data, error, isPending };
}

export function useCrudData<T extends object, K extends object>(
  url: string,
  method: "POST" | "PUT" | "DELETE",
  validateKey: string,
) {
  const loader = useTopLoader();
  const queryClient = useQueryClient();
  const { fetchProcess } = useFetchApi<T, K>(url, method);
  const { data, error, isPending, isSuccess, mutateAsync } = useMutation({
    onMutate: async () => {
      loader.start();
      await queryClient.cancelQueries({
        queryKey: [validateKey],
      });
    },
    mutationFn: async (data?: K) => {
      const result = await fetchProcess(data);
      return result as T;
    },
    onError: (error) => {
      return error;
    },
    onSuccess: (data: T) => {
      return data;
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: [validateKey] });
      loader.done();
    },
  });
  return { data, error, isSuccess, isPending, mutateAsync };
}
