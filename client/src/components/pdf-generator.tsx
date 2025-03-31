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
      <CardHeader className="space-y-4 border-b border-zinc-800 pb-7 mb-4">
        <CardTitle className="text-xl sm:text-2xl font-medium text-white">Your Digital Will & Testament</CardTitle>
        <p className="text-sm text-zinc-400">Review your document and download the PDF</p>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="bg-zinc-800 p-5 sm:p-6 rounded-md whitespace-pre-wrap font-mono text-sm sm:text-base overflow-auto border-0 shadow-sm text-zinc-300">
          {content}
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4">
          <Button
            variant="outline"
            className="w-full sm:w-auto bg-zinc-800 border-0 text-zinc-300 hover:bg-zinc-700 transition-colors"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Start Over
          </Button>

          <Button 
            onClick={handleDownload} 
            disabled={isLoading}
            className="w-full sm:w-auto bg-white text-black hover:bg-zinc-200 transition-colors rounded-md border-0"
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