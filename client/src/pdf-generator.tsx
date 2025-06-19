import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Copy, RefreshCw } from "lucide-react";
import { generateContent } from "@shared/questions";
import { useToast } from "@/hooks/use-toast";

interface PdfGeneratorProps {
  responses: Record<string, any>;
  language?: 'en' | 'ml';
  onBack?: () => void;
}

export default function PdfGenerator({ responses, language = 'en', onBack }: PdfGeneratorProps) {
  const [content, setContent] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    setContent(generateContent(responses, language));
  }, [responses, language]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast({
        title: "Copied!",
        description: "Will content copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy content. Please select and copy manually.",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <CardHeader className="space-y-3 border-b border-border/5 pb-7 mb-2">
        <CardTitle className="text-xl sm:text-2xl font-bold">Your Will & Testament</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="bg-muted/50 p-4 sm:p-6 rounded-lg whitespace-pre-wrap font-mono text-sm sm:text-base overflow-auto border border-border/10 shadow-inner max-h-96">
          {content}
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 pt-2">
          <Button
            variant="outline"
            className="w-full sm:w-auto h-12 hover:bg-muted/50 transition-colors"
            onClick={onBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Questions
          </Button>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button
              variant="outline"
              className="w-full sm:w-auto h-12 hover:bg-muted/50 transition-colors"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Start Over
            </Button>

            <Button 
              onClick={handleCopy}
              className="w-full sm:w-auto h-12 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy to Clipboard
            </Button>
          </div>
        </div>
      </CardContent>
    </>
  );
}