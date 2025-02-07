import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted p-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="pt-6 text-center">
          <div className="flex justify-center mb-6">
            <FileText className="h-16 w-16 text-primary" />
          </div>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4">
            Will & Testament Generator
          </h1>
          
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Create your digital will easily by answering a few simple questions. We'll help you document your wishes for your digital assets and generate a downloadable document.
          </p>

          <Link href="/questionnaire">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Start Questionnaire
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
