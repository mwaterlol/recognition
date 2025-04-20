import {
    Button,
    Card,
    Center,
    Divider,
    SegmentedControl,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import React from "react";
import RegisterForm from "../RegisterForm";
import LoginForm from "../LoginForm";

const FrameTypes = ["login", "register"] as const;
export default function AuthorizeForm() {
    const [frame, setFrame] = useToggle(FrameTypes);

    const chosenFrame = { login: <LoginForm />, register: <RegisterForm /> }[
        frame
    ];
    return (
        <Center h="100vh" w="100vw">
            <Card w={400} withBorder>
                <Stack>
                    <Title order={3} style={{ textAlign: "center" }}>
                        Добро пожаловать!
                    </Title>
                    <SegmentedControl
                        data={[
                            { label: "Войти", value: "login" },
                            { label: "Зарегестрироваться", value: "register" },
                        ]}
                        onChange={(value) =>
                            setFrame(value as (typeof FrameTypes)[number])
                        }
                    />
                    {chosenFrame}
                    {/* <Divider orientation="horizontal" />
                    <Button variant="outline">Войти через Яндекс</Button>
                    <Button variant="outline">Войти через Google</Button> */}
                </Stack>
            </Card>
        </Center>
    );
}
