"use client";
import { AppShell, Burger, Flex, Title, Text, ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Cookies from "js-cookie";
import { LogOut, ScanText, Store } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import logo from "@/assets/logo.jpeg";
import Image from "next/image";
export default function Header({
    toggle,
    opened,
}: {
    toggle: VoidFunction;
    opened: boolean;
}) {
    const router = useRouter();
    return (
        <AppShell.Header>
            <Flex justify="space-between" align="center" mih="100%" px="md">
                <Burger
                    opened={opened}
                    onClick={toggle}
                    hiddenFrom="sm"
                    size="sm"
                />
                <Flex align="center" gap={6}>
                    {/* <Text component={ScanText} w={30} h={30} c="dark" /> */}
                    <Image src={logo} width={40} height={40} alt="logo" />
                    <Text size="xl" component={Title} order={4} c="dark">
                        Распознавание летописей СПБГУ
                    </Text>
                </Flex>
                <ActionIcon
                    variant="outline"
                    color="red"
                    onClick={() => {
                        Cookies.remove("accessToken");
                        router.push("/authorize");
                    }}
                >
                    <LogOut size={20} />
                </ActionIcon>
            </Flex>
        </AppShell.Header>
    );
}
