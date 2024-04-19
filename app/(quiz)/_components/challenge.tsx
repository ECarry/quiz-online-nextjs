import { cn } from "@/lib/utils";
import { Answer, QuestionType } from "@prisma/client";
import Card from "./card";

interface ChallengeProps {
  answers: Answer[];
  onSelect: (id: string) => void;
  status: "correct" | "wrong" | "none" | "complate";
  selectedOption?: string;
  disabled?: boolean;
  type: QuestionType;
}

const Challenge = ({
  answers,
  onSelect,
  status,
  selectedOption,
  disabled,
  type,
}: ChallengeProps) => {
  return (
    <div className={cn("grid gap-2  grid-cols-1")}>
      {answers.map((answer, i) => (
        <Card
          key={answer.id}
          id={answer.id}
          text={answer.answer}
          shortcut={i + 1}
          onClick={() => onSelect(answer.id)}
          type={type}
          status={status}
          selected={selectedOption === answer.id}
          disabled={disabled}
        />
      ))}
    </div>
  );
};

export default Challenge;
