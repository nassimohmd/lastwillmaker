import { useState } from "react";
import { Card } from "@/components/ui/card";
import QuestionForm from "@/components/question-form";
import PdfGenerator from "@/components/pdf-generator";
import { ThemeToggle } from "@/components/theme-toggle";
import { questions } from "@shared/questions";
import { formSchema } from "@shared/schema";
import type { z } from "zod";

type FormData = z.infer<typeof formSchema>;

export default function Questionnaire() {
  const [completed, setCompleted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    responses: {},
    currentStep: 0
  });

  const handleComplete = (data: FormData) => {
    setFormData(data);
    setCompleted(true);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-background to-muted p-4">
      <ThemeToggle />
      <Card className="w-full max-w-lg mx-auto">
        {!completed ? (
          <QuestionForm
            questions={questions}
            onComplete={handleComplete}
          />
        ) : (
          <PdfGenerator responses={formData.responses} />
        )}
      </Card>
    </div>
  );
}