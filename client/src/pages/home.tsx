import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { Link } from "wouter";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background px-4 py-8 sm:p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <Card className="w-full max-w-md mx-auto border border-border/20 shadow-sm">
        <CardContent className="pt-6 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-3 rounded-full bg-primary/10">
              <FileText className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight mb-3">
            Digital Will & Testament Generator
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground mb-8 max-w-lg mx-auto">
            Create your digital will by answering a few simple questions. Document your wishes for your digital assets and generate a downloadable document.
          </p>

          <Link href="/questionnaire">
            <Button size="lg" className="w-full sm:w-auto font-medium">
              Start Questionnaire
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}