"use client";
import { Stack, Flex, Button } from "@mantine/core";

export default function CharacterButtonRow({
    startCode,
    rowCount,
    coefficient = 1,
    handleButtonClick,
}: {
    startCode: string;
    rowCount: number;
    coefficient?: number;
    handleButtonClick: (val: string) => void;
}) {
    return (
        <Flex
            wrap="wrap"
            gap={8}
            miw="100%"
            align="center"
            justify="space-between"
        >
            {Array.from({ length: rowCount }).map((_, i) => {
                const charCode = parseInt(startCode, 16) + i * coefficient;
                return (
                    <Button
                        key={i}
                        onClick={() =>
                            handleButtonClick(String.fromCharCode(charCode))
                        }
                        style={{
                            fontFamily: "FlaviusUniversal",
                            fontSize: 25,
                            flexGrow: 1,
                        }}
                        variant="outline"
                        h={45}
                    >
                        {String.fromCharCode(charCode)}
                    </Button>
                );
            })}
        </Flex>
    );
}
