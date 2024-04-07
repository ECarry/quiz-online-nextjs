"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { NewQuestionSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { ChevronLeft, Upload } from "lucide-react";
import { Subject } from "@prisma/client";
import { newQuestion } from "@/actions/question";
import { useTransition } from "react";

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

interface Props {
  subjects: Subject[] | undefined;
}

const NewQuestionForm = ({ subjects }: Props) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewQuestionSchema>>({
    resolver: zodResolver(NewQuestionSchema),
    defaultValues: {
      answers: [
        { answer: "", isCorrect: false },
        { answer: "", isCorrect: false },
      ],
    },
  });

  const { fields, append } = useFieldArray({
    name: "answers",
    control: form.control,
  });

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
              <Button variant="outline" size="icon" className="h-7 w-7">
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
                <Button variant="outline" size="sm">
                  Discard
                </Button>
                <Button size="sm" type="submit">
                  Save Question
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
                          name="subjectId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {subjects?.map((subject) => (
                                    <SelectItem
                                      value={subject.id}
                                      key={subject.id}
                                    >
                                      {subject.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
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
                                <Textarea {...field} />
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
                          className="flex items-center gap-2 grid-cols-4"
                          key={field.id}
                        >
                          <FormField
                            control={form.control}
                            name={`answers.${index}.answer`}
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormControl>
                                  <Input {...field} />
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
                                  />
                                </FormControl>
                              </FormItem>
                            )}
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
                    <CardTitle>Product Images</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      <Image
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="300"
                        src="/placeholder.svg"
                        width="300"
                      />
                      <div className="grid grid-cols-3 gap-2">
                        <button>
                          <Image
                            alt="Product image"
                            className="aspect-square w-full rounded-md object-cover"
                            height="84"
                            src="/placeholder.svg"
                            width="84"
                          />
                        </button>
                        <button>
                          <Image
                            alt="Product image"
                            className="aspect-square w-full rounded-md object-cover"
                            height="84"
                            src="/placeholder.svg"
                            width="84"
                          />
                        </button>
                        <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                          <Upload className="h-4 w-4 text-muted-foreground" />
                          <span className="sr-only">Upload</span>
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card
                  className="overflow-hidden"
                  x-chunk="dashboard-07-chunk-4"
                >
                  <CardHeader>
                    <CardTitle>Explanation</CardTitle>
                    <CardDescription>Explanation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 sm:grid-cols-4">
                      <div className="grid gap-3 col-span-4">
                        <FormField
                          control={form.control}
                          name="explanation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Explanation</FormLabel>
                              <FormControl>
                                <Textarea {...field} />
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
              <Button variant="outline" size="sm">
                Discard
              </Button>
              <Button size="sm" type="submit">
                Save Question
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </main>
  );
};

export default NewQuestionForm;
