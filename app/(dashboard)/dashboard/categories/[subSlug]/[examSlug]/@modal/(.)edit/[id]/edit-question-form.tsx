"use client";

import { useModal } from "@/hooks/use-modal-store";
import * as z from "zod";
import { useFieldArray, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronLeft, CircleMinus, Loader2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { NewQuestionSchema } from "@/schemas";
import ImageUpload from "@/components/image-upload";
import { Answer, Question } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

const initialAnswerValues = { answer: "", isCorrect: false };

interface EditQuestionFormProps {
  question: Question;
  answers: Answer[];
}

const EditQuestionForm = ({ question, answers }: EditQuestionFormProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "editQuestion";

  const handleClose = () => {
    onClose();
  };

  const form = useForm<z.infer<typeof NewQuestionSchema>>({
    resolver: zodResolver(NewQuestionSchema),
    defaultValues: {
      answers: answers,
      type: question.type,
      question: question.question,
      explanation: question.explanation || "",
      image: question.image || "",
      examId: question.examId,
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

  const onSubmit = () => {
    setError("");
    setSuccess("");

    startTransition(() => {});
  };

  return (
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
          <ScrollArea className="h-full">
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
                              <FormLabel>test</FormLabel>
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
                                  defaultValue={question.type}
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
                    {form.getValues("type") !== "SHORT_ANSWER" ? (
                      <>
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
                                      <Textarea
                                        {...field}
                                        disabled={isPending}
                                      />
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
                            onClick={() =>
                              append({ answer: "", isCorrect: false })
                            }
                            disabled={isPending}
                          >
                            Add Answer
                          </Button>
                        )}
                      </>
                    ) : (
                      <div className="flex flex-col gap-4">
                        <FormField
                          control={form.control}
                          name={`answers.0.answer`}
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormControl>
                                <Textarea {...field} disabled={isPending} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
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
          </ScrollArea>
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
  );
};

export default EditQuestionForm;
