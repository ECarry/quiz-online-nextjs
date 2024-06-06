import { Answer } from "@prisma/client";

interface QuestionBubbleProps {
  question: string;
}

const QuestionBubble = ({ question }: QuestionBubbleProps) => {
  return (
    <div className="flex items-center gap-x-4 mb-6">
      <span className="text-4xl">🤔</span>
      <div className="relative py-2 px-4 border-2 rounded-xl text-sm lg:text-base">
        {question}
        <div className="absolute -left-3 top-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-y-1/2 rotate-90" />
      </div>
    </div>
  );
};

export default QuestionBubble;
