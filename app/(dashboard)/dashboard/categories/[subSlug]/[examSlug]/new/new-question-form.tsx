"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { NewQuestionSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, CircleMinus, Loader2 } from "lucide-react";
import { newQuestion } from "@/actions/question";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import ImageUpload from "@/components/image-upload";
import { toast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Props {
  examId: string;
  examName: string;
}

const initialAnswerValues = { answer: "", isCorrect: false };

const NewQuestionForm = ({ examId, examName }: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof NewQuestionSchema>>({
    resolver: zodResolver(NewQuestionSchema),
    defaultValues: {
      answers: [
        initialAnswerValues,
        initialAnswerValues,
        initialAnswerValues,
        initialAnswerValues,
      ],
      type: "MCQ",
      question: "",
      explanation: "",
      image: "",
      examId: examId,
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "answers",
    control: form.control,
  });

  const handleReset = () => {
    form.reset();
  };

  const handleTypeChange = (type: string) => {
    if (type === "TRUE_FALSE") {
      form.setValue("answers", [
        { answer: "True", isCorrect: false },
        { answer: "False", isCorrect: false },
      ]);
    } else if (type === "MCQ" || type === "MRQ") {
      form.setValue("answers", [
        initialAnswerValues,
        initialAnswerValues,
        initialAnswerValues,
        initialAnswerValues,
      ]);
    } else if (type === "SHORT_ANSWER") {
      form.setValue("answers", [initialAnswerValues]);
    }
  };

  const onSubmit = (values: z.infer<typeof NewQuestionSchema>) => {
    if (
      (values.type === "MCQ" || values.type === "MRQ") &&
      values.answers.length === 2
    ) {
      toast({
        variant: "destructive",
        title:
          "Multiple Choice/Response question must have more than 2 answers",
      });

      return;
    }
    if (form.getValues("type") === "TRUE_FALSE" && values.answers.length > 2) {
      toast({
        variant: "destructive",
        title: "True/False question can only have 2 answers",
      });

      return;
    }
    startTransition(() => {
      newQuestion(values).then((data) => {
        if (data.error) {
          toast({
            variant: "destructive",
            title: data.error,
          });
        } else if (data.success) {
          toast({
            variant: "success",
            title: data.success,
          });
          form.reset({
            answers: [
              initialAnswerValues,
              initialAnswerValues,
              initialAnswerValues,
              initialAnswerValues,
            ],
            question: "",
            explanation: "",
            image: "",
            type: "MCQ",
          });
          router.refresh();
        }
      });
    });
  };

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            {/* HEADER  */}
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                type="button"
                disabled={isPending}
                onClick={router.back}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Back
              </h1>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={handleReset}
                  disabled={isPending}
                >
                  Discard
                </Button>
                <Button
                  size="sm"
                  type="submit"
                  disabled={isPending}
                  className="w-[100px]"
                >
                  {isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <span>Save Question</span>
                  )}
                </Button>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                {/* QUESTION  */}
                <Card x-chunk="dashboard-07-chunk-0">
                  <CardHeader>
                    <CardTitle>Question</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 sm:grid-cols-4">
                      <div className="grid gap-3 col-span-2">
                        <FormField
                          control={form.control}
                          name="examId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{examName}</FormLabel>
                              <Input {...field} disabled />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-3 col-span-2">
                        <FormField
                          control={form.control}
                          name="type"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>Type(MCQ MRQ T/F SAQ)</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={(values) => {
                                    field.onChange(values);
                                    handleTypeChange(values);
                                  }}
                                  className="flex items-center justify-between"
                                >
                                  <FormItem>
                                    <FormControl>
                                      <RadioGroupItem value="MCQ" />
                                    </FormControl>
                                  </FormItem>
                                  <FormItem>
                                    <FormControl>
                                      <RadioGroupItem value="MRQ" />
                                    </FormControl>
                                  </FormItem>
                                  <FormItem>
                                    <FormControl>
                                      <RadioGroupItem value="TRUE_FALSE" />
                                    </FormControl>
                                  </FormItem>
                                  <FormItem>
                                    <FormControl>
                                      <RadioGroupItem value="SHORT_ANSWER" />
                                    </FormControl>
                                  </FormItem>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid gap-3 col-span-4">
                        <FormField
                          control={form.control}
                          name="question"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Question</FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  disabled={isPending}
                                  className="min-h-[120px]"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* ANSWER  */}
                <Card x-chunk="dashboard-07-chunk-1">
                  <CardHeader>
                    <CardTitle>Answers</CardTitle>
                    <CardDescription>This is answer form</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-4">
                      {fields.map((field, index) => (
                        <div
                          className="flex items-center gap-4 grid-cols-4"
                          key={field.id}
                        >
                          <FormField
                            control={form.control}
                            name={`answers.${index}.answer`}
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormControl>
                                  <Textarea {...field} disabled={isPending} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`answers.${index}.isCorrect`}
                            render={({ field }) => (
                              <FormItem className="col-span-1">
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    disabled={isPending}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          {form.getValues("type") !== "TRUE_FALSE" && (
                            <CircleMinus
                              size={28}
                              onClick={() => remove(index)}
                              className="text-primary cursor-pointer text-rose-500"
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    {form.getValues("type") !== "TRUE_FALSE" && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => append({ answer: "", isCorrect: false })}
                        disabled={isPending}
                      >
                        Add Answer
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
              {/* IMAGE & explanation  */}
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card
                  className="overflow-hidden"
                  x-chunk="dashboard-07-chunk-4"
                >
                  <CardHeader>
                    <CardTitle>Question Images</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <ImageUpload
                              value={field.value || ""}
                              onChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
                <Card
                  className="overflow-hidden"
                  x-chunk="dashboard-07-chunk-4"
                >
                  <CardHeader>
                    <CardTitle>Explanation</CardTitle>
                    <CardDescription>Explanation the answer</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 sm:grid-cols-4">
                      <div className="grid gap-3 col-span-4">
                        <FormField
                          control={form.control}
                          name="explanation"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  disabled={isPending}
                                  className="min-h-28"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            {/* SM BUTTON  */}
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={handleReset}
                disabled={isPending}
              >
                Discard
              </Button>
              <Button size="sm" type="submit" disabled={isPending}>
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <span>Save Question</span>
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </main>
  );
};

export default NewQuestionForm;
