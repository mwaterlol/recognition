"use client";
import { AppShell, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";

export default function MainLayout({
    children,
}: {
    children?: React.ReactNode;
}) {
    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 200,
                breakpoint: "sm",
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <Header toggle={toggle} opened={opened} />

            <Sidebar />

            <AppShell.Main>
                <Stack align="center" miw="100%">
                    {children}
                </Stack>
            </AppShell.Main>
        </AppShell>
    );
}
