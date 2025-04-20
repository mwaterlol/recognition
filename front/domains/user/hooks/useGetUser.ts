import axios, { isAxiosError } from "@/api/axios";
import { UserEntity } from "@/types/apiTypes";
import { useUser } from "./useUser";
import { queryClient } from "@/api/queryClient";
import { Cookie } from "lucide-react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const useGetUser = () => {
    const [, setUser] = useUser();
    const router = useRouter();
    const getUser = async () => {
        try {
            const response = await axios.get<UserEntity>("/user");
            setUser(response.data);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                console.error("Error fetching user:", error.message);
                Cookies.remove("accessToken");
                router.push("/authorize");
            }
            throw error;
        }
    };

    return () =>
        queryClient.fetchQuery({ queryFn: getUser, queryKey: ["user"] });
};
