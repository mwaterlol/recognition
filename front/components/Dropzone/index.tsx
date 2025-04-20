"use client";
import {
    Flex,
    Group,
    Stack,
    Text,
    rem,
    Image,
    Button,
    Title,
    Box,
    ActionIcon,
    CloseButton,
} from "@mantine/core";
import {
    Dropzone as MantineDropzone,
    DropzoneProps,
    IMAGE_MIME_TYPE,
    FileWithPath,
} from "@mantine/dropzone";
import { Upload, X, ImageIcon, GripHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export default function Dropzone({
    onSubmit,
    ...props
}: Partial<Omit<DropzoneProps, "onSubmit">> & {
    onSubmit: (columns: string[]) => void;
}) {
    const [files, setFiles] = useState<FileWithPath[]>([]);

    const [output, setOutput] = useState<string[]>([]);
    const [crop, setCrop] = useState<Crop>();

    const imageRef = useRef<HTMLImageElement | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    let [imgIndex, setImageIndex] = useState(0);
    const cropImageNow = () => {
        if (isProcessing || !files[0] || !crop || !imageRef.current) return;
        console.log(crop);
        const img = imageRef.current;
        const objectURL = URL.createObjectURL(files[0]);
        img.src = objectURL;
        setIsProcessing(true);
        img.onload = () => {
            if (isProcessing || !files[0] || !crop || !imageRef.current) return;
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (ctx) {
                console.log(123);
                const scaleX = img.naturalWidth / img.width;
                const scaleY = img.naturalHeight / img.height;

                const pixelRatio = window.devicePixelRatio;
                canvas.width = crop.width * pixelRatio;
                canvas.height = crop.height * pixelRatio;
                ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
                ctx.imageSmoothingQuality = "high";

                ctx.drawImage(
                    img,
                    crop.x * scaleX,
                    crop.y * scaleY,
                    crop.width * scaleX,
                    crop.height * scaleY,
                    0,
                    0,
                    crop.width,
                    crop.height
                );

                const base64Image = canvas.toDataURL("image/jpeg");
                if (!output.includes(base64Image))
                    setOutput((prev) => {
                        const newArray = prev;
                        newArray[imgIndex] = base64Image;
                        setImageIndex((prev) => prev + 1);
                        return newArray;
                    });

                setIsProcessing(false);
            }
        };
    };

    return (
        <Stack align="center">
            <MantineDropzone
                onDrop={(files) => setFiles((prev) => [...prev, files[0]])}
                onReject={(files) => console.log("rejected files", files)}
                maxSize={5 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
                style={{
                    border: "1px dashed gray",
                    borderRadius: "var(--mantine-spacing-md)",
                    cursor: "pointer",
                    display: files.length > 0 ? "none" : undefined,
                }}
                maw={400}
                mr={0}
                {...props}
            >
                <Group
                    justify="center"
                    gap="xl"
                    mih={220}
                    style={{ pointerEvents: "none" }}
                >
                    <MantineDropzone.Accept>
                        <Stack w={380} align="center">
                            <Upload
                                style={{
                                    width: rem(52),
                                    height: rem(52),
                                    color: "var(--mantine-color-blue-6)",
                                }}
                                strokeWidth={1.5}
                            />
                        </Stack>
                    </MantineDropzone.Accept>
                    <MantineDropzone.Reject>
                        <X
                            style={{
                                width: rem(52),
                                height: rem(52),
                                color: "var(--mantine-color-red-6)",
                            }}
                            strokeWidth={1.5}
                        />
                    </MantineDropzone.Reject>
                    <MantineDropzone.Idle>
                        {files.length > 0 ? (
                            <></>
                        ) : (
                            <Stack align="center">
                                <ImageIcon
                                    style={{
                                        width: rem(52),
                                        height: rem(52),
                                        color: "var(--mantine-color-dimmed)",
                                    }}
                                    strokeWidth={1.5}
                                />
                                <Stack align="center" miw="100%">
                                    <Text
                                        size="xl"
                                        inline
                                        style={{ textAlign: "center" }}
                                    >
                                        Перетащите сюда изображение, или
                                        нажмите, чтобы выбрать файл
                                    </Text>
                                </Stack>
                            </Stack>
                        )}
                    </MantineDropzone.Idle>
                </Group>
            </MantineDropzone>

            {files.length > 0 && (
                <>
                    <Stack align="center">
                        <Title order={3}>
                            Выделите все стобцыы на страницах
                        </Title>
                        <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
                            <Image
                                src={URL.createObjectURL(files[0])}
                                mah="70vh"
                                onLoad={() =>
                                    URL.revokeObjectURL(
                                        URL.createObjectURL(files[0])
                                    )
                                }
                                style={{
                                    borderRadius: "var(--mantine-spacing-md)",
                                    objectFit: "contain",
                                }}
                                ref={imageRef}
                            />
                        </ReactCrop>
                        <Flex justify="center" align="center" gap={4}>
                            <Button
                                onClick={() => {
                                    cropImageNow();
                                }}
                                variant="outline"
                            >
                                Выделить столбец
                            </Button>
                            {output.length > 0 && (
                                <Button
                                    onClick={() => {
                                        onSubmit(
                                            output.filter(
                                                (item) =>
                                                    item !== null &&
                                                    item !== undefined
                                            )
                                        );
                                    }}
                                >
                                    Отправить на распознавание
                                </Button>
                            )}
                        </Flex>
                        <Stack mt={10} mx={10} miw="100%">
                            <Title order={4}>Выделенные столбцы</Title>
                            <Flex gap={4} mih="100%" wrap={"wrap"}>
                                {output &&
                                    output.map((image, index) => (
                                        <Box
                                            key={image}
                                            style={{ position: "relative" }}
                                        >
                                            <CloseButton
                                                style={{
                                                    position: "absolute",
                                                    right: 10,
                                                    top: 10,
                                                }}
                                                variant="subtle"
                                                bg="black"
                                                c="white"
                                                onClick={() => {
                                                    setOutput((prev) =>
                                                        prev.filter(
                                                            (
                                                                _elem,
                                                                elemIndex
                                                            ) =>
                                                                elemIndex !==
                                                                index
                                                        )
                                                    );
                                                    setImageIndex(
                                                        (prev) => prev - 1
                                                    );
                                                }}
                                            />
                                            <Image src={image} />
                                        </Box>
                                    ))}
                            </Flex>
                        </Stack>
                    </Stack>
                </>
            )}
        </Stack>
    );
}
