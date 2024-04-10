"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Answer, Question } from "@prisma/client";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

interface QuestionWithAnswer extends Question {
  answers: Answer[];
}

interface Props {
  questions: QuestionWithAnswer[];
}

const FormSchema = z.object({
  // select id
  selectId: z.string().optional(),
});

const MCQuestion = ({ questions }: Props) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [displayAnswer, setDisplayAnswer] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const currentQuestion = questions[currentQuestionIndex];

  const handleNextQuestion = () => {
    form.reset();
    setDisplayAnswer(false);
    if (currentQuestionIndex === questions.length - 1) return;
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevQuestion = () => {
    form.reset();
    setDisplayAnswer(false);
    if (currentQuestionIndex === 0) return;
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleDisplayAnswer = () => {
    setDisplayAnswer((prev) => !prev);
  };

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    if (!data.selectId) return;

    const isCorrectAnswerId = currentQuestion.answers.find(
      (answer) => answer.isCorrect
    );

    if (data.selectId === isCorrectAnswerId?.id) {
      toast({
        variant: "success",
        title: "恭喜你，答对了！",
      });
    } else {
      toast({
        variant: "destructive",
        title: "很遗憾，答错了！",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">单选题</h3>
        <h3 className="text-xl">
          第 {currentQuestionIndex + 1}/{questions.length} 题
        </h3>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col items-start gap-4 min-h-[300px]">
            <h1 className="md:text-xl font-bold">
              {currentQuestionIndex + 1}、{currentQuestion.question}
            </h1>
            <FormField
              control={form.control}
              name="selectId"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      className="flex flex-col space-y-1"
                    >
                      {currentQuestion.answers.map((answer) => (
                        <FormItem key={answer.id}>
                          <FormControl>
                            <RadioGroupItem value={answer.id} />
                          </FormControl>
                          <FormLabel>{answer.answer}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-4 items-center">
            <Button
              className={cn(
                "w-[120px] bg-blue-500 hover:bg-blue-600 text-white",
                currentQuestionIndex === 0 &&
                  "opacity-50 cursor-not-allowed hover:bg-blue-500"
              )}
              onClick={handlePrevQuestion}
            >
              上一题
            </Button>
            <Button
              className={cn(
                "w-[120px] bg-blue-500 hover:bg-blue-600 text-white",
                currentQuestionIndex === questions.length - 1 &&
                  "opacity-50 cursor-not-allowed hover:bg-blue-500"
              )}
              onClick={handleNextQuestion}
            >
              下一题
            </Button>
            <Button
              type="submit"
              className="w-[120px] bg-blue-500 hover:bg-blue-600 text-white"
              // onClick={handleDisplayAnswer}
            >
              解析
            </Button>
          </div>
        </form>
      </Form>

      {displayAnswer && (
        <div className="bg-gray-200 p-4 rounded-lg shadow-md">
          {currentQuestion.explanation || "无解析"}
        </div>
      )}
    </div>
  );
};

export default MCQuestion;
