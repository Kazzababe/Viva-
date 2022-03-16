import { z } from "zod";

export const StartQuizSchema = z.object({
    email: z.string().email(),
    firstName: z.string().min(2).max(50),
    lastName: z.string().max(50).optional().nullable(),
    inUS: z.boolean().refine((arg) => arg, "Viva is only supported in the United States."), // force in US // todo rephrase
});
