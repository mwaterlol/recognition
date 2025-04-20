import { LoginDto, RegisterDto } from "@/types/apiTypes";
import axios from "@/api/axios";

export const registerUser = (data: RegisterDto) => {
    return axios.post<{ accessToken: string }>("/auth/register", data);
};

export const loginUser = (data: LoginDto) => {
    return axios.post<{ accessToken: string }>("/auth/login", data);
};
