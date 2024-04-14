import { getMistakeQuestions } from "@/data/question";
import React from "react";

const MistakesPage = async () => {
  const questions = await getMistakeQuestions();

  return (
    <div className="p-6">
      <pre>{JSON.stringify(questions, null, 2)}</pre>
    </div>
  );
};

export default MistakesPage;
