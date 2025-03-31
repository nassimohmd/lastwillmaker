import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, RefreshCw } from "lucide-react";
import { generateContent } from "@shared/questions";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface PdfGeneratorProps {
  responses: Record<string, any>;
}

export default function PdfGenerator({ responses }: PdfGeneratorProps) {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setContent(generateContent(responses));
  }, [responses]);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const res = await apiRequest("POST", "/api/generate-pdf", {
        responses,
        content
      });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "will-and-testament.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <CardHeader className="space-y-4 border-b border-border/10 pb-7 mb-4">
        <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight">Your Digital Will & Testament</CardTitle>
        <p className="text-sm text-muted-foreground">Review your document and download the PDF</p>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="bg-muted/20 p-5 sm:p-6 rounded-lg whitespace-pre-wrap font-mono text-sm sm:text-base overflow-auto border border-border/40 shadow-sm">
          {content}
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4">
          <Button
            variant="outline"
            className="w-full sm:w-auto bg-background border border-border/60 hover:border-primary hover:text-primary transition-all shadow-sm"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Start Over
          </Button>

          <Button 
            onClick={handleDownload} 
            disabled={isLoading}
            className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
          >
            {isLoading ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Download className="mr-2 h-4 w-4" />
            )}
            {isLoading ? "Generating..." : "Download PDF"}
          </Button>
        </div>
      </CardContent>
    </>
  );
}