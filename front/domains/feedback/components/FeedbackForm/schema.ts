import { z } from "zod";

export const FeedbackSchema = z.object({
    text: z.string().min(1),
    recognitionId: z.string().min(3).max(20),
});

export type FeedbackSchemaType = z.infer<typeof FeedbackSchema>;
