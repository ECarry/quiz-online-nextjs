import BackButton from "@/components/back-button";
import { Separator } from "@/components/ui/separator";
import { getMistakeQuestions, getQuestionByIds } from "@/data/question";
import QuizDialog from "./quiz-dialog";

const MistakesPage = async () => {
  const questions = await getMistakeQuestions();

  const mistakeQuestionsId = questions?.map((question) => question.question.id);

  if (!mistakeQuestionsId) return null;

  const mistakeQuestions = await getQuestionByIds(mistakeQuestionsId);

  return (
    <div className="p-6 w-full">
      <BackButton />
      <div className="flex items-center flex-col">
        <h1 className="text-[100px]">♾️</h1>
        <h2 className="text-2xl font-bold">复习最近的错题</h2>
        <QuizDialog questions={mistakeQuestions ?? []} />
      </div>
      <Separator className="my-8" />
      <div className="space-y-4">
        <h2 className="text-xl font-bold">{questions?.length}道错题</h2>
        <div className="border gap-2 rounded-lg">
          {questions?.map((question) => (
            <div
              className="border-b-[3px] flex flex-col gap-2 p-4 last:border-b-0"
              key={question.id}
            >
              <div className="flex items-center gap-2">
                <h3>💔</h3>
                <h3>{question.question.type}</h3>
              </div>
              <span className="font-semibold">
                {question.question.question}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MistakesPage;
