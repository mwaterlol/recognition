"use client";

import MainLayout from "@/components/layouts/MainLayout";
import FeedbackForm from "@/domains/feedback/components/FeedbackForm";
import { Center, Stack } from "@mantine/core";

export default function Index() {
    return (
        <MainLayout>
            <Center mih="100%">
                <FeedbackForm />
            </Center>
        </MainLayout>
    );
}
