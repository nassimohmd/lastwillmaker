import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Globe } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const content = {
    en: {
      title: "Will & Testament Generator",
      description: "Create your comprehensive will easily by answering simple questions. We'll help you document your wishes for all your assets and generate a downloadable document.",
      selectLanguage: "Select Language",
      english: "English",
      malayalam: "മലയാളം",
      start: "Start Questionnaire"
    },
    ml: {
      title: "വിൽ & ടെസ്റ്റമെന്റ് ജനറേറ്റർ",
      description: "ലളിതമായ ചോദ്യങ്ങൾക്ക് ഉത്തരം നൽകി നിങ്ങളുടെ സമഗ്രമായ വിൽ എളുപ്പത്തിൽ സൃഷ്ടിക്കുക. നിങ്ങളുടെ എല്ലാ സ്വത്തുകളുടെയും ആഗ്രഹങ്ങൾ രേഖപ്പെടുത്താനും ഡൗൺലോഡ് ചെയ്യാവുന്ന രേഖ സൃഷ്ടിക്കാനും ഞങ്ങൾ സഹായിക്കും.",
      selectLanguage: "ഭാഷ തിരഞ്ഞെടുക്കുക",
      english: "English",
      malayalam: "മലയാളം",
      start: "ചോദ്യാവലി ആരംഭിക്കുക"
    }
  };

  if (!selectedLanguage) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-background via-background/80 to-background/50 px-4 py-8 sm:p-4">
        <Card className="w-full max-w-md mx-auto shadow-lg border-2 border-border/5">
          <CardContent className="pt-6 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 rounded-full bg-primary/10">
                <Globe className="h-12 w-12 sm:h-16 sm:w-16 text-primary" />
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent tracking-tight mb-4">
              Will & Testament Generator<br />
              <span className="text-xl">വിൽ & ടെസ്റ്റമെന്റ് ജനറേറ്റർ</span>
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
              Select Language / ഭാഷ തിരഞ്ഞെടുക്കുക
            </p>

            <div className="space-y-4">
              <Button 
                size="lg" 
                className="w-full h-12 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={() => setSelectedLanguage('en')}
              >
                🇺🇸 English
              </Button>
              <Button 
                size="lg" 
                className="w-full h-12 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={() => setSelectedLanguage('ml')}
              >
                🇮🇳 മലയാളം (Malayalam)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const lang = content[selectedLanguage as keyof typeof content];

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
            {lang.title}
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
            {lang.description}
          </p>

          <div className="space-y-4">
            <Link href={`/questionnaire?lang=${selectedLanguage}`}>
              <Button size="lg" className="w-full sm:w-auto h-12 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200">
                {lang.start}
              </Button>
            </Link>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full"
              onClick={() => setSelectedLanguage(null)}
            >
              ← {selectedLanguage === 'en' ? 'Change Language' : 'ഭാഷ മാറ്റുക'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}