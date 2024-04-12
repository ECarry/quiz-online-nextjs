import { Exam, Question } from "@prisma/client";
import QuizCard from "./quiz-card";

interface TestWithQuestions extends Exam {
  questions: Question[];
}

interface Props {
  items: TestWithQuestions[] | undefined;
}

const QuizsList = ({ items }: Props) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items?.map((item) => (
          <QuizCard
            key={item.id}
            id={item.id}
            name={item.name}
            total={item.questions.length}
          />
        ))}
      </div>
      {items?.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          Ooops! No quizs found
        </div>
      )}
    </div>
  );
};

export default QuizsList;
