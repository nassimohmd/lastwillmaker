import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-background via-background/80 to-background/50 px-4 py-8 sm:p-4">
      <Card className="w-full max-w-md mx-auto shadow-lg border-2 border-border/5">
        <CardContent className="pt-6 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-3 rounded-full bg-primary/10">
              <FileText className="h-12 w-12 sm:h-16 sm:w-16 text-primary" />
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent tracking-tight mb-4">
            Will & Testament Generator
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
            Create your digital will easily by answering a few simple questions. We'll help you document your wishes for your digital assets and generate a downloadable document.
          </p>

          <Link href="/questionnaire">
            <Button size="lg" className="w-full sm:w-auto h-12 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200">
              Start Questionnaire
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}