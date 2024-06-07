"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Answer, Question } from "@prisma/client";
import Quiz from "../_components/quiz-test";

interface QuestionWithAnswer extends Question {
  answers: Answer[];
}

interface Props {
  questions: QuestionWithAnswer[];
}

const QuizDialog = ({ questions }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-4 w-1/3" size="lg">
          开始
        </Button>
      </DialogTrigger>
      <DialogContent className="h-full min-w-full">
        <Quiz questions={questions} />
      </DialogContent>
    </Dialog>
  );
};

export default QuizDialog;
