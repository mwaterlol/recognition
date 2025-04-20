"use client";
import {
    AppShell,
    Burger,
    Flex,
    Title,
    Text,
    Button,
    ActionIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Cookies from "js-cookie";
import { LogOut, ScanText, Store } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

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
                    <Text component={ScanText} w={30} h={30} c="dark" />
                    <Text size="xl" component={Title} order={4} c="dark">
                        Распознавание летописей
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
