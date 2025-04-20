"use client";

import image from "@/assets/136.jpg";
import Image from "next/image";
import MainLayout from "@/components/layouts/MainLayout";
import FeedbackForm from "@/domains/feedback/components/FeedbackForm";
import {
    Accordion,
    Badge,
    Card,
    Center,
    Divider,
    Flex,
    Group,
    Stack,
    Text,
} from "@mantine/core";

export default function Index() {
    const items = Array.from({ length: 10 }).map((item, index) => (
        <Accordion.Item value={index.toString()} key={index}>
            <Accordion.Control>
                <Flex wrap="nowrap" gap={16}>
                    <Image src={image} width={120} height={80} alt="" />
                    <Stack>
                        <Flex align="center" gap={8}>
                            <Text size="lg" fw={600}>
                                Распознавание {index + 1}
                            </Text>
                            {index < 3 && <Badge>Кинга Name</Badge>}
                        </Flex>
                        <Text c="dimmed" fw={400}>
                            {"Once upon a time..."}
                        </Text>
                    </Stack>
                </Flex>
            </Accordion.Control>
            <Accordion.Panel>
                <Divider orientation="horizontal" mb={20} />
                <Flex gap={8}>
                    <Image src={image} width={500} height={400} alt="" />
                    <Text size="sm">
                        {
                            "Once upon a time, in a land of mystery and wisdom, there were 10 ancient keys: 1, 2, 3, 4, 5, 6, 7, 8, 9, and 0. Together, they opened the gates to knowledge, bound by the marks of unity: - and =. In the heart of this land, the wise letters а, б, в, г, д, є, ж, ѕ, з, ꙁ, and и gathered to preserve the secrets of the ages. They were joined by their companions ї, к, л, м, н, о, п, р, с, т, Ѹ, and ꙋ, who shared stories of the stars and the earth. From the distant mountains came ф, х, ѡ, ц, ч, ш, щ, ъ, ꙑ, and ь, whispering the truths of the winds and rivers. Finally, the elders ѣ, ю, ꙗ, ѧ, ѯ, ѱ, ѳ, and ѵ spoke of the balance between the known and the unknown, guarding the ancient wisdom. Together, they formed a tapestry of meaning, a bridge between the past and the future."
                        }
                    </Text>
                </Flex>
            </Accordion.Panel>
        </Accordion.Item>
    ));
    return (
        <MainLayout>
            <Stack miw="100%" mx={20} ml={40}>
                <Card withBorder>
                    <Stack>
                        <Text fw={500}>Группы распознаваний:</Text>
                        <Flex align="center" gap={8} wrap="wrap">
                            <Badge>Кинга Name</Badge>
                            <Badge>Кинга Name 2</Badge>
                        </Flex>
                    </Stack>
                </Card>
                <Accordion chevronPosition="right" variant="separated">
                    {items}
                </Accordion>
            </Stack>
        </MainLayout>
    );
}
