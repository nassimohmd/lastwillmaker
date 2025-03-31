import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background px-4 py-8 sm:p-6">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <Card className="w-full max-w-md mx-auto border border-border/20 shadow-sm rounded-xl overflow-hidden">
        <div className="h-1.5 w-full bg-primary" />
        <CardContent className="pt-8 pb-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-primary/10 shadow-sm">
              <FileText className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-4">
            Digital Will & Testament Generator
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
            Create your digital will by answering a few simple questions. Document your wishes for your digital assets and generate a downloadable document.
          </p>

          <Link href="/questionnaire">
            <Button size="lg" className="w-full sm:w-auto font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm group">
              Start Questionnaire
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
          
          <p className="text-xs text-muted-foreground/70 mt-6">
            Your data remains private and secure
          </p>
        </CardContent>
      </Card>
    </div>
  );
}