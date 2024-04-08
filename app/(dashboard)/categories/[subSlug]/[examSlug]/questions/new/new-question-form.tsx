"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { NewQuestionSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, CircleMinus, Loader2 } from "lucide-react";
import { newQuestion } from "@/actions/question";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import ImageUpload from "@/components/image-upload";

interface Props {
  examId: string;
  examName: string;
}

const NewQuestionForm = ({ examId, examName }: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof NewQuestionSchema>>({
    resolver: zodResolver(NewQuestionSchema),
    defaultValues: {
      answers: [
        { answer: "", isCorrect: false },
        { answer: "", isCorrect: false },
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

  const onSubmit = (values: z.infer<typeof NewQuestionSchema>) => {
    startTransition(() => {
      newQuestion(values).then((data) => {
        if (data.error) {
          toast("Something wrong!", {
            description: data.error,
          });
        } else if (data.success) {
          toast("Question has been created", {
            description: "Question has been created successfully",
          });
          form.reset();
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
                Pro Controller
              </h1>
              <Badge variant="outline" className="ml-auto sm:ml-0">
                In stock
              </Badge>
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
                <Button size="sm" type="submit" disabled={isPending}>
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
                            <FormItem>
                              <FormLabel>Type</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled={isPending}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="MCQ">
                                    Multiple Choice Question
                                  </SelectItem>
                                  <SelectItem value="MRQ">
                                    Multiple Response Question
                                  </SelectItem>
                                  <SelectItem value="TRUE_FALSE">
                                    True/False Question
                                  </SelectItem>
                                  <SelectItem value="SHORT_ANSWER">
                                    Short Answer Question
                                  </SelectItem>
                                </SelectContent>
                              </Select>
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
                                  <Input {...field} disabled={isPending} />
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

                          <CircleMinus
                            size={28}
                            onClick={() => remove(index)}
                            className="text-primary cursor-pointer text-rose-500"
                          />
                        </div>
                      ))}
                    </div>

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
