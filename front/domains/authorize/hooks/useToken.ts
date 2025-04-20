import Cookies from "js-cookie";

export const useToken = (): [string, (value: string) => void] => {
    return [
        Cookies.get("accessToken") as string,
        ((value: string) => Cookies.set("accessToken", value)) as (
            value: string
        ) => void,
    ];
};
