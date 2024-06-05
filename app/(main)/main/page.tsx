import { getCategory, getTestsWithQuestions } from "@/data/question";
import Categories from "../_components/categories";
import QuizList from "../_components/quiz-list";

interface Props {
  params: {
    categoryId: string;
  };
}

const HomePage = async ({ params }: Props) => {
  const categories = await getCategory();
  const categoryId = params.categoryId;

  const questions = await getTestsWithQuestions(categoryId);

  if (!categories) {
    return <div>loading...</div>;
  }

  return (
    <div className="p-6">
      <Categories items={categories} />
      <QuizList items={questions} />
    </div>
  );
};

export default HomePage;
