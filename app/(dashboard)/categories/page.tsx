import { getCategory } from "@/data/question";
import Tab from "./tab";

const CategoriesPage = async () => {
  const categories = await getCategory();

  return <Tab categories={categories} />;
};

export default CategoriesPage;
