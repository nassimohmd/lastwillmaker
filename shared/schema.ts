import { pgTable, text, serial, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const answers = pgTable("answers", {
  id: serial("id").primaryKey(),
  responses: jsonb("responses").notNull().$type<Record<string, any>>(),
  generatedContent: text("generated_content").notNull()
});

export const insertAnswerSchema = createInsertSchema(answers).pick({
  responses: true,
  generatedContent: true
});

export type InsertAnswer = z.infer<typeof insertAnswerSchema>;
export type Answer = typeof answers.$inferSelect;

export const formSchema = z.object({
  responses: z.record(z.any()),
  currentStep: z.number()
});
