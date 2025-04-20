import { QueryClient, QueryFunctionContext } from "@tanstack/react-query";

import type { AxiosRequestConfig } from "axios";

import axios from "./axios";

export const defaultQueryFn = async <T>({
    queryKey,
    signal,
}: QueryFunctionContext<readonly unknown[]>) => {
    try {
        if (queryKey.length < 3) {
            throw new Error("Invalid queryKey");
        }

        const [basePath, , { path, method, ...axiosParams }] = queryKey as [
            string,
            string,
            AxiosRequestConfig & { path?: string },
        ];

        const { data } = await axios<T>({
            url: `${basePath}${
                path ? (path.startsWith("/") ? path : `/${path}`) : ""
            }`,
            method: method || "get",
            signal,
            ...axiosParams,
        });

        return Promise.resolve(data);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            retry: 1,
            queryFn: defaultQueryFn,
            staleTime: 10000,
        },
        mutations: {
            retry: 0,
        },
    },
});
