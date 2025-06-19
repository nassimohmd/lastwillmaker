import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import QuestionForm from "@/components/question-form";
import { getQuestions } from "@shared/questions";
import { formSchema } from "@shared/schema";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "wouter";
import { generateContent } from "@shared/questions";

type FormData = z.infer<typeof formSchema>;

export default function Questionnaire() {
  const [completed, setCompleted] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ml'>('en');
  const [formData, setFormData] = useState<FormData>({
    responses: {},
    currentStep: 0,
    language: 'en'
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
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">Your Will & Testament</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Your will has been generated. You can copy the text below and save it to a document.
              </p>
            </div>

            <div className="mb-6">
              <textarea
                className="w-full h-96 p-4 border rounded-md text-sm font-mono resize-none bg-background text-foreground"
                value={generateContent(formData.responses, language)}
                readOnly
              />
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={() => setCompleted(false)}
                variant="outline"
                className="flex-1"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Form
              </Button>
              <Button 
                onClick={() => {
                  navigator.clipboard.writeText(generateContent(formData.responses, language));
                  // You could add a toast notification here if you want
                }}
                className="flex-1"
              >
                Copy to Clipboard
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}