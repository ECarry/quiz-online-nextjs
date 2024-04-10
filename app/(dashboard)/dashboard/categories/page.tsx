import { getCategoryWithExams } from "@/data/question";
import Tab from "./tab";

const CategoriesPage = async () => {
  const categories = await getCategoryWithExams();

  return <Tab categories={categories} />;
};

export default CategoriesPage;
