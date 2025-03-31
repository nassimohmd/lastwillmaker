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
            onValueChange={(value) => 
              form.setValue(`responses.${question.id}`, value)
            }
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
            {question.options.map((opt: any) => {
              const optId = `${question.id}-${opt.value}`;
              return (
                <label
                  key={opt.value}
                  htmlFor={optId}
                  className="flex items-center space-x-3 min-h-[3rem] p-3 rounded-md cursor-pointer border border-border/10 bg-muted/30 hover:bg-muted/80 transition-colors w-full"
                >
                  <Checkbox
                    id={optId}
                    className="h-5 w-5 border-border/20 data-[state=checked]:bg-primary data-[state=checked]:text-background"
                    onCheckedChange={(checked) => {
                      const currentValue = form.watch(`responses.${question.id}`) || [];
                      const newValue = checked
                        ? [...currentValue, opt.value]
                        : currentValue.filter((v: string) => v !== opt.value);
                      form.setValue(`responses.${question.id}`, newValue);
                    }}
                  />
                  <span className="text-base select-none flex-1">
                    {opt.label}
                  </span>
                </label>
              );
            })}
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
            {question.options.map((opt: any) => {
              const optId = `${question.id}-${opt.value}`;
              return (
                <label
                  key={opt.value}
                  htmlFor={optId}
                  className="flex items-center space-x-3 min-h-[3rem] p-3 rounded-md cursor-pointer border border-border/10 bg-muted/30 hover:bg-muted/80 transition-colors w-full"
                >
                  <RadioGroupItem 
                    value={opt.value} 
                    id={optId}
                    className="h-5 w-5 border-border/20 data-[state=checked]:bg-primary data-[state=checked]:text-background"
                  />
                  <span className="text-base select-none flex-1">
                    {opt.label}
                  </span>
                </label>
              );
            })}
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

            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              {form.watch("currentStep") > 0 && (
                <Button 
                  type="button"
                  variant="outline"
                  className="w-full sm:w-1/3 h-12 text-base hover:bg-muted/50 transition-colors"
                  onClick={() => form.setValue("currentStep", form.watch("currentStep") - 1)}
                >
                  Back
                </Button>
              )}
              <Button 
                type="submit" 
                className={`w-full ${form.watch("currentStep") > 0 ? "sm:w-2/3" : ""} h-12 text-base bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200`}
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