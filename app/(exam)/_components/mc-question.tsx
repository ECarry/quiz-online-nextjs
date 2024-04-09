"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Answer, Question } from "@prisma/client";
import { cn } from "@/lib/utils";

interface QuestionWithAnswer extends Question {
  answers: Answer[];
}

interface Props {
  questions: QuestionWithAnswer[];
}

const MCQuestion = ({ questions }: Props) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [displayAnswer, setDisplayAnswer] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleNextQuestion = () => {
    setDisplayAnswer(false);
    if (currentQuestionIndex === questions.length - 1) return;
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevQuestion = () => {
    setDisplayAnswer(false);
    if (currentQuestionIndex === 0) return;
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleDisplayAnswer = () => {
    setDisplayAnswer((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">单选题</h3>
        <h3 className="text-xl">
          第 {currentQuestionIndex + 1}/{questions.length} 题
        </h3>
      </div>

      <div className="flex flex-col items-start gap-4 min-h-[300px]">
        <h1 className="text-xl font-bold">
          {currentQuestionIndex + 1}、{currentQuestion.question}
        </h1>
        <RadioGroup defaultValue="comfortable" className="space-y-4">
          {currentQuestion.answers.map((answer) => (
            <div className="flex items-center space-x-2" key={answer.id}>
              <RadioGroupItem value={answer.id} id={answer.id} />
              <Label htmlFor={answer.id}>{answer.answer}</Label>
            </div>
          ))}
        </RadioGroup>
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
          className="w-[120px] bg-blue-500 hover:bg-blue-600 text-white"
          onClick={handleDisplayAnswer}
        >
          解析
        </Button>
      </div>

      {displayAnswer && (
        <div className="bg-gray-200 p-4 rounded-lg shadow-md">
          {currentQuestion.explanation || "无解析"}
        </div>
      )}
    </div>
  );
};

export default MCQuestion;
