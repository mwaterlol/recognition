import React from "react";
import { LoginSchema, LoginSchemaType } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { PasswordInput, TextInput } from "@/components/inputs";
import { Button, Stack } from "@mantine/core";
import { ArrowRight } from "lucide-react";
import { useLogin } from "../../hooks/useLogin";

export default function LoginForm() {
    const form = useForm<LoginSchemaType>({
        resolver: zodResolver(LoginSchema),
        defaultValues: { email: "", password: "" },
    });

    const loginMutation = useLogin((name, val) =>
        form.setError(name as any, { message: val })
    );

    const onSubmit = (data: LoginSchemaType) => {
        try {
            loginMutation.mutateAsync(data);
        } catch {
            form.reset();
        }
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Stack>
                    <TextInput name="email" label="E-mail" />
                    <PasswordInput name="password" label="Пароль" />
                    <Button
                        type="submit"
                        rightSection={<ArrowRight size={18} />}
                    >
                        Войти
                    </Button>
                </Stack>
            </form>
        </FormProvider>
    );
}
