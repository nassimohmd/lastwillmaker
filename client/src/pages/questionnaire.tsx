import { useState } from "react";
import { Card } from "@/components/ui/card";
import QuestionForm from "@/components/question-form";
import PdfGenerator from "@/components/pdf-generator";
import { ThemeToggle } from "@/components/theme-toggle";
import { questions } from "@shared/questions";
import { formSchema } from "@shared/schema";
import type { z } from "zod";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

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
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="absolute top-4 left-4">
        <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to home
        </Link>
      </div>
      
      <Card className="w-full max-w-lg mx-auto border border-border/20 shadow-sm">
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