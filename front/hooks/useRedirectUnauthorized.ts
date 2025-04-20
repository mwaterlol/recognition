import { useGetUser } from "@/domains/user/hooks/useGetUser";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useRedirectUnauthorized = () => {
    const router = useRouter();

    const fetchUser = useGetUser();

    useEffect(() => {
        const accessToken = Cookies.get("accessToken");

        if (!accessToken) {
            router.push("/authorize");
            return;
        }
        fetchUser().catch(() => {
            Cookies.remove("accessToken");
            router.push("/authorize");
            return null;
        });
    }, [router]);
};
