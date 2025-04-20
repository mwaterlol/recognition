import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email({ message: "Некорректный e-mail" }),
    password: z
        .string()
        .min(6, { message: "Минимальная длина пароль 6 символов" })
        .max(20),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

