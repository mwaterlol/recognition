import { UserEntity } from "@/types/apiTypes";
import { useLocalStorage } from "@mantine/hooks";
import superjson from "superjson";

export const useUser = () => {
    return useLocalStorage<UserEntity | undefined>({
        key: "userRecognition",
        defaultValue: undefined,
        serialize: superjson.stringify,
        deserialize: (str) =>
            str === undefined ? undefined : superjson.parse(str),
    });
};
