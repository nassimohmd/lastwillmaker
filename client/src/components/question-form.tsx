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

  const renderField = (question: any) => {
    switch (question.type) {
      case "select":
        return (
          <Select
            onValueChange={(value) => {
              form.setValue(`responses.${question.id}`, value);
              // Clear any conditional fields that depend on this field
              currentSection.questions.forEach((q: any) => {
                if (q.conditional?.field === question.id) {
                  form.setValue(`responses.${q.id}`, '');
                }
              });
            }}
          >
            <SelectTrigger className="w-full h-12 bg-muted/50 border-border/10">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {question.options.map((opt: any) => (
                <SelectItem 
                  key={opt.value} 
                  value={opt.value}
                  className="h-12"
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "multiselect":
        return (
          <div className="space-y-3">
            {question.options.map((opt: any) => (
              <div key={opt.value} className="flex items-center space-x-3 min-h-[2.5rem] group">
                <Checkbox
                  id={opt.value}
                  className="h-5 w-5 border-border/20 data-[state=checked]:bg-primary"
                  onCheckedChange={(checked) => {
                    const currentValue = form.watch(`responses.${question.id}`) || [];
                    const newValue = checked
                      ? [...currentValue, opt.value]
                      : currentValue.filter((v: string) => v !== opt.value);
                    form.setValue(`responses.${question.id}`, newValue);
                  }}
                />
                <label
                  htmlFor={opt.value}
                  className="text-base leading-none select-none group-hover:text-primary transition-colors"
                >
                  {opt.label}
                </label>
              </div>
            ))}
          </div>
        );

      case "radio":
        return (
          <RadioGroup
            onValueChange={(value) =>
              form.setValue(`responses.${question.id}`, value)
            }
            className="space-y-3"
          >
            {question.options.map((opt: any) => (
              <div key={opt.value} className="flex items-center space-x-3 min-h-[2.5rem] group">
                <RadioGroupItem 
                  value={opt.value} 
                  id={opt.value} 
                  className="h-5 w-5 border-border/20 data-[state=checked]:bg-primary"
                />
                <label 
                  htmlFor={opt.value} 
                  className="text-base leading-none select-none group-hover:text-primary transition-colors"
                >
                  {opt.label}
                </label>
              </div>
            ))}
          </RadioGroup>
        );

      case "text":
        return (
          <Input
            className="h-12 bg-muted/50 border-border/10"
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

            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full h-12 text-base bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {form.watch("currentStep") < questions.length - 1
                  ? "Next"
                  : "Complete"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </>
  );
}