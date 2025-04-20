"use client";
import MainLayout from "@/components/layouts/MainLayout";
import { Badge, Stack, Table } from "@mantine/core";

export default function Index() {
    const elements = [
        {
            index: 0,
            text: "Help me with....",
            recognitionId: "123123123",
            isAnswered: false,
        },
        {
            index: 1,
            text: "Неправильно распознает....",
            recognitionId: "1111",
            isAnswered: true,
        },
        {
            index: 2,
            text: "Help me with....",
            recognitionId: "33333",
            isAnswered: false,
        },
        {
            index: 3,
            text: "Help me with....",
            recognitionId: "-",
            isAnswered: true,
        },
        {
            index: 4,
            text: "Help me with....",
            recognitionId: "-",
            isAnswered: false,
        },
    ];
    const rows = elements.map((element) => (
        <Table.Tr key={element.index}>
            <Table.Td>{element.text}</Table.Td>
            <Table.Td>{element.recognitionId}</Table.Td>
            <Table.Td>
                <Badge bg={element.isAnswered ? "green" : "blue"}>
                    {element.isAnswered ? "Обработан" : "В обработке"}
                </Badge>
            </Table.Td>
        </Table.Tr>
    ));
    return (
        <MainLayout>
            <Stack miw="100%" mx={20} ml={40}>
                <Table highlightOnHover>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Текст обращения</Table.Th>
                            <Table.Th>ID распознавания</Table.Th>
                            <Table.Th>Статус</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </Stack>
        </MainLayout>
    );
}
