"use client";
import "@mantine/core/styles.css";
import "react-simple-keyboard/build/css/index.css";
import "@mantine/tiptap/styles.css";
import "./globals.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { theme } from "@/lib/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { useRedirectUnauthorized } from "@/hooks/useRedirectUnauthorized";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    useRedirectUnauthorized();

    return (
        <html lang="ru" suppressHydrationWarning>
            <head>
                <ColorSchemeScript />
            </head>
            <body>
                <QueryClientProvider client={new QueryClient()}>
                    <MantineProvider defaultColorScheme="light" theme={theme}>
                        {children}
                    </MantineProvider>{" "}
                </QueryClientProvider>
            </body>
        </html>
    );
}
