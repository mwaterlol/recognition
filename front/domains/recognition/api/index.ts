import axios from "@/api/axios";
import { RecognitionResponse } from "../types";

export const recognizeSingleImage = (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    return axios.post<RecognitionResponse>(
        "/recognition/post-single",
        formData,
        {
            headers: { "Content-Type": "multipart/form-data" },
        }
    );
};
