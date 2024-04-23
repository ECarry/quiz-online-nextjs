import { getCategory, getTestsWithQuestions } from "@/data/question";
import Categories from "../_components/categories";
import QuizsList from "../_components/quizs-list";

interface Props {
  params: {
    categoryId: string;
  };
}

const HomePage = async ({ params }: Props) => {
  // delay 500ms
  await new Promise((resolve) => setTimeout(resolve, 500));

  const categories = await getCategory();
  const categoryId = params.categoryId;

  const questions = await getTestsWithQuestions(categoryId);

  if (!categories) {
    return <div>loading...</div>;
  }

  return (
    <div className="p-6">
      <Categories items={categories} />
      <QuizsList items={questions} />
    </div>
  );
};

export default HomePage;
