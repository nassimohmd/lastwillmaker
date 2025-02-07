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
import { motion, AnimatePresence } from "framer-motion";
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Select
              onValueChange={(value) =>
                form.setValue(`responses.${question.id}`, value)
              }
            >
              <SelectTrigger className="w-full h-12 bg-white/5 border-white/10 transition-all duration-200 hover:border-white/50 focus:border-white">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {question.options.map((opt: any) => (
                  <SelectItem
                    key={opt.value}
                    value={opt.value}
                    className="h-12 transition-colors hover:bg-white/10"
                  >
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>
        );

      case "multiselect":
        return (
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {question.options.map((opt: any, index: number) => (
              <motion.div
                key={opt.value}
                className="flex items-center space-x-3 min-h-[2.5rem] group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
              >
                <Checkbox
                  id={opt.value}
                  className="h-5 w-5 border-white/20 data-[state=checked]:bg-white/20 transition-all duration-200"
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
                  className="text-base leading-none select-none group-hover:text-white transition-colors duration-200"
                >
                  {opt.label}
                </label>
              </motion.div>
            ))}
          </motion.div>
        );

      case "radio":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <RadioGroup
              onValueChange={(value) =>
                form.setValue(`responses.${question.id}`, value)
              }
              className="space-y-3"
            >
              {question.options.map((opt: any, index: number) => (
                <motion.div
                  key={opt.value}
                  className="flex items-center space-x-3 min-h-[2.5rem] group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                >
                  <RadioGroupItem
                    value={opt.value}
                    id={opt.value}
                    className="h-5 w-5 border-white/20 data-[state=checked]:bg-white/20 transition-all duration-200"
                  />
                  <label
                    htmlFor={opt.value}
                    className="text-base leading-none select-none group-hover:text-white transition-colors duration-200"
                  >
                    {opt.label}
                  </label>
                </motion.div>
              ))}
            </RadioGroup>
          </motion.div>
        );

      case "text":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Input
              className="h-12 bg-white/5 border-white/10 transition-all duration-200 hover:border-white/50 focus:border-white"
              placeholder={question.placeholder}
              onChange={(e) =>
                form.setValue(`responses.${question.id}`, e.target.value)
              }
            />
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <CardHeader className="space-y-3 border-b border-white/5 pb-7 mb-2">
        <motion.div
          key={currentSection.title}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <CardTitle className="text-xl sm:text-2xl font-bold">{currentSection.title}</CardTitle>
        </motion.div>
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Progress value={progress} className="h-2 bg-white/50" />
        </motion.div>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <AnimatePresence mode="wait">
              {currentSection.questions.map((question: any) => {
                if (
                  question.conditional &&
                  form.watch(`responses.${question.conditional.field}`) !==
                    question.conditional.value
                ) {
                  return null;
                }

                return (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FormField
                      name={`responses.${question.id}`}
                      render={() => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-base font-medium">{question.text}</FormLabel>
                          <FormControl>{renderField(question)}</FormControl>
                        </FormItem>
                      )}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>

            <motion.div
              className="pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <Button
                type="submit"
                className="w-full h-12 text-base bg-white/10 hover:bg-white/20 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {form.watch("currentStep") < questions.length - 1
                  ? "Next"
                  : "Complete"}
              </Button>
            </motion.div>
          </form>
        </Form>
      </CardContent>
    </>
  );
}