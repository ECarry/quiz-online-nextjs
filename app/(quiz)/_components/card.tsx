import { cn } from "@/lib/utils";
import { QuestionType } from "@prisma/client";

interface CardProps {
  id: string;
  text: string;
  selected?: boolean;
  onClick: () => void;
  shortcut: string;
  status?: "correct" | "wrong" | "none";
  disabled?: boolean;
  type: QuestionType;
}

const Card = ({
  id,
  text,
  selected,
  onClick,
  status,
  disabled,
  type,
}: CardProps) => {
  return (
    <div
      onClick={() => {}}
      className={cn(
        "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 p-4 lg:p-6 cursor-pointer active:border-b-2",
        selected && "border-sky-300 bg-sky-100 hover:bg-sky-100",
        selected &&
          status === "correct" &&
          "border-green-300 bg-green-100 hover:bg-green-100",
        selected &&
          status === "wrong" &&
          "border-rose-300 bg-rose-100 hover:bg-rose-100",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <div className="relative mb-4 max-h-[80px] lg:max-h-[150px] w-full"></div>
    </div>
  );
};

export default Card;
