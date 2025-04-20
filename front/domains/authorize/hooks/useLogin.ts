import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api";
import { useToken } from "./useToken";
import { useRouter } from "next/navigation";
import { useGetUser } from "@/domains/user/hooks/useGetUser";
import { AxiosError } from "axios";

export const useLogin = (setError: (name: string, val: string) => void) => {
    const [, setToken] = useToken();
    const router = useRouter();

    const fetchUser = useGetUser();
    return useMutation({
        mutationFn: loginUser,
        onSuccess: async (response) => {
            setToken(response.data.accessToken);
            await fetchUser();
            router.push("/recognition");
        },
        onError: (error: any) => {
            setError("password", "Неправильный пароль");
        },
    });
};
