"use client";
import { useMutation } from "@tanstack/react-query";
import { recognizeSingleImage } from "../api";

export const useRecognizeSingleImage = () => {
    return useMutation({
        mutationFn: recognizeSingleImage,
        onSuccess: ({ data }) => {
            console.log("Image processed successfully:", data);
            return data;
        },
        onError: (error) => {
            console.error("Error processing image:", error);
        },
    });
};
