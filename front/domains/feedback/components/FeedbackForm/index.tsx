import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { FeedbackSchema, FeedbackSchemaType } from "./schema";
import {
    ActionIcon,
    Button,
    Card,
    Flex,
    Select,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import { Textarea } from "@/components/inputs";
import { useDisclosure } from "@mantine/hooks";
import { SquareArrowOutUpRight } from "lucide-react";

export default function FeedbackForm() {
    const form = useForm<FeedbackSchemaType>({
        resolver: zodResolver(FeedbackSchema),
        defaultValues: { text: "", recognitionId: "" },
    });
    const [opened, { toggle }] = useDisclosure();
    const onSubmit = (data: FeedbackSchemaType) => {
        try {
            console.log(data);
        } catch {
            form.reset();
        }
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card withBorder miw={400}>
                    <Stack>
                        <Title order={3} style={{ textAlign: "center" }}>
                            Создайте обращение
                        </Title>
                        <Textarea
                            label="Текст обращения"
                            name="text"
                            rows={8}
                            withAsterisk
                        />
                        <Select
                            clearable
                            data={[
                                "Распознавание 1",
                                "Распознавание 2",
                                "Распознавание 3",
                            ]}
                            label="Распознавание"
                            renderOption={(item) => (
                                <Flex
                                    align="center"
                                    justify="space-between"
                                    miw="100%"
                                >
                                    <Text>{item.option.label}</Text>
                                    <ActionIcon
                                        variant="subtle"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <SquareArrowOutUpRight size={"1rem"} />
                                    </ActionIcon>
                                </Flex>
                            )}
                        />
                        <Button variant="light">Отправить обращение</Button>
                    </Stack>
                </Card>
            </form>
        </FormProvider>
    );
}
