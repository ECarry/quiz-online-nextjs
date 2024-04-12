import { getQuestionsByExamId } from "@/data/question";
import { redirect } from "next/navigation";
import Quiz from "../../_components/quiz";

interface Props {
  params: {
    id: string;
  };
}

const QuizPage = async ({ params }: Props) => {
  const questions = await getQuestionsByExamId(params.id);

  if (!questions || questions.length === 0) {
    return <div>404</div>;
  }

  // random question
  function shuffleArray<T>(array: T[]): T[] {
    const shuffledArray = array.slice(); // 创建一个副本以保持原始数组不变
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // 随机选择一个索引
      // 交换当前位置和随机位置的元素
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  const array = shuffleArray(questions);

  return <Quiz questions={array} />;
};

export default QuizPage;
