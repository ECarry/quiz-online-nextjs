import React from "react";
import MCQuestion from "../_components/mc-question";
import { getQuestionsByExamSlug } from "@/data/question";

const QuizPage = async () => {
  const questions = await getQuestionsByExamSlug("hcip-storage-202403");

  if (!questions || questions?.length === 0) {
    return null;
  }

  const mcQuestions = questions.filter((q) => q.type === "MCQ");

  return (
    <div>
      <MCQuestion questions={mcQuestions} />
    </div>
  );
};

export default QuizPage;
