import { useState } from "react";
import { Card } from "@/components/ui/card";
import QuestionForm from "@/components/question-form";
import PdfGenerator from "@/components/pdf-generator";
import { ThemeToggle } from "@/components/theme-toggle";
import { questions } from "@shared/questions";
import { formSchema } from "@shared/schema";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

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
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-background via-background/80 to-background/50 p-4">
      <ThemeToggle />
      
      {/* Back Button */}
      <Link href="/">
        <Button 
          variant="ghost" 
          size="icon" 
          className="fixed top-4 left-4 rounded-full w-10 h-10"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </Link>
      
      <Card className="w-full max-w-lg mx-auto shadow-lg border-2 border-border/5">
        {!completed ? (
          <QuestionForm
            questions={questions}
            onComplete={handleComplete}
          />
        ) : (
          <PdfGenerator 
            responses={formData.responses} 
            onBack={() => setCompleted(false)} 
          />
        )}
      </Card>
    </div>
  );
}