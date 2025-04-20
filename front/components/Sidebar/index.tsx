"use client";
import { useUser } from "@/domains/user/hooks/useUser";
import {
    AppShell,
    Box,
    Button,
    Flex,
    ScrollArea,
    Stack,
    Text,
} from "@mantine/core";
import {
    List,
    ListCollapseIcon,
    MessageCircle,
    Settings,
    Sparkles,
    UserCircle,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function Sidebar() {
    const [user] = useUser();

    const items = [
        {
            label: "Распознавание",
            href: "/recognition",
            icon: <Sparkles size={20} />,
        },
        // {
        //     label: "История генераций",
        //     href: "/recognition-history",
        //     icon: <ListCollapseIcon size={20} />,
        // },
        // {
        //     label: "Создать обращение",
        //     href: "/feedback",
        //     icon: <MessageCircle size={20} />,
        // },
        // {
        //     label: "История обращений",
        //     href: "/feedback-history",
        //     icon: <List size={20} />,
        // },
        // {
        //     label: "Настройки",
        //     href: "/settings",
        //     icon: <Settings size={20} />,
        // },
    ];

    const pathname = usePathname();
    return (
        <AppShell.Navbar w={220}>
            <AppShell.Section
                grow
                component={ScrollArea}
                p="md"
                px="sm"
                style={{ overflowX: "hidden" }}
                w={220}
            >
                <Stack w={"100%"}>
                    {items.map((item) => (
                        <Button
                            key={item.href}
                            component="a"
                            href={item.href}
                            variant={
                                pathname === item.href ? "light" : "subtle"
                            }
                            style={(theme) => ({
                                fontSize: theme.fontSizes.sm,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "start",
                            })}
                            w={196}
                            leftSection={item.icon}
                        >
                            {item.label}
                        </Button>
                    ))}
                </Stack>
            </AppShell.Section>
            <AppShell.Section h={50}>
                <Box w={219} h={50} px="md">
                    <Flex w={219} h={50} justify="space-between" align="center">
                        <Flex align="center" gap={6}>
                            <UserCircle size={30} />
                            <Stack gap={0}>
                                <Text size="md" truncate maw={150}>
                                    {user?.username}
                                </Text>
                                <Text size="sm" c="dimmed" truncate maw={150}>
                                    {user?.email}
                                </Text>
                            </Stack>
                        </Flex>
                    </Flex>
                </Box>
            </AppShell.Section>
        </AppShell.Navbar>
    );
}
