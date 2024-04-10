import { getQuestionsByExamSlug } from "@/data/question";
import { redirect } from "next/navigation";
import Quiz from "../_components/quiz";

const QuizPage = async () => {
  const questions = await getQuestionsByExamSlug("hcip-storage-202403");

  if (!questions) {
    redirect("/mian");
  }
  return <Quiz />;
};

export default QuizPage;
