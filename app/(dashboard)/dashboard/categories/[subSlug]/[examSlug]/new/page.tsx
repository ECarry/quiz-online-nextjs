import React from "react";
import NewQuestionForm from "./new-question-form";
import { getExamBySlug } from "@/data/question";

interface Props {
  params: {
    examSlug: string;
  };
}

const NewQuestionPage = async ({ params }: Props) => {
  const { examSlug } = params;

  const exam = await getExamBySlug(examSlug);

  if (!exam || !exam.subjectId) return null;

  return <NewQuestionForm examId={exam?.id} examName={exam.name} />;
};

export default NewQuestionPage;
