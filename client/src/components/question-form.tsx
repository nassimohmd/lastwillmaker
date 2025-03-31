
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import type { z } from "zod";

type FormData = z.infer<typeof formSchema>;

interface QuestionFormProps {
  questions: any[];
  onComplete: (data: FormData) => void;
}

export default function QuestionForm({ questions, onComplete }: QuestionFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      responses: {},
      currentStep: 0
    }
  });

  const currentSection = questions[form.watch("currentStep")];
  const progress = ((form.watch("currentStep") + 1) / questions.length) * 100;

  const onSubmit = (data: FormData) => {
    if (data.currentStep < questions.length - 1) {
      form.setValue("currentStep", data.currentStep + 1);
    } else {
      onComplete(data);
    }
  };

  const handlePrevious = () => {
    if (form.watch("currentStep") > 0) {
      form.setValue("currentStep", form.watch("currentStep") - 1);
    }
  };

  const handleNext = () => {
    if (form.watch("currentStep") < questions.length - 1) {
      form.setValue("currentStep", form.watch("currentStep") + 1);
    }
  };

  const renderField = (question: any) => {
    switch (question.type) {
      case "select":
        return (
          <Select
            onValueChange={(value) => {
              form.setValue(`responses.${question.id}`, value);
              currentSection.questions.forEach((q: any) => {
                if (q.conditional?.field === question.id) {
                  form.setValue(`responses.${q.id}`, '');
                }
              });
            }}
          >
            <SelectTrigger className="w-full h-12 bg-muted/30 border border-border focus:border-foreground hover:bg-muted">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent className="bg-background border border-foreground/20">
              {question.options.map((opt: any) => (
                <SelectItem 
                  key={opt.value} 
                  value={opt.value}
                  className="h-12 hover:bg-muted/80 focus:bg-muted/80"
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "multiselect":
        // Get the current value once to avoid calling watch repeatedly
        const currentMultiValue = form.watch(`responses.${question.id}`) || [];
        
        return (
          <div className="space-y-3">
            {question.options.map((opt: any) => {
              // Simple check for selected state
              const isSelected = currentMultiValue.includes(opt.value);
              
              return (
                <div
                  key={opt.value}
                  className={`flex items-center space-x-3 min-h-[3rem] px-3 py-2 rounded-md cursor-pointer select-none transition-all
                             ${isSelected ? 'bg-background border-2 border-foreground' : 'bg-muted/30 border border-border hover:bg-muted'}`}
                  onClick={() => {
                    const newValue = isSelected
                      ? currentMultiValue.filter((v: string) => v !== opt.value)
                      : [...currentMultiValue, opt.value];
                    form.setValue(`responses.${question.id}`, newValue);
                  }}
                >
                  <div className="relative flex h-5 w-5 items-center justify-center">
                    <div className={`absolute inset-0 rounded-sm border ${isSelected ? 'border-foreground' : 'border-foreground/30'}`}></div>
                    {isSelected && (
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="12" 
                        height="12" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="text-foreground"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </div>
                  <span className="pl-3 text-base leading-none flex-1">
                    {opt.label}
                  </span>
                </div>
              );
            })}
          </div>
        );

      case "radio":
        // Get the current value once to avoid calling watch repeatedly
        const currentRadioValue = form.watch(`responses.${question.id}`);
        
        return (
          <div className="space-y-3">
            {question.options.map((opt: any) => {
              // Simple check for selected state
              const isSelected = currentRadioValue === opt.value;
              
              return (
                <div
                  key={opt.value}
                  className={`flex items-center space-x-3 min-h-[3rem] px-3 py-2 rounded-md cursor-pointer select-none transition-all
                             ${isSelected ? 'bg-background border-2 border-foreground' : 'bg-muted/30 border border-border hover:bg-muted'}`}
                  onClick={() => {
                    form.setValue(`responses.${question.id}`, opt.value);
                  }}
                >
                  <div className="relative flex h-5 w-5 items-center justify-center">
                    <div className={`absolute inset-0 rounded-full border ${isSelected ? 'border-foreground' : 'border-foreground/30'}`}></div>
                    {isSelected && <div className="h-2.5 w-2.5 rounded-full bg-foreground"></div>}
                  </div>
                  <span className="pl-3 text-base leading-none flex-1">
                    {opt.label}
                  </span>
                </div>
              );
            })}
          </div>
        );

      case "text":
        return (
          <Input
            className="h-12 bg-muted/30 border border-border focus:border-foreground"
            placeholder={question.placeholder}
            onChange={(e) =>
              form.setValue(`responses.${question.id}`, e.target.value)
            }
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      <CardHeader className="space-y-3 border-b border-border/5 pb-7 mb-2">
        <CardTitle className="text-xl sm:text-2xl font-bold">{currentSection.title}</CardTitle>
        <Progress value={progress} className="h-2 bg-muted/50" />
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {currentSection.questions.map((question: any) => {
              if (
                question.conditional &&
                form.watch(`responses.${question.conditional.field}`) !==
                  question.conditional.value
              ) {
                return null;
              }

              return (
                <FormField
                  key={question.id}
                  name={`responses.${question.id}`}
                  render={() => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-base font-medium">{question.text}</FormLabel>
                      <FormControl>{renderField(question)}</FormControl>
                    </FormItem>
                  )}
                />
              );
            })}

            <div className="pt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={handlePrevious}
                      className={form.watch("currentStep") === 0 ? 
                        "opacity-50 cursor-not-allowed bg-muted/30 border border-border text-foreground/60" : 
                        "bg-muted/30 border border-border hover:bg-muted hover:border-foreground transition-colors text-foreground"}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext 
                      onClick={form.watch("currentStep") === questions.length - 1 ? form.handleSubmit(onComplete) : handleNext}
                      className="bg-background border-2 border-foreground hover:bg-foreground hover:text-background transition-colors"
                    >
                      {form.watch("currentStep") === questions.length - 1 ? "Complete" : "Next"}
                    </PaginationNext>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </form>
        </Form>
      </CardContent>
    </>
  );
}
