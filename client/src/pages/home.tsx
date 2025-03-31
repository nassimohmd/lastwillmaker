import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black px-4 py-8 sm:p-6">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>
      
      <Card className="w-full max-w-md mx-auto bg-zinc-900 border-0 shadow-lg">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="flex justify-center mb-8">
            <div className="p-2.5 rounded-full bg-zinc-800">
              <FileText className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-medium text-white tracking-tight mb-3">
            Digital Will & Testament Generator
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 mb-8 max-w-lg mx-auto leading-relaxed">
            Create your digital will by answering a few simple questions. Document your wishes for your digital assets and generate a downloadable document.
          </p>

          <Link href="/questionnaire">
            <Button size="lg" className="w-full sm:w-auto bg-white hover:bg-zinc-200 text-black transition-colors rounded-md font-normal group">
              Start Questionnaire
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          
          <p className="text-xs text-zinc-500 mt-6">
            Your data remains private and secure
          </p>
        </CardContent>
      </Card>
    </div>
  );
}