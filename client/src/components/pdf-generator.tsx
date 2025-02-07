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
      <CardHeader>
        <CardTitle>Preview Your Will & Testament</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="bg-muted p-6 rounded-lg whitespace-pre-wrap font-mono text-sm">
          {content}
        </div>

        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Start Over
          </Button>
          
          <Button onClick={handleDownload} disabled={isLoading}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </CardContent>
    </>
  );
}
