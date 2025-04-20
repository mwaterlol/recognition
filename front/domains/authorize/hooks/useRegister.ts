import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api";
import { useToken } from "./useToken";
import { useRouter } from "next/navigation";
import { useGetUser } from "@/domains/user/hooks/useGetUser";

export const useRegister = () => {
    const [, setToken] = useToken();
    const router = useRouter();

    const fetchUser = useGetUser();
    return useMutation({
        mutationFn: registerUser,
        onSuccess: async (response) => {
            setToken(response.data.accessToken);
            await fetchUser();
            router.push("/recognition");
        },
        onError: () => console.log(1),
    });
};
