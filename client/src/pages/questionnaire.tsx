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
    <div className="min-h-screen w-full flex items-center justify-center bg-black p-4 py-12">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>
      
      <div className="absolute top-6 left-6">
        <Link href="/" className="flex items-center text-sm text-zinc-400 hover:text-white transition-colors group">
          <ArrowLeft className="mr-1.5 h-4 w-4" />
          Back to home
        </Link>
      </div>
      
      <Card className="w-full max-w-lg mx-auto bg-zinc-900 border-0 shadow-lg">
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