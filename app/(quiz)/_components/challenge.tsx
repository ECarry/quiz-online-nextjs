import { cn } from "@/lib/utils";
import { Answer, QuestionType } from "@prisma/client";
import Card from "./card";

interface ChallengeProps {
  answers: Answer[];
  onSelect: (id: string) => void;
  status: "correct" | "wrong" | "none";
  selectedAnswer?: string;
  disabled?: boolean;
  type: QuestionType;
}

const Challenge = ({
  answers,
  onSelect,
  status,
  selectedAnswer,
  disabled,
  type,
}: ChallengeProps) => {
  return (
    <div
      className={cn(
        type !== "SHORT_ANSWER"
          ? "grid-cols-1"
          : "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]"
      )}
    >
      {answers.map((answer, i) => (
        <Card
          key={answer.id}
          id={answer.id}
          text={answer.answer}
          shortcut={`${i} + 1`}
          onClick={() => {}}
          type={type}
          status={status}
          selected={selectedAnswer === answer.id}
        />
      ))}
    </div>
  );
};

export default Challenge;
