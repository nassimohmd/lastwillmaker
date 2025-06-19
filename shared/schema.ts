import { z } from "zod";

export const formSchema = z.object({
  responses: z.record(z.any()),
  currentStep: z.number(),
  language: z.enum(['en', 'ml']).optional()
});
