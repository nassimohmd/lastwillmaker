import { z } from "zod";

// Client-side schema for static app
export const formSchema = z.object({
  responses: z.record(z.any()),
  currentStep: z.number(),
  language: z.enum(['en', 'ml']).optional()
});
