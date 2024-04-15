import Card from "./card";
import { getMistakeQuestions } from "@/data/question";

const PracticePage = async () => {
  const mistakesCount = await getMistakeQuestions();

  return (
    <div className="p-6 flex flex-col gap-4">
      <h1 className="text-3xl font-bold">个人专属练习集</h1>
      <div className="flex flex-col gap-4">
        <Card
          title="错题集"
          description="这里是你的错题集，你可以在这里找到你做错的题目，以便于你复习。"
          link="/practice/mistakes"
          emoji="😢"
          total={mistakesCount?.length}
        />
        <Card
          title="收藏集"
          description="这里是你的收藏集，你可以在这里找到你收藏的题目，以便于你复习。"
          link="/practice/collections"
          emoji="😎"
        />
      </div>
    </div>
  );
};

export default PracticePage;
