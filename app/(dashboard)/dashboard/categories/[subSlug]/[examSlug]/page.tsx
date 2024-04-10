import { getExamBySlugWithQuestion } from "@/data/question";
import Tab from "./tab";

interface Props {
  params: {
    examSlug: string;
  };
}
const page = async ({ params }: Props) => {
  const exam = await getExamBySlugWithQuestion(params.examSlug);
  if (!exam) {
    return null;
  }

  const questions = exam.questions;

  return <Tab questions={questions} />;
};

export default page;
