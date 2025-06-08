import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import QuestionForm from "@/components/question-form";
import PdfGenerator from "@/components/pdf-generator";
import { getQuestions } from "@shared/questions";
import { formSchema } from "@shared/schema";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "wouter";

type FormData = z.infer<typeof formSchema>;

export default function Questionnaire() {
  const [completed, setCompleted] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ml'>('en');
  const [formData, setFormData] = useState<FormData>({
    responses: {},
    currentStep: 0
  });
  const [location] = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const lang = urlParams.get('lang');
    if (lang === 'ml' || lang === 'en') {
      setLanguage(lang);
    }
  }, [location]);

  const handleComplete = (data: FormData) => {
    setFormData({ ...data, language });
    setCompleted(true);
  };

  const questions = getQuestions(language);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-background via-background/80 to-background/50 p-4">
      
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
            language={language}
            onComplete={handleComplete}
          />
        ) : (
          <PdfGenerator 
            responses={formData.responses} 
            language={language}
            onBack={() => setCompleted(false)} 
          />
        )}
      </Card>
    </div>
  );
}