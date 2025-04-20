"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { RegisterSchema, RegisterSchemaType } from "./schema";
import { Button, Stack } from "@mantine/core";
import { PasswordInput, TextInput } from "@/components/inputs";
import { ArrowRight } from "lucide-react";
import { useRegister } from "../../hooks/useRegister";

export default function RegisterForm() {
    const form = useForm<RegisterSchemaType>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: { email: "", username: "", password: "" },
    });

    const registerMutation = useRegister();
    const onSubmit = (data: RegisterSchemaType) => {
        try {
            registerMutation.mutateAsync(data);
        } catch {
            form.reset();
        }
    };
    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Stack>
                    <TextInput name="username" label="Ваше имя" />
                    <TextInput name="email" label="E-mail" />
                    <PasswordInput name="password" label="Пароль" />
                    <Button
                        type="submit"
                        rightSection={<ArrowRight size={18} />}
                    >
                        Зарегестрироваться
                    </Button>
                </Stack>
            </form>
        </FormProvider>
    );
}
