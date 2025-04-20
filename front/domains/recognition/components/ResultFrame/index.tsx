"use client";
import {
    Button,
    Card,
    Divider,
    Flex,
    Text,
    Stack,
    Title,
    Modal,
} from "@mantine/core";
import React, { useRef, useState } from "react";
import image from "@/assets/136.jpg";
import Image from "next/image";
import Keyboard from "react-simple-keyboard";
import { useDisclosure, useInputState } from "@mantine/hooks";
import { ChevronDown, ChevronUp, DownloadIcon } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";
import OrganizedButtonGrid from "./OrganizedButtonGrid";
//@ts-ignore
import HTMLtoDOCX from "html-to-docx";
import { saveAs } from "file-saver";
import { ResultType } from "../../types";

export default function ResultFrame({
    result,
    changeResultText,
}: {
    result: ResultType[];
    changeResultText: ({
        index,
        text,
    }: {
        index: number;
        text: string;
    }) => void;
}) {
    const [opened, { toggle }] = useDisclosure(true);
    const [openedModal, { toggle: toggleModal }] = useDisclosure(false);

    const handleButtonClick = (char: string) => {
        if (editorRef.current) {
            editorRef.current.insertTextAtCursor(char);
        }
    };

    const [resultCombined, setResultCombined] = useState("");
    const editorRef = useRef<any>(null);
    const downloadFile = async () => {
        const string = result.map((res) => res.resultText).join("<p/><p/>");
        const splitResults = result.map(({ resultText }) =>
            resultText.split("<br/>")
        );

        // Find the max number of lines across all columns
        const maxLines = Math.max(...splitResults.map((lines) => lines.length));

        // Find the max width of each column for proper alignment
        const maxColWidths = splitResults.map((col) =>
            Math.max(...col.map((line) => line.length), 0)
        );

        // Function to pad strings for alignment
        const padRight = (text: string, length: number) =>
            text + "&nbsp;".repeat(length - text.length);

        let formattedString = "";

        // Iterate over column pairs (2 per row)
        for (let colIndex = 0; colIndex < splitResults.length; colIndex += 2) {
            const col1 = splitResults[colIndex];
            const col2 = splitResults[colIndex + 1] || []; // Get second column if exists

            const maxRowLines = Math.max(col1.length, col2.length || 0); // Max lines in the pair

            for (let i = 0; i < maxRowLines; i++) {
                const text1 = col1[i] || "";
                const text2 = col2[i] || "";

                // Pad first column to align second column
                const paddedText1 = padRight(text1, maxColWidths[colIndex]);

                formattedString += `${paddedText1}&emsp;&emsp;&emsp;${text2}<br/>`;
            }

            formattedString += "<br/>"; // Add extra space between row pairs
        }

        console.log(formattedString);
        setResultCombined(formattedString);
        toggleModal();
        // console.log(result.map((res) => res.resultText));
        // const data = await HTMLtoDOCX(string);
        // saveAs(data, "result.docx");
        // const formattedString = result
        //     .reduce((acc, res, index) => {
        //         if (index % 2 === 0) {
        //             acc.push([res.resultText]); // Start a new row
        //         } else {
        //             acc[acc.length - 1].push(res.resultText); // Add to the current row
        //         }
        //         return acc;
        //     }, [])
        //     .map((pair) => pair.join("&emsp;&emsp;&emsp;")) // Join columns with tabs
        //     .join("<br>"); // Join rows with newlines
        // console.log(formattedString);
        // const data = await HTMLtoDOCX(formattedString);
        // saveAs(data, "result.docx");
    };
    return (
        <Stack pb={370}>
            <Title order={3}>Результаты распознавания:</Title>
            {/* <Card withBorder>
                <Stack>
                    <Title order={5}>Условные обозначения:</Title>
                    <Flex>
                        <span style={{ color: "#F03E3E" }}>12345</span>
                        <Text>
                            - текст, в котором высока вероятность ошибки
                        </Text>
                    </Flex>
                    <Flex>
                        <u>12345</u>
                        <Text>- текст, который находится под "домиком"</Text>
                    </Flex>
                </Stack>
            </Card> */}
            {result &&
                Array.isArray(result) &&
                result.map((elem, index) => {
                    const matches = elem.image.match(/^data:(.+);base64,(.+)$/);
                    if (!matches) {
                        console.error(
                            `Invalid base64 string at index ${index}`
                        );
                        return;
                    }
                    const mimeType = matches[1];
                    const base64Content = matches[2];
                    const extension = mimeType.split("/")[1];

                    // Decode base64 content
                    const binaryContent = atob(base64Content);
                    const byteArray = new Uint8Array(binaryContent.length);
                    for (let i = 0; i < binaryContent.length; i++) {
                        byteArray[i] = binaryContent.charCodeAt(i);
                    }

                    // Create a Blob and trigger download
                    const blob = new Blob([byteArray], { type: mimeType });
                    return (
                        <Flex
                            align="start"
                            miw="100%"
                            ml={10}
                            gap={20}
                            key={elem.image}
                        >
                            <Image
                                src={URL.createObjectURL(blob)}
                                alt="image"
                                height={800}
                                width={300}
                                style={{
                                    objectFit: "contain",
                                    minHeight: "100%",
                                    marginTop: 200,
                                }}
                            />
                            <Stack style={{ width: 300 }}>
                                <RichTextEditor
                                    value={elem.resultText}
                                    onChange={(text) =>
                                        changeResultText({ index, text })
                                    }
                                    ref={editorRef}
                                />
                            </Stack>
                        </Flex>
                    );
                })}
            <Divider orientation="horizontal" h={2} w="100%" />

            <Button
                rightSection={<DownloadIcon size={20} />}
                onClick={downloadFile}
            >
                Сохранить
            </Button>
            <Stack
                style={{
                    position: "fixed",
                    left: 220,
                    bottom: 0,
                    zIndex: 100,
                }}
                miw="calc(100vw - 220px)"
                gap={0}
            >
                {opened && (
                    <OrganizedButtonGrid
                        handleButtonClick={(val) => handleButtonClick(val)}
                    />
                )}
                <Button variant="white" onClick={toggle}>
                    {opened ? <ChevronDown /> : <ChevronUp />}
                </Button>
            </Stack>
            <Modal
                opened={openedModal}
                size="xl"
                onClose={() => toggleModal()}
                title={<Title order={3}>Итоговый реузльтат:</Title>}
            >
                <Text dangerouslySetInnerHTML={{ __html: resultCombined }} />
                <Flex
                    style={{
                        position: "sticky",
                        bottom: 0,
                        width: "100%",
                    }}
                    bg="white"
                    py="xs"
                >
                    <Button
                        rightSection={<DownloadIcon size={20} />}
                        onClick={downloadFile}
                        miw="100%"
                    >
                        Сохранить
                    </Button>
                </Flex>
            </Modal>
        </Stack>
    );
}
