import { getQuestionWithAnswersById } from "@/data/question";
import EditQuestionForm from "../../@modal/(.)edit/[id]/edit-question-form";

interface QuestionIdPageProps {
  params: {
    id: string;
  };
}

const QuestionIdPage = async ({ params }: QuestionIdPageProps) => {
  const { id } = params;

  const questionWithAnswers = await getQuestionWithAnswersById(id);

  if (!questionWithAnswers) {
    return null;
  }

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <EditQuestionForm
        question={questionWithAnswers}
        answers={questionWithAnswers.answers}
      />
    </main>
  );
};

export default QuestionIdPage;
