"use client";
import { Button, Flex, Stack } from "@mantine/core";
import CharacterButtonRow from "../CharacterButtonRow";
import { useState } from "react";
import { ArrowBigUpDash, CaseUpper } from "lucide-react";
import { lowerCaseList, upperCaseList } from "./consts";

export default function OrganizedButtonGrid({
    handleButtonClick,
}: {
    handleButtonClick: (val: string) => void;
}) {
    const [uppercase, setUppercase] = useState(false);
    return (
        <Stack
            miw="100%"
            p={10}
            bg="white"
            style={(theme) => ({
                borderTop: `1px solid ${theme.colors.gray[3]}`,
            })}
        >
            <Flex gap={8} maw="calc(100% - 70px)" align="center">
                <Button
                    maw="fit-content"
                    miw="fit-content"
                    onClick={() => setUppercase((prev) => !prev)}
                    h={45}
                >
                    <CaseUpper />
                </Button>
                {/* <CharacterButtonRow
                    startCode="0030"
                    rowCount={10}
                    handleButtonClick={handleButtonClick}
                /> */}
                <Flex
                    wrap="wrap"
                    gap={8}
                    miw="100%"
                    align="center"
                    justify="space-between"
                >
                    {lowerCaseList[0].map((charCode, i) => (
                        <Button
                            key={i + charCode}
                            onClick={() =>
                                handleButtonClick(
                                    String.fromCharCode(parseInt(charCode, 16))
                                )
                            }
                            style={{
                                fontFamily: "FlaviusUniversal",
                                fontSize: 25,
                                flexGrow: 1,
                            }}
                            variant="outline"
                            h={45}
                        >
                            {String.fromCharCode(parseInt(charCode, 16))}
                        </Button>
                    ))}
                </Flex>
            </Flex>

            {(uppercase ? upperCaseList : lowerCaseList).slice(1).map((row) => (
                <Flex
                    wrap="wrap"
                    gap={8}
                    miw="100%"
                    align="center"
                    justify="space-between"
                >
                    {row.map((charCode, i) => (
                        <Button
                            key={i + charCode}
                            onClick={() =>
                                handleButtonClick(
                                    String.fromCharCode(parseInt(charCode, 16))
                                )
                            }
                            style={{
                                fontFamily: "FlaviusUniversal",
                                fontSize: 25,
                                flexGrow: 1,
                            }}
                            variant="outline"
                            h={45}
                        >
                            {String.fromCharCode(parseInt(charCode, 16))}
                        </Button>
                    ))}
                </Flex>
            ))}
        </Stack>
    );
}
