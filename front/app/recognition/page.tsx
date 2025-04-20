"use client";
import Dropzone from "@/components/Dropzone";
import MainLayout from "@/components/layouts/MainLayout";
import ResultFrame from "@/domains/recognition/components/ResultFrame";
import { useRecognizeSingleImage } from "@/domains/recognition/hooks/useRecognizeSingleImage";
import { ResultType } from "@/domains/recognition/types";
import {
    Button,
    Collapse,
    Flex,
    Loader,
    LoadingOverlay,
    Stack,
    Text,
} from "@mantine/core";
import { FileWithPath } from "@mantine/dropzone";
import { useSetState } from "@mantine/hooks";
import { useEffect, useState } from "react";

export default function Generation() {
    const [frame, setFrame] = useState<"form" | "loading" | "result">("form");

    const [result, setResult] = useState<ResultType[]>([]);

    const changeResultText = ({
        index,
        text,
    }: {
        index: number;
        text: string;
    }) => {
        setResult((prevState) => {
            // Create a new array with updated `resultText` for the specified index
            const updatedState = prevState.map((item, idx) =>
                idx === index ? { ...item, resultText: text } : item
            );
            return updatedState;
        });
    };
    const recognizeSingleMutation = useRecognizeSingleImage();
    const onSubmit = async (columns: string[]) => {
        setFrame("loading");
        const files: File[] = [];
        const response: ResultType[] = [];
        columns.forEach((data, index) => {
            const matches = data.match(/^data:(.+);base64,(.+)$/);
            if (!matches) {
                console.error(`Invalid base64 string at index ${index}`);
                return;
            }

            const mimeType = matches[1]; // e.g., "image/jpeg"
            const base64Content = matches[2]; // The actual Base64-encoded content
            const extension = mimeType.split("/")[1]; // e.g., "jpeg" or "png"
            const fileName = `file${index}.${extension}`;

            // Decode base64 content
            const binaryContent = atob(base64Content);
            const byteArray = new Uint8Array(binaryContent.length);
            for (let i = 0; i < binaryContent.length; i++) {
                byteArray[i] = binaryContent.charCodeAt(i);
            }

            // Create a Blob and trigger download
            const blob = new Blob([byteArray], { type: mimeType });
            files.push(new File([blob], fileName));
        });
        console.log(files);
        for (const file of files) {
            const { data } = await recognizeSingleMutation.mutateAsync(file);
            response.push({
                image: data.image,
                generatedText: data.text,
                resultText: data.text.replaceAll("\n", "<br/>"),
            });
        }
        setResult(response);
        setFrame("result");
    };
    const frameComponent = {
        form: <Dropzone onSubmit={(columns) => onSubmit(columns)} />,
        loading: null,
        result: (
            <ResultFrame changeResultText={changeResultText} result={result} />
        ),
    }[frame];

    return (
        <MainLayout>
            {recognizeSingleMutation.isLoading ? (
                <LoadingOverlay
                    visible
                    ml={300}
                    mt={80}
                    loaderProps={{
                        children: (
                            <Stack align="center">
                                <Loader size="xl" />
                                <Text size="xl">Распознаем изображение...</Text>
                            </Stack>
                        ),
                    }}
                ></LoadingOverlay>
            ) : (
                <> {frameComponent}</>
            )}
        </MainLayout>
    );
}
