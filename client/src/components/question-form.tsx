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
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {question.options.map((opt: any) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "multiselect":
        return (
          <div className="space-y-2">
            {question.options.map((opt: any) => (
              <div key={opt.value} className="flex items-center space-x-2">
                <Checkbox
                  id={opt.value}
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
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
          >
            {question.options.map((opt: any) => (
              <div key={opt.value} className="flex items-center space-x-2">
                <RadioGroupItem value={opt.value} id={opt.value} />
                <label htmlFor={opt.value}>{opt.label}</label>
              </div>
            ))}
          </RadioGroup>
        );

      case "text":
        return (
          <Input
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
      <CardHeader>
        <CardTitle>{currentSection.title}</CardTitle>
        <Progress value={progress} className="mt-2" />
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
                    <FormItem>
                      <FormLabel>{question.text}</FormLabel>
                      <FormControl>{renderField(question)}</FormControl>
                    </FormItem>
                  )}
                />
              );
            })}

            <div className="flex justify-end">
              <Button type="submit">
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